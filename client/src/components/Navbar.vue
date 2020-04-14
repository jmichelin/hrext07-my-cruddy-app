<template>
  <v-toolbar>
    <v-toolbar-side-icon @click="$emit('toggle')"></v-toolbar-side-icon>

    <v-toolbar-title class="display-1">
      <span class="font-weight-light">Assignment</span>
      <span class="font-weight-regular">Tracker</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<style>
</style>
