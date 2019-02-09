const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
mongoose.set("useCreateIndex", true);
const assignmentRoute = require("./routes/assignment-routes");

/* Mongoose Connection */
const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(e => console.error(e));

const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/assignments", assignmentRoute);

app.listen(port, () => console.log(`Server started on Port ${port}`));
