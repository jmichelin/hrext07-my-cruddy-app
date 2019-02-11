<template>
  <div class="ma-2">
    <Assignments/>
    <AddAssignment/>
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

<style lang="scss" scoped>
</style>
