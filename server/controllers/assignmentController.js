const { UserInputError } = require("apollo-server");

const AssignmentModel = require("../models/assignment-model");
const { failedUpdate } = require("../helpers/failResponses");
const validate = require("../helpers/validate");

exports.listAssignment = async () => {
  try {
    const res = await AssignmentModel.find({});
    return res;
  } catch (e) {
    return [];
  }
};

exports.singleAssignment = async ({ id }) => {
  if (typeof id !== "string") {
    throw new UserInputError("Please submit valid assignment ID");
  }
  try {
    const res = await AssignmentModel.findById(id);
    return res;
  } catch (e) {
    return null;
  }
};

exports.addAssignment = async ({ assignment }) => {
  const validationErrors = validate(assignment);
  if (validationErrors) {
    throw new UserInputError("Assignment object is incomplete or missing.", {
      validationErrors,
    });
  }

  try {
    const newAssignment = {
      ...assignment,
      completed: false,
    };

    const model = new AssignmentModel(newAssignment);
    return model.save().then(res => ({
      code: 201,
      success: true,
      message: "User added successfully",
      assignment: res,
    }));
  } catch (e) {
    return failedUpdate;
  }
};

exports.updateAssignment = async ({ assignment }) => {
  // const validationErrors = validate(assignment);
  // if (validationErrors) {
  //   throw new UserInputError("Assignment object is incomplete or missing.", {
  //     validationErrors,
  //   });
  // }

  try {
    const { _id, ...rest } = assignment;
    const res = await AssignmentModel.findByIdAndUpdate(_id, rest, {
      new: true,
      upsert: false,
    });
    return {
      code: 201,
      success: true,
      message: "User updated successfully",
      assignment: res,
    };
  } catch (e) {
    return failedUpdate;
  }
};

exports.removeAssignment = async ({ id }) => {
  if (!id) {
    throw new UserInputError("Assignment ID is missing.");
  }

  try {
    const assignment = await AssignmentModel.findByIdAndDelete(id);
    return {
      code: 201,
      success: true,
      message: "User removed successfully",
      assignment,
    };
  } catch (e) {
    return failedUpdate;
  }
};
