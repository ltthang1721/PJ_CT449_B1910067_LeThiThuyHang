<script>
import toastjs from "../assets/js/toasts";
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import Header from "../components/Header.vue";
import Productform from "../components/Productform.vue";
export default {
    data() {
        return {
            toasts: {
                title: "Success",
                msg: "Chỉnh sửa sản phẩm thành công",
                type: "success",
                duration: 3000
            },
            product: null,
        }
    },
    components: {
        Header,
        Productform,
        toastsVue
    },
    methods: {
        toastjs,
        async getproduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
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
    },
    created() {
        this.getproduct(this.$route.params.id);
    }
};
</script>
<template>
    <Header></Header>
    <toastsVue></toastsVue>
    <div v-if="product" class="page">
        <div class="header text-center">
            <h2> <router-link to="/admin" style="text-decoration:none; color: black">QUẢN TRỊ VIÊN</router-link>/<span
                    style="color: #23468c;">Chỉnh Sửa Sản Phẩm</span></h2>
        </div>
        <router-link to="/productlist">
            <button class="btn btn-outline-danger" style="margin-left:10%"><i class="bi bi-arrow-left"></i> Trở về</button>
        </router-link>
        <Productform :product="product" @submit:product="updateProduct" />
    </div>
</template>