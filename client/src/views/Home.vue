<template>
  <div class="ma-4">
    <Assignments/>
    <AddAssignment/>
    <!-- <HelloWorld/> -->
  </div>
</template>

<script>
// import HelloWorld from "../components/HelloWorld";
import Assignments from "../components/Assignments.vue";
import AddAssignment from "../components/AddAssignment.vue";

export default {
  components: {
    // HelloWorld,
    Assignments,
    AddAssignment,
  },
};
</script>
