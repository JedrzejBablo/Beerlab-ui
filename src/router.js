import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "./login/LoginPage.vue";
import HomePage from "./login/HomePage.vue";
import RegisterPage from "./login/RegisterPage";
import AdminPage from "./login/AdminPage.vue";
import BeerPage from "./beer/BeerPage";
import { authentication } from "./store/authentication.module.js";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HomePage
    },
    {
      path: "/register",
      component: RegisterPage
    },
    {
      path: "/login",
      component: LoginPage
    },
    {
      path: "/beers",
      component: BeerPage,
      meta: {
        authorize: ["ROLE_USER"]
      }
    },
    {
      path: "/admin",
      component: AdminPage,
      meta: {
        authorize: ["ROLE_ADMIN"]
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  if (authorize) {
    const user = this.$store.getters("loggedIn");

    if (!user) {
      return next({
        path: "/login"
      });
    }
    if (
      authorize.length &&
      !authorize.some(x => user["roles"].map(x => x["roleName"]).includes(x))
    ) {
      return next({
        path: "/"
      });
    }
  }

  next();
});
