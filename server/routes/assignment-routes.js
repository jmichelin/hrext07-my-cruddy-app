const express = require("express");

const router = express.Router();
const AssignmentModel = require("../models/assignment-model");

/*
 * Read Assignments
 *
 */

router.get("/", async (req, res) => {
  if (req.query.id) {
    try {
      const { id } = req.query;
      const assignment = await AssignmentModel.findById(id);
      res.status(200).json(assignment);
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Could not fetch assignment. Please try again." });
    }
  } else {
    try {
      const assignments = await AssignmentModel.find({});
      res.status(200).json(assignments);
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Could not fetch assignments. Please try again." });
    }
  }
});

/*
 * Create Assignment
 *
 */

router.post("/", async (req, res) => {
  if (!req.body.assignment) {
    res.status(500).send({ message: "Assignment not included in request." });
  }

  const { assignment } = req.body;

  try {
    const model = new AssignmentModel(assignment);
    model
      .save()
      .then(resp => res.status(201).json(resp))
      .catch(e => {
        console.error(e);
        res
          .status(500)
          .json({ message: "Assigment could not be added. Pelase try again." });
      });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Could not add assignment. Please try again." });
  }
});

/*
 * Update Assignment
 *
 */

router.put("/", async (req, res) => {
  if (!req.body.assignment) {
    res.status(500).send({ message: "Assignment not included in request." });
  }

  try {
    const { assignment } = req.body;
    const { id, ...rest } = assignment;

    const match = await AssignmentModel.findByIdAndUpdate(id, rest, {
      new: true,
      upsert: false,
    });
    res.status(201).json(match);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Could not update assignment. Please try again." });
  }
});

/*
 * Delete Assignment
 *
 */

router.delete("/", async (req, res) => {
  if (!req.query.id) {
    res
      .status(500)
      .send({ message: "Assignment ID not included with request." });
  }

  const { id } = req.query;

  try {
    const assignment = await AssignmentModel.findByIdAndDelete(id);
    res.status(201).json(assignment);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Could not delete assignment. Please try again." });
  }
});

module.exports = router;
