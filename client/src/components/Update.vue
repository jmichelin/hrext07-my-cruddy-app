<template>
  <ApolloMutation
    :mutation="require('@/graphql/UpdateAssignment.gql')"
    :variables="{
            assignment: { _id: id, name, description, due, tags: this.tags.split(', '), completed }
          }"
    class="form"
    @done="clearForm"
  >
    <template slot-scope="{ mutate }">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn fab dark small color="cyan" slot="activator">
          <v-icon dark>edit</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Assignment</span>
          </v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent="mutate()">
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
                        label="Click to select date"
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

            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </ApolloMutation>
</template>

<script>
import UpdateAssignment from "@/graphql/UpdateAssignment.gql";

export default {
  props: {
    assignment: Object,
  },
  data() {
    return {
      dialog: false,
      menu: false,
      modal: false,
      id: this.assignment._id,
      name: this.assignment.name,
      description: this.assignment.description,
      due: new Date(parseInt(this.assignment.due, 10))
        .toISOString()
        .substr(0, 10),
      completed: this.assignment.completed,
      tags: this.assignment.tags.join(", "),
    };
  },
  // computed: {
  //   tagsArray() {
  //     return this.tags ? this.tags.split(",").map(i => i.trim()) : "";
  //   },
  // },
  methods: {
    clearForm() {
      this.name = "";
      this.description = "";
      this.due = new Date().toISOString().substr(0, 10);
      this.tags = "";
    },
  },
  mounted() {
    console.log(this.due);
  },
};
</script>

<style>
</style>