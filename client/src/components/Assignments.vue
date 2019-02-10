<template>
  <div>
    <h1>Assignments</h1>
    <!-- Apollo Query -->
    <ApolloQuery :query="require('@/graphql/GetAssignments.gql')">
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading } }">
        <!-- Some content -->
        <div v-if="loading">Loading...</div>
        <ul v-else>
          <li v-for="assignment of data.assignments" :key="assignment._id">{{ assignment.name }}</li>
        </ul>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import axios from "axios";
import ASSIGNMENTS from "../graphql/GetAssignments.gql";

export default {
  data() {
    return {
      name: "Ben",
    };
  },
};
</script>

<style>
</style>
