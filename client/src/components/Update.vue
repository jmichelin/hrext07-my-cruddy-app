<template>
  <div>
    <v-snackbar
      v-model="errorMessage"
      color="error"
      :timeout="timeout"
      :top="top"
    >Oh, no! Something has gone wrong. Please try again.
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn fab dark outline small color="cyan" slot="activator">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Assignment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout column>
              <v-flex>
                <v-text-field v-model="name" label="Assignment Name" required></v-text-field>
              </v-flex>

              <v-flex>
                <v-text-field v-model="description" label="Description"></v-text-field>
              </v-flex>

              <v-flex>
                <!-- <v-text-field v-model="tags" label="Tags"></v-text-field> -->
                <v-combobox
                  v-model="tags"
                  :items="tags"
                  :search-input.sync="search"
                  hide-selected
                  label="Add some tags"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template slot="no-data">
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          No results matching "
                          <strong>{{ search }}</strong>". Press
                          <kbd>enter</kbd> to create a new one
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-combobox>
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
            </v-layout>
          </v-container>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="updateAssignment()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
      tags: this.assignment.tags,
      errorMessage: false,
      top: true,
      timeout: 2000,
      search: null,
      model: [],
    };
  },
  computed: {
    tagsString() {
      return this.assignment.tags.join(", ");
    },
  },
  methods: {
    clearForm() {
      this.name = "";
      this.description = "";
      this.due = new Date().toISOString().substr(0, 10);
      this.tags = "";
    },
    closeDialog() {
      this.dialog = false;
    },
    updateAssignment() {
      const { id, name, description, due, completed } = this;

      this.$apollo
        .mutate({
          mutation: UpdateAssignment,
          variables: {
            assignment: {
              _id: id,
              name,
              description,
              due,
              tags: this.tags,
              completed,
            },
          },
        })
        .then(res => {
          this.$emit("update", res.data.update.assignment);
          this.closeDialog();
        })
        .catch(e => {
          this.errorMessage = true;
        });
    },
  },
};
</script>

<style>
</style>

<!-- 
variables="{
            
          }"
-->