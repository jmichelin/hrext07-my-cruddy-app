const { gql, PubSub, withFilter } = require("apollo-server");

const {
  singleAssignment,
  listAssignment,
  addAssignment,
  updateAssignment,
  removeAssignment,
} = require("../controllers/assignmentController");

const pubsub = new PubSub();

const ADDED = "ADDED";
const REMOVED = "REMOVED";
const UPDATED = "UPDATED";

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
    "A MongoDB-generated ID string."
    _id: ID!
    "The main assignment name or title."
    name: String!
    "A short description for the assignment, including relevant todos or information."
    description: String
    "The due date for the assignment."
    due: String!
    "Relevant tags associated with an assignment."
    tags: [String!]
    "A boolean regarding whether the assignment has been completed."
    completed: Boolean
  }

  input UpdateAssignment {
    "A MongoDB-generated ID string."
    _id: ID!
    "The main assignment name or title."
    name: String!
    "A short description for the assignment, including relevant todos or information."
    description: String
    "The due date for the assignment."
    due: String!
    "Relevant tags associated with an assignment."
    tags: [String!]
    "A boolean regarding whether the assignment has been completed."
    completed: Boolean
  }

  input NewAssignment {
    "The main assignment name or title."
    name: String!
    "A short description for the assignment, including relevant todos or information."
    description: String
    "Relevant tags associated with an assignment."
    tags: [String!]
    "The due date for the assignment."
    due: String!
  }

  type Subscription {
    assignmentAdded: Assignment
    assignmentUpdated: Assignment
    assignmentRemoved: Assignment
  }

  type Mutation {
    add(assignment: NewAssignment!): UpdateMutationResponse!
    update(assignment: UpdateAssignment!): UpdateMutationResponse!
    remove(id: ID!): UpdateMutationResponse!
  }

  type Query {
    assignment(id: ID): Assignment
    assignments: [Assignment]
  }
`;

exports.resolvers = {
  Query: {
    async assignment(root, args) {
      return singleAssignment(args);
    },
    async assignments() {
      return listAssignment();
    },
  },
  Subscription: {
    assignmentAdded: {
      subscribe: () => pubsub.asyncIterator([ADDED]),
    },
    assignmentUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([UPDATED]),
        (payload, variables) => payload.assignmentUpdated._id === variables.id
      ),
      // subscribe: () => pubsub.asyncIterator([UPDATED]),
    },
    assignmentRemoved: {
      subscribe: () => pubsub.asyncIterator([REMOVED]),
    },
  },
  Mutation: {
    async add(root, args) {
      const assignments = addAssignment(args);
      pubsub.publish(ADDED, { assignmentAdded: args });
      return assignments;
    },
    async update(root, args) {
      pubsub.publish(UPDATED, { assignmentUpdated: args });
      return updateAssignment(args);
    },
    async remove(root, args) {
      pubsub.publish(REMOVED, { assignmentRemoved: args });
      return removeAssignment(args);
    },
  },
};
