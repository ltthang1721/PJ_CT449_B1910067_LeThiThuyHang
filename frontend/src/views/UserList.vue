<script>
import Header from "../components/Header.vue";
import ListUser from "../components/ListUser.vue";
import UserService from "../services/User.service";
import toastsVue from "../components/toasts.vue";
import toast from "../assets/js/toasts";
export default {
    data() {
        return {
            users: [],
            activeIndex: -1,
            activeUser: -1,
            toasts: {
                title: "Warning",
                msg: "Bạn không có quyền Admin",
                type: "warn",
                duration: 3000
            },
        }
    },
    computed: {
        getindexuser() {
            if (this.activeUser != -1) {
                const list = document.querySelectorAll(".user-item");
                list.forEach(element => {
                    element.classList.remove("active");
                });
                list[this.activeUser].classList.add("active");
                return this.users[this.activeUser];
            }
        }
    },
    components: {
        Header,
        ListUser,
        toastsVue,
    },
    methods: {
        toast,
        async getall() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
                this.toast();
                setTimeout(() => {
                    this.$router.push({ name: "ShopMain" });
                }, 1000);
            }
        },
    },
    created() {
        this.getall();
    },
}
</script>

<template>
    <Header></Header>
    <toastsVue></toastsVue>
    <div class="header text-center">
        <h2> <router-link to="/admin" style="text-decoration:none; color: black">QUẢN TRỊ VIÊN</router-link>/<span
                style="color: #23468c;">Danh Sách Người dùng</span></h2>
    </div>
    <router-link to="/admin">
        <button class="btn btn-outline-danger" style="margin-left:10%"><i class="bi bi-arrow-left"></i> Trở về</button>
    </router-link>
    <div class="main_admin d-flex" style="margin-top:30px; margin-left: 100px;">

        <div class="list_users w-100">

            <div class="list_item_user d-flex" id="user">
                <ListUser :users="users" :refeshlist="getall" v-model:activeUser="activeUser">
                </ListUser>

            </div>
        </div>

    </div>
</template>
<style scoped>
.list_item_product,
.list_item_user {
    max-height: 500px;
    overflow-y: scroll;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

#product::-webkit-scrollbar,
#user::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
}
</style>