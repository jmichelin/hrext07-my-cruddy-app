<template>
  <v-hover>
    <v-sheet
      class="mx-auto mb-2 py-2 px-4 pointer"
      :style="{ borderLeft: '3px solid ' + activeColor }"
      :class="[assignment.completed ? 'completed' : '', `elevation-${hover ? 2 : 0}`]"
      slot-scope="{ hover }"
    >
      <!-- <v-container fluid grid-list-lg> -->
      <!-- <v-expansion-panel>
      <v-expansion-panel-content>-->
      <v-snackbar
        v-model="assignmentCompleted"
        color="success"
        :timeout="timeout"
        :top="top"
      >Congrats! You have completed the assignment.
        <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="errorMessage"
        color="error"
        :timeout="timeout"
        :top="top"
      >Oh, no! Something has gone wrong. Please try again.
        <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-layout align-center justify-start fill-height row>
        <v-flex xs1 sm1 md1 lg1 xl1>
          <v-checkbox
            v-model="assignment.completed"
            @click.native.prevent="checkAction(assignment)"
          ></v-checkbox>
        </v-flex>
        <v-flex xs6 sm6 md6 lg6 xl6>
          <div :class="assignment.completed ? 'completed__text' : ''">
            <h4>{{assignment.name}}</h4>
            <span class="due">{{date}}</span>
          </div>
        </v-flex>
        <v-flex xs4 sm4 md4 lg4 xl4 shrink text-xs-center>
          <v-chip
            v-for="tag in assignment.tags"
            :key="tag"
            :data-tag="tag"
            class="chip"
            @input="removeTag(tag, assignment)"
            outline
            close
          >{{tag}}</v-chip>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1 xl1 text-xs-center>
          <v-layout row>
            <v-flex>
              <Update :assignment="assignment" @update="emitUpdate"/>
            </v-flex>
            <v-flex>
              <v-btn outline fab small color="red" @click="deleteAssignment(assignment._id)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- </v-container> -->
      <!-- <v-card>
          <v-card-text>{{assignment.description}}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
      </v-expansion-panel>-->
    </v-sheet>
  </v-hover>
</template>

<script>
import { gql } from "apollo-boost";

import Update from "@/components/Update.vue";

import formatDate from "@/helpers/DateFormat.js";
import UpdateAssignment from "@/graphql/UpdateAssignment.gql";
import DeleteAssignment from "../graphql/DeleteAssignment.gql";
import { setTimeout } from "timers";

export default {
  components: {
    Update,
  },
  props: {
    assignment: {
      type: Object,
    },
  },
  data() {
    return {
      activeColor: "red",
      completed: false,
      dialog: false,
      timeout: 2000,
      top: true,
      assignmentCompleted: false,
      errorMessage: false,
    };
  },
  computed: {
    date() {
      const dueDate = new Date(parseInt(this.assignment.due, 10));
      return formatDate("[mth] [date], [yyyy]", dueDate);
    },
  },
  methods: {
    checkAction(assignment) {
      const { __typename, ...newA } = assignment;
      this.$apollo
        .mutate({
          mutation: UpdateAssignment,
          variables: {
            assignment: newA,
          },
        })
        .then(res => {
          this.assignmentCompleted = res.data.update.assignment.completed;
        })
        .catch(error => {
          this.errorMessage = true;
          setTimeout(
            function() {
              this.errorMessage = false;
            }.bind(this),
            5000
          );
        });
    },
    removeTag(tag, assignment) {
      const newAssignment = {
        ...assignment,
        tags: assignment.tags.filter(t => t !== tag),
      };

      const { __typename, ...newA } = newAssignment;

      this.$apollo
        .mutate({
          mutation: UpdateAssignment,
          variables: {
            assignment: newA,
          },
        })
        .then(res => {
          this.$emit("update", res.data.update.assignment);
        })
        .catch(error => {
          this.errorMessage = true;
          setTimeout(
            function() {
              this.errorMessage = false;
            }.bind(this),
            5000
          );
        });
    },
    deleteAssignment(id) {
      this.$apollo
        .mutate({
          mutation: DeleteAssignment,
          variables: {
            id: id,
          },
        })
        .then(res => {
          console.log(res);
          this.$emit("delete", res.data.remove.assignment._id);
        })
        .catch(error => {
          this.errorMessage = true;
          setTimeout(
            function() {
              this.errorMessage = false;
            }.bind(this),
            5000
          );
        });
    },
    emitUpdate(assignment) {
      this.$emit("update", assignment);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  border: 1px solid red;
}
.flexer {
  border: 1px solid black;
}

.main {
  border: 1px solid blue;
}

.completed {
  background-color: #f6f6f6;
}
.completed__text {
  color: #666;
  text-decoration: line-through;
  font-style: italic;
}
.pointer {
  cursor: pointer;
}
</style>