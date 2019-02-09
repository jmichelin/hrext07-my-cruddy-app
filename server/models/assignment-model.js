const mongoose = require("mongoose");

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  due: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("assignment", assignmentSchema);
