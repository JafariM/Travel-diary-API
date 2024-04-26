require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//authentication middleware
const authenticatedUser = require("./middleware/authentication");

//ConnectDB
const connectDB = require("./db/connect");

//router
const authRouter = require("./routes/auth");
const travelRouter = require("./routes/travel-diary");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", authRouter);
//with authenticatedUser middleware we protect  all travel routes to be accessed
//only by authenticated users
app.use("/api/v1/travel", authenticatedUser, travelRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
