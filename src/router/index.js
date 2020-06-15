import VueRouter from "vue-router"
import Vue from 'vue'

Vue.use(VueRouter);

let routes = [
    {
        name: "index",
        path: "/",
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;