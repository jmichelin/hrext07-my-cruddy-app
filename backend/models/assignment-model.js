const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  due: {
    type: Date,
    default: Date.now()
  },
  notes: {
    type: String
  },
  tags: {
    type: [String]
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("assignment", assignmentSchema);
