<template>
  <div>
    <h1>Assignments</h1>
    <!-- Apollo Query -->
    <ApolloQuery :query="require('@/graphql/GetAssignments.gql')">
      <!-- <ApolloSubscribeToMore
        :document="require('../graphql/AssignmentAdded.gql')"
        :update-query="assignmentAdded"
      />-->
      <!-- The result will automatically updated -->
      <template slot-scope="{ result: { data, loading } }">
        <!-- Some content -->
        <div v-if="loading">Loading...</div>
        <v-sheet v-else class="pa-5" color="grey lighten-3">
          <ul class="assignments__list">
            <li v-for="assignment of data.assignments" :key="assignment._id">
              <!-- <v-sheet :elevation="6" class="mx-auto mb-2 pa-2">{{ assignment.name }}</v-sheet> -->
              <Assignment :assignment="assignment"/>
            </li>
          </ul>
        </v-sheet>
      </template>
    </ApolloQuery>
    <Assignment/>
  </div>
</template>

<script>
import axios from "axios";
import ASSIGNMENTS from "../graphql/GetAssignments.gql";
import Assignment from "./Assignment.vue";

export default {
  components: {
    Assignment,
  },
  data() {
    return {
      name: "Ben",
      elevations: [6, 12, 18],
    };
  },
};

/*
<div>
    <v-alert
      :value="true"
      type="success"
    >
      This is a success alert.
    </v-alert>

    <v-alert
      :value="true"
      type="info"
    >
      This is a info alert.
    </v-alert>

    <v-alert
      :value="true"
      type="warning"
    >
      This is a warning alert.
    </v-alert>

    <v-alert
      :value="true"
      type="error"
    >
      This is a error alert.
    </v-alert>
  </div>
*/
</script>

<style lang="scss" scoped>
.assignments__list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
