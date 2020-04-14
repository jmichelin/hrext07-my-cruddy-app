import Vue from "vue";
import Vuex from "vuex";
import GetAssignment from "@/graphql/GetAssignments.gql";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assignnments: [],
  },
  mutations: {
    ADD(state, assignment) {
      state.assignments.unshift(assignment);
    },
    LOAD(state, assignments) {
      state.assignments = assignments;
      console.log(state.assignments);
    },
    UPDATE(state, assignment) {
      state.assignments.map(item =>
        item._id === assignment._id ? assignment : item
      );
    },
    REMOVE(state, id) {
      state.assignments.filter(item => item._id !== id);
    },
  },
  actions: {
    async loadAssignments({ commit }) {
      console.log(this.$apollo.query);
      const { data } = await this.$apollo.query({ query: GetAssignment });
      commit("LOAD", data.assignments);
    },
  },
});
