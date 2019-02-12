<template>
  <div>
    <v-snackbar
      v-model="assignmentRemoved"
      :timeout="timeout"
      :top="top"
    >Assignment has been removed.
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="assignmentCompleted"
      :timeout="timeout"
      :top="top"
    >Congrats! You have completed the assignment.
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="errorMessage"
      color="error"
      :timeout="timeout"
      :top="top"
    >Oh, no! Something has gone wrong. Please try again.
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <h1>Assignments</h1>
    <!-- Apollo Query -->
    <!-- <ApolloQuery :query="require('@/graphql/GetAssignments.gql')">
      <ApolloSubscribeToMore
        :document="require('../graphql/AssignmentAdded.gql')"
        :update-query="onAssignmentAdded"
      />
      <template slot-scope="{ result: { data, loading } }">
        <div v-if="loading">Loading...</div>
        <v-sheet v-else class="pa-5" color="grey lighten-3">
          <ul class="assignments__list">
            <li v-for="assignment of data.assignments" :key="assignment._id">
              <Assignment :assignment="assignment"/>
            </li>
          </ul>
        </v-sheet>
      </template>
    </ApolloQuery>-->
    <v-sheet class="pt-3 pb-5 pl-5 pr-5" color="grey lighten-3">
      <v-select
        v-model="filter"
        :items="filters"
        menu-props="auto"
        label="Filter"
        hide-details
        prepend-icon="filter"
        single-line
      ></v-select>
      <v-select
        v-model="sort"
        :items="sorts"
        menu-props="auto"
        label="Sort"
        hide-details
        prepend-icon="sort"
        single-line
      ></v-select>
      <!-- <v-btn flat small @click="updateSort('NAME_ASCENDING')">Name ^</v-btn>
      <v-btn flat small d-inline @click="updateSort('NAME_DESCENDING')">Name v</v-btn>
      <v-btn flat small d-inline @click="updateSort('DATE_ASCENDING')">Date ^</v-btn>
      <v-btn flat small d-inline @click="updateSort('DATE_DESCENDING')">Date v</v-btn>-->
      <ul class="assignments__list">
        <li v-for="assignment of sortedAssignments" :key="assignment._id">
          <!-- <v-sheet :elevation="6" class="mx-auto mb-2 pa-2">{{ assignment.name }}</v-sheet> -->
          <Assignment
            :assignment="assignment"
            @delete="removeAssignment"
            @update="updateAssignment"
            @complete="completeAssignment"
          />
        </li>
      </ul>
    </v-sheet>
    <AddAssignment @added="addAssignment"/>
  </div>
</template>

<script>
import axios from "axios";
import GetAssignments from "@/graphql/GetAssignments.gql";
import Assignment from "@/components/Assignment.vue";
import AddAssignment from "@/components/AddAssignment.vue";
import { setTimeout } from "timers";

export default {
  components: {
    Assignment,
    AddAssignment,
  },
  data() {
    return {
      assignments: [],
      filter: "PENDING",
      filters: ["ALL", "COMPLETED", "PENDING"],
      sort: "DEFAULT",
      sorts: [
        "NAME_ASCENDING",
        "NAME_DESCENDING",
        "DATE_ASCENDING",
        "DATE_DESCENDING",
        "DEFAULT",
      ],
      elevations: [6, 12, 18],
      errorMessage: false,
      assignmentRemoved: false,
      assignmentCompleted: false,
      timeout: 2000,
      top: true,
    };
  },
  computed: {
    filteredAssignments() {
      switch (this.filter) {
        case "COMPLETED":
          return this.assignments.filter(a => a.completed);
          break;
        case "PENDING":
          return this.assignments.filter(a => !a.completed);
          break;
        case "ALL":
        default:
          return this.assignments;
      }
    },
    sortedAssignments() {
      switch (this.sort) {
        case "NAME_ASCENDING":
          return this.filteredAssignments.sort((a, b) => {
            if (a.name > b.name) return 1;
            return b.name > a.name ? -1 : 0;
          });
          break;
        case "NAME_DESCENDING":
          return this.filteredAssignments.sort((a, b) => {
            if (a.name > b.name) return -1;
            return b.name > a.name ? 1 : 0;
          });
          break;
        case "DATE_ASCENDING":
          return this.filteredAssignments.sort(
            (a, b) => parseInt(a.due, 10) - parseInt(b.due, 10)
          );
          break;
        case "DATE_DESCENDING":
          return this.filteredAssignments.sort(
            (a, b) => parseInt(b.due, 10) - parseInt(a.due, 10)
          );
          break;
        case "DEFAULT":
        default:
          return this.filteredAssignments;
      }
    },
  },
  methods: {
    updateFilter(filter) {
      switch (filter) {
        case "COMPLETED":
          this.filter = "COMPLETED";
          break;
        case "PENDING":
          this.filter = "PENDING";
          break;
        case "ALL":
        default:
          this.filter = "ALL";
      }
    },
    updateSort(sort) {
      switch (sort) {
        case "DATE_ASCENDING":
          this.sort = "DATE_ASCENDING";
          break;
        case "DATE_DESCENDING":
          this.sort = "DATE_DESCENDING";
          break;
        case "NAME_ASCENDING":
          this.sort = "NAME_ASCENDING";
          break;
        case "NAME_DESCENDING":
          this.sort = "NAME_DESCENDING";
          break;
        default:
          this.sort = "DEFAULT";
      }
    },
    removeAssignment(id) {
      this.assignmentRemoved = true;
      setTimeout(
        function() {
          this.assignmentRemoved = false;
        }.bind(this),
        5000
      );
      this.assignments = this.assignments.filter(item => item._id !== id);
    },
    updateAssignment(assignment) {
      this.assignments = this.assignments.map(a =>
        a._id === assignment._id ? assignment : a
      );
    },
    addAssignment(assignment) {
      this.assignments.unshift(assignment);
    },
    completeAssignment(assignment) {
      this.assignmentCompleted = assignment.completed;
      setTimeout(
        function() {
          this.assignmentCompleted = false;
        }.bind(this),
        2000
      );

      this.updateAssignment(assignment);
    },
  },
  mounted() {
    this.$apollo
      .query({
        query: GetAssignments,
      })
      .then(res => {
        this.assignments = res.data.assignments;
      })
      .catch(e => {
        this.errorMessage = true;
        setTimeout(
          function() {
            this.errorMessage = false;
          }.bind(this),
          5000
        );
      });
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
