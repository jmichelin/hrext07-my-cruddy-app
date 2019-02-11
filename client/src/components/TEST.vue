<template>
  <ApolloQuery :query="assignments">
    <template slot-scope="{ result: { data: { todos } } }">
      <ul v-if="assignments.length">
        <li v-for="assignment in assignments" :key="assignment._id">
          <Assignment :assignment="assignment"/>
        </li>
      </ul>
      <p v-else>Add some tasks and let's get some work done!</p>
      <p v-if="allDone(todos)">You did everything, awesome!</p>
    </template>
  </ApolloQuery>
</template>

<script>
import { Assignment } from "apollo-boost";
import Todo from "./Assignment";

export default {
  name: "TodosList",
  components: { Assignment },
  props: {
    listFilter: {
      type: String,
    },
  },
  data() {
    return {
      assignments: this.$options.queries.loadAssignments,
    };
  },
  methods: {
    visibleAssignments(assignments) {
      switch (this.listFilter) {
        case "SHOW_ALL":
          return assignments;
        case "SHOW_COMPLETED":
          return assignemnts.filter(a => a.completed);
        case "SHOW_ACTIVE":
          return assignments.filter(a => !a.completed);
        default:
          throw new Error("Unknown filter: " + this.listFilter);
      }
    },
    allDone(assignments) {
      if (assignments.length === 0) return false;
      return !assignments.some(assignment => !assignment.completed);
    },
  },
  queries: {
    loadAssignments: gql`
      {
        assignments @client {
          _id
          name
          description
          tags
          due
          completed
        }
      }
    `,
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
