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
        msg: "Thêm sách thành công!",
        type: "success",
        duration: 3000
      },
    }
  },
  components: {
    Header,
    Productform,
    toastsVue
  },
  methods: {
    toastjs,
    async addproduct(data) {
      try {
        await ProductService.create(data);
        this.toastjs();
        setTimeout(() => {
          location.reload();
        }, 3000);
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
};
</script>
<template>
  <Header></Header>
  <toastsVue></toastsVue>
  <div class="page">
    <div>
      <div class="header text-center">
        <h2> <router-link to="/admin" style="text-decoration:none; color: black; ">QUẢN TRỊ VIÊN</router-link>/<span
            style="color: #23468c;">Thêm Sản Phẩm</span></h2>
      </div>
      <router-link to="/productlist">
        <button class="btn btn-outline-danger" style="margin-left:10%"><i class="bi bi-arrow-left"></i> Trở về</button>
      </router-link>
      <Productform :product="{ img: [] }" @submit:product="addproduct" :resetAfterSubmit="true" />
    </div>
  </div>
</template>
