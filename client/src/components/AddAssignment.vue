<template>
  <v-form v-on:submit.prevent="addAssignment">
    <v-snackbar v-model="assignmentAdded" :timeout="timeout" :top="top">Assignment has been added.
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-container>
      <v-layout column>
        <v-flex>
          <v-text-field v-model="name" label="Assignment Name" required></v-text-field>
        </v-flex>

        <v-flex>
          <v-text-field v-model="description" label="Description"></v-text-field>
        </v-flex>

        <v-flex>
          <v-text-field v-model="tags" label="Tags"></v-text-field>
        </v-flex>

        <v-flex>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="due"
              label="Picker without buttons"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="due" @input="menu = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex>
          <v-btn type="submit">Submit</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import AddAssignment from "../graphql/AddAssignment.gql";

export default {
  data() {
    return {
      menu: false,
      modal: false,
      name: "",
      description: "",
      due: new Date().toISOString().substr(0, 10),
      tags: "",
      top: true,
      timeout: 2000,
      assignmentAdded: false,
    };
  },
  computed: {
    tagsArray() {
      return this.tags.split(",").map(i => i.trim());
    },
  },
  methods: {
    clearForm() {
      this.name = "";
      this.description = "";
      this.due = new Date().toISOString().substr(0, 10);
      this.tags = "";
    },
    logVals() {
      console.log(`NAME: ${this.name}`);
      console.log(`DUE: ${this.due}`);
      console.log(`DESCRIPTION: ${this.description}`);
      console.log(`TAGS:`, this.tagsArray);
    },
    addAssignment() {
      const { name, description, due, tagsArray } = this;

      this.$apollo
        .mutate({
          mutation: AddAssignment,
          variables: {
            assignment: { name, description, due, tags: tagsArray },
          },
        })
        .then(res => {
          console.log(res);
          this.$emit("added", res.data.add.assignment);
          this.assignmentAdded = true;
          setTimeout(
            function() {
              this.assignmentAdded = false;
            }.bind(this),
            5000
          );
        });
    },
  },
};
</script>

<style>
</style>
