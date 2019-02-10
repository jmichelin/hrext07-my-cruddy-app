<template>
  <ApolloMutation
    :mutation="require('../graphql/AddAssignment.gql')"
    :variables="{
        assignment: {
          name: name,
          description: description,
          due: due,
          tags: tags
        },
      }"
    class="form"
    @done="clearForm"
  >
    <template slot-scope="{ mutate }">
      <!-- <form v-on:submit.prevent="formValid && mutate()">
        <label for="field-message">Message</label>
        <input id="field-message" v-model="newMessage" placeholder="Type a message" class="input">
      </form>-->
      <v-form v-model="valid" v-on:submit.prevent="formValid && mutate()">
        <v-container>
          <v-layout>
            <v-flex xs12 md4>
              <v-text-field v-model="name" label="Assignment Name" required></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field v-model="description" label="Description" required></v-text-field>
            </v-flex>

            <v-text-field
              slot="activator"
              v-model="due"
              label="Assignment Due"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="due" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-layout>
        </v-container>
      </v-form>
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      due: "",
      tags: [],
    };
  },
  methods: {
    clearForm() {
      this.name = "";
      this.description = "";
      this.due = "";
      this.tags = [];
    },
  },
};
</script>

<style>
</style>
