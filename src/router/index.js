import VueRouter from "vue-router"
import Vue from 'vue'
import Index from "@/pages/Index"
import Editing from "@/pages/Editing"
import store from "@/store"

Vue.use(VueRouter);

let routes = [
    {
        name: "index",
        path: "/",
        component: Index,
        meta: {
            title: "Все заметки"
        }
    },
    {
        name: "create",
        path: "/create",
        component: Editing,
        meta: {
            title: "Создать заметку"
        }
    },
    {
        name: "edit",
        path: "/:id",
        component: Editing,
        meta: {
            // Выбираем название заметки в качестве title страницы
            title: (id) => store.getters.getNote(id).title
        }
    }
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if(to.params.id) {
        // Выбираем название заметки в качестве title страницы
        document.title = `${to.meta.title(to.params.id)} | Todo`;
    } else {
        document.title = `${to.meta.title} | Todo`;
    }

    next();
});

export default router;