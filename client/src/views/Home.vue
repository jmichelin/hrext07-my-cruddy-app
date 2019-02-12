<template>
  <v-sheet class="ma-2">
    <v-container>
      <v-layout column>
        <v-flex xs12 sm12 md-12 lg8 xl8>
          <Assignments/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-sheet>
</template>

<script>
import Assignments from "../components/Assignments.vue";

export default {
  components: {
    Assignments,
  },
};
</script>

<style lang="scss" scoped>
</style>
