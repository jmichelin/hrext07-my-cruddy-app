<template>
  <div>
    <h1>TEST</h1>
    <li v-for="assignment in assignments" :key="assignment._id">
      <h4>{{assignment.name}}</h4>
      <p>{{assignment.description}}</p>
    </li>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      assignments: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/assignments")
      .then(res => (this.assignments = res.data));
  },
};
</script>

<style>
</style>

