<template>
  <div class="ma-4">
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
