const validate = assignment => {
  const validationErrors = Object.create(null);
  if (!assignment) {
    validationErrors.assignment = "Assignment object missing.";
  } else {
    if (!assignment.name) {
      validationErrors.assignmentName = "Assignment name missing.";
    } else if (assignment.name.length < 3) {
      validationErrors.assignmentName = "Assignment name is too short.";
    }

    if (!assignment.due) {
      validationErrors.assignmentDue = "Assignment due date missing.";
    } else {
      const date = isNaN(parseInt(assignment.due, 10))
        ? assignment.due
        : parseInt(assignment.due, 10);
      if (Date.now() - new Date(date) > 0) {
        validationErrors.assignmentDue = "Assignment date is in the past.";
      }
    }
  }

  return Object.keys(validationErrors).length > 0 ? validationErrors : null;
};

module.exports = validate;
