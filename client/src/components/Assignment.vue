<template>
  <v-sheet class="mx-auto py-2 px-4" v-bind:style="{ borderLeft: '3px solid ' + activeColor }">
    <v-layout align-center justify-start fill-height row>
      <v-flex auto>
        <v-checkbox @click.native.prevent="checkAction"></v-checkbox>
      </v-flex>
      <v-flex>
        <div>
          <h4>Final Assignment</h4>
          <span class="due">Wed, Feb. 15th</span>
        </div>
      </v-flex>
    </v-layout>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      activeColor: "red",
      completed: false,
    };
  },
  methods: {
    checkAction(e) {
      console.log("CHECKED");
    },
  },
};
</script>

<style>
</style>
