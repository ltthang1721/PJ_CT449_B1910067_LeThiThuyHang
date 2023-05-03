import {createRouter,createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "ShopMain",
        component: Home,
    },
    {
        path: "/Cart",
        name: "CartShop",
        component: () => import("@/views/CartShop.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginUser.vue"),
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/Signup.vue"),
    },
    {
        path: "/details/:id",
        name: "details",
        component: () => import("@/views/DetailsProduct.vue"),
    },
    {
        path: "/addproduct",
        name: "addproduct",
        component: () => import("@/views/AddProduct.vue"),
    },
    {
        path: "/editproduct/:id",
        name: "editproduct",
        component: () => import("@/views/EditProduct.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/UserProfile.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/Admin.vue"),
    },
    {
        path: "/userlist",
        name: "userlist",
        component: () => import("@/views/UserList.vue"),
    },
    {
        path: "/productlist",
        name: "productlist",
        component: () => import("@/views/ProductList.vue"),
    },
    {
        path: "/cuocsong",
        name: "cuocsong",
        component: () => import("@/views/Category1.vue"),
    },
    {
        path: "/kinhte",
        name: "kinhte",
        component: () => import("@/views/Category4.vue"),
    },
    {
        path: "/tamlyhoc",
        name: "tamlyhoc",
        component: () => import("@/views/Category2.vue"),
    },
    {
        path: "/tinhyeu",
        name: "tinhyeu",
        component: () => import("@/views/Category3.vue"),
    },
    {
        path: "/allproduct",
        name: "allproduct",
        component: () => import("@/views/AllProduct.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/Admin.vue"),
    },
    {
        path: "/order",
        name: "order",
        component: () => import("@/views/Order.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;