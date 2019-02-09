const { gql, UserInputError } = require("apollo-server");

const AssignmentModel = require("../models/assignment-model");

exports.typeDefs = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type UpdateMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    assignment: Assignment
  }

  type Assignment {
    _id: ID!
    name: String!
    description: String
    due: String!
    completed: Boolean
  }

  input NewAssignment {
    name: String!
    description: String
    due: String!
  }

  type Mutation {
    add(assignment: NewAssignment!): UpdateMutationResponse!
    update(assignment: NewAssignment!): UpdateMutationResponse!
    remove(id: ID!): UpdateMutationResponse!
  }

  type Query {
    assignment(id: ID): Assignment
    assignments: [Assignment!]!
  }
`;

const failedUpdate = {
  code: 500,
  success: false,
  message: "Operation was unsuccessful. Please try again.",
  assignment: null,
};

exports.resolvers = {
  Query: {
    async assignment(root, { id }) {
      if (!id) {
        throw new UserInputError("Please submit assignment ID");
      }
      try {
        const res = await AssignmentModel.findById(id);
        return res;
      } catch (e) {
        return {};
      }
    },
    async assignments() {
      try {
        const res = await AssignmentModel.find({});
        return res;
      } catch (e) {
        return [];
      }
    },
  },
  Mutation: {
    async add(root, { assignment }) {
      if (!assignment) {
        throw new UserInputError("Please submit assignment");
      }
      try {
        const newAssignment = {
          ...assignment,
          completed: false,
        };

        const model = new AssignmentModel(newAssignment);
        return model
          .save()
          .then(res => ({
            code: 201,
            success: true,
            message: "User added successfully",
            assignment: res,
          }))
          .catch(() => failedUpdate);
      } catch (e) {
        return failedUpdate;
      }
    },
    async update(root, { assignment }) {
      if (!assignment) {
        throw new UserInputError("Please submit assignment");
      }

      try {
        const { id, ...rest } = assignment;
        const res = await AssignmentModel.findByIdAndUpdate(id, rest, {
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
    },
    async remove(root, { id }) {
      if (!id) {
        throw new UserInputError("Please provide valid ID");
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
    },
  },
};
