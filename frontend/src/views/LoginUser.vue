<script>
import FormloginVue from "../components/Formlogin.vue";
import toastsVue from "../components/toasts.vue";
import Header from "../components/Header.vue"
export default {
  components: {
    FormloginVue,
    toastsVue,
    Header
  },
};
</script>
<template>
  <Header></Header>
  <toastsVue></toastsVue>

  <div class="h-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center">
        <h1 style="text-align: center; margin-bottom: 20px; color:#23468c" >Đăng Nhập</h1>
        <div class="col-md-12 col-lg-6 col-xl-4 mb-5">
          <FormloginVue></FormloginVue>
        </div>
      </div>
    </div>
  </div>
</template>
