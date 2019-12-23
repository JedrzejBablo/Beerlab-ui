import orderService from "../services/order.service";
import beerService from "../services/beer.service";

const initialState = {
  userActualOrder: {},
  orders: [],
  currentOrders: []
};

export const orders = {
  state: initialState,
  getters: {
    orders: state => {
      return state.orders;
    },
    currentOrders: state => {
      return state.currentOrders;
    },
    userActualOrder: state => {
      return state.userActualOrder;
    }
  },
  actions: {
    fetchAllOrders({ commit }) {
      orderService.fetchOrders().then(response => {
        commit("setOrders", response.data);
      });
    },
    fetchCurrentOrders({ commit }) {
      orderService.fetchCurrentOrders().then(response => {
        commit("setCurrentOrders", response.data);
      });
    },
    setOrderStatus({ dispatch }, data) {
      orderService.setOrderStatus(data.orderId, data.status).then(() => {
        dispatch("fetchAllOrders");
        dispatch("fetchCurrentOrders");
        dispatch("fetchUserActualOrder");
      });
    },
    deleteItemFromOrder({ dispatch }, data) {
      orderService.deleteItemFromOrder(data.orderId, data.beerId, data.quantity).then(() => {
        dispatch("fetchAllOrders");
        dispatch("fetchCurrentOrders");
        dispatch("fetchUserActualOrder");
      });
    },
    increaseAmount({ dispatch }, data) {
      beerService.addToCart( data.beerId, data.quantity).then(() => {
        dispatch("fetchAllOrders");
        dispatch("fetchCurrentOrders");
        dispatch("fetchUserActualOrder");
      });
    },
    reduceQuantity({ dispatch }, data) {
      orderService.reduceQuantity(data.orderId, data.beerId, data.quantity).then(() => {
        dispatch("fetchAllOrders");
        dispatch("fetchCurrentOrders");
        dispatch("fetchUserActualOrder");
      });
    },
    fetchUserActualOrder({ commit }) {
      orderService.fetchUserOrder().then(response => {
        commit("setUserActualOrder", response.data);
      });
    },
    confirmOrder({dispatch}){
      orderService.confirmOrder().then(() => {
        dispatch("fetchAllOrders");
        dispatch("fetchCurrentOrders");
        dispatch("fetchUserActualOrder");
      });
    }

  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
    setCurrentOrders(state, data) {
      state.currentOrders = data;
    },
    setUserActualOrder(state, data) {
      state.userActualOrder = data;
    }
  }
};