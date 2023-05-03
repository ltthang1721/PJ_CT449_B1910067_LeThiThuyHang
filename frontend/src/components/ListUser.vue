<script>
import UserService from "../services/User.service";
import toastjs from "../assets/js/toasts";
export default {
    data() {
        return {
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
        }
    },
    props: {
        users: Array,
        refeshlist: Function,
        activeUser: { type: Number, default: -1 },
    },
    emits: ['update:activeUser'],
    methods: {
        toastjs,
        async deluser(id) {
            try {
                await UserService.delete(id);
                this.refeshlist();
                this.toasts.title = "Success",
                    this.toasts.msg = "Đã xóa người dùng thành công!",
                    this.toasts.type = "success",
                    this.toasts.duration = 3000
                this.toastjs();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning",
                    this.toasts.msg = "Bạn không có quyền Admin",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000
                this.toastjs();
            }
        },
        updateuserindex(index) {
            this.$emit("update:activeUser", index)
        }
    }
}
</script>
<template>
    <ul class="mb-5">
        <li class="list-group-item user-item d-flex  " style="width:1000px; background:#23468c; color:white">
            <div style="width:35%">ID</div>
            <div style="width:25%">USERNAME</div>
            <span>EMAIL</span>
            <span style="margin-left:17%">ADMIN</span>
            <div style="margin-left:10%">QL</div>
        </li>
        <li class="list-group-item user-item d-flex justify-content-between " style="width:1000px"
            v-for="(user, index) in users" v-show="!user.isAdmin" :key="user._id" @click="updateuserindex(index)">
            <div>{{ user._id }}</div>
            <div>{{ user.username }}</div>
            <span>{{ user.email }}</span>
            <span>{{ user.isAdmin }}</span>
            <div @click="deluser(user._id)"><i class="bi bi-trash"></i></div>
        </li>
    </ul>
</template>
<style scoped>
.list-group-item:hover {
    background-color: #97b9ff;
    color: azure;
}
</style>