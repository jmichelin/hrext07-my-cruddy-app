<template>
  <v-sheet class="mx-auto mb-2 py-2 px-4" v-bind:style="{ borderLeft: '3px solid ' + activeColor }">
    <!-- <v-container fluid grid-list-lg> -->
    <v-layout align-center justify-start fill-height row>
      <v-flex xs1 sm1 md1 lg1 xl1>
        <v-checkbox v-model="assignment.completed" @click.native.prevent="checkAction(assignment)"></v-checkbox>
      </v-flex>
      <v-flex xs6 sm6 md6 lg6 xl6>
        <div>
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
        <v-btn fab dark small color="cyan">
          <v-icon dark>edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <!-- </v-container> -->
  </v-sheet>
</template>

<script>
import { gql } from "apollo-boost";

import formatDate from "@/helpers/DateFormat.js";
import UpdateAssignment from "@/graphql/UpdateAssignment.gql";

export default {
  props: {
    assignment: {
      type: Object,
    },
  },
  data() {
    return {
      activeColor: "red",
      completed: false,
      chip1: true,
      chip2: true,
      chip3: true,
      chip4: true,
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
      const newAssignment = {
        ...assignment,
        completed: !assignment.completed,
      };

      const { __typename, ...newA } = newAssignment;

      this.$apollo
        .mutate({
          mutation: UpdateAssignment,
          variables: {
            assignment: newA,
          },
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
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
          // Query
          mutation: UpdateAssignment,
          // Parameters
          variables: {
            assignment: newA,
          },
          // // Update the cache with the result
          // // The query will be updated with the optimistic response
          // // and then with the real result of the mutation
          // update: (store, { data: { addTag } }) => {
          //   // Read the data from our cache for this query.
          //   const data = store.readQuery({ query: TAGS_QUERY });
          //   // Add our tag from the mutation to the end
          //   data.tags.push(addTag);
          //   // Write our data back to the cache.
          //   store.writeQuery({ query: TAGS_QUERY, data });
          // },
          // // Optimistic UI
          // // Will be treated as a 'fake' result as soon as the request is made
          // // so that the UI can react quickly and the user be happy
          // optimisticResponse: {
          //   __typename: "Mutation",
          //   addTag: {
          //     __typename: "Tag",
          //     id: -1,
          //     label: newTag,
          //   },
          // },
        })
        .then(data => {
          // Result
          console.log(data);
        })
        .catch(error => {
          // Error
          console.error(error);
          // We restore the initial user input
          // this.newTag = newTag;
        });
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
</style>

<!-- 
.container {
  display: grid;
  width: 100%;
  grid-template-columns: 30px 1fr 1fr 30px;
  grid-gap: 2em;
  font-size: 0.8em;
}

.flexer {
  border: 1px solid black;
}

.checkbox {
  width: 20px;
  border: 1px solid red;
}

<div class="container">
      <div class="checkbox">
        <v-checkbox v-model="assignment.completed" @click.native.prevent="checkAction(assignment)"></v-checkbox>
      </div>
      <div class="title">
        <h4>{{assignment.name}}</h4>
        <span class="due">{{date}}</span>
      </div>
      <div class="tags">
        <div class="text-xs-center">
          <v-chip
            v-for="tag in assignment.tags"
            :key="tag"
            :data-tag="tag"
            class="chip"
            @input="removeTag(tag, assignment)"
            outline
            close
          >{{tag}}</v-chip>
        </div>
      </div>
      <div class="edit">
        <v-btn fab dark small color="cyan">
          <v-icon dark>edit</v-icon>
        </v-btn>
      </div>
    </div>

-->