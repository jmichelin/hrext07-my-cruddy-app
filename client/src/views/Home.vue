<template>
  <div class="ma-4">
    <!-- <Test listFilter="SHOW_ALL"/> -->
    <Assignments/>
    <AddAssignment/>
    <v-container fluid grid-list-md text-xs-center>
      <v-layout align-center justify-start>
        <v-flex xs-9 sm-9 md-9 lg-9 xl-9 class="big">Big</v-flex>
        <v-flex xs-3 sm-3 md-3 lg-3 xl-3 class="small">Small</v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Assignments from "../components/Assignments.vue";
import AddAssignment from "../components/AddAssignment.vue";

export default {
  components: {
    Assignments,
    AddAssignment,
  },
};
</script>

<style>
.big {
  background-color: red;
}
.small {
  background-color: blue;
}
</style>
