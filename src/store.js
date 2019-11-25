import Vue from "vue";
import Vuex from "vuex";
import { authentication } from "./store/authentication.module.js";
import { beers } from "./store/beers.module.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    beers
  }
});
