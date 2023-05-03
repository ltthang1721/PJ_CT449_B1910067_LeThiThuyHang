<script>
import Header from "../components/Header.vue";
import toastsVue from "../components/toasts.vue";
import toast from "../assets/js/toasts";
export default {
    data() {
        return {
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
    components: {
        Header,
        toastsVue,
    },
}
</script>

<template>
    <Header></Header>
    <toastsVue></toastsVue>
    <div class="header text-center">
        <h1 class="mb-4">QUẢN TRỊ VIÊN</h1>
    </div>
    <div class="container w-50" style="margin:auto;">
        <div class="row">
            <div class="col-5">
                <router-link to="/userlist" style="text-decoration:none; color:#23468c">
                    <div>
                        <img src="../assets/img/user.png" style="width:300px" />
                        <h5 style="margin-left:10%">Danh Sách Người Dùng</h5>
                    </div>
                </router-link>
            </div>
            <div class="col-2"></div>
            <div class="col-5 ">
                <router-link to="/productlist" style="text-decoration:none; color:#23468c">
                    <div style="margin-bottom:30%"><img src="../assets/img/product.png" style="width:300px" />
                        <h5 style="margin-left:17%">Danh Sách Sản Phẩm</h5>
                    </div>
                </router-link>
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