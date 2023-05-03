<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "../services/Auth.service";
import toast from "../assets/js/toasts";
import toastsVue from "../components/toasts.vue";
import Header from "../components/Header.vue"
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    toastsVue,
    Header
  },
  data() {
    const Signupform = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự."),
      email: yup
        .string()
        .required("Email phải có giá trị.")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      pwd: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
    });
    return {
      Signupform,
      message: "Đăng ký thành công",
      usernew: {
        username: "",
        email: "",
        password: "",
      },
      toasts: {
        title: "",
        msg: "",
        type: "",
        duration: 0
      },
    };
  },
  methods: {
    toast,
    async postuser() {
      try {
        await AuthService.createsignup(this.usernew);
        this.toasts.title = "Success",
          this.toasts.msg = "Đăng ký thành công!",
          this.toasts.type = "success",
          this.toasts.duration = 2000
        this.toast();
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 2000);
      } catch (erorr) {
        console.log(erorr);
        this.toasts.title = "Faild",
          this.toasts.msg = "Thông tin bạn nhập đã được sử dụng!",
          this.toasts.type = "error",
          this.toasts.duration = 2000
        this.toast();
      }
    }
  }
};
</script>

<template>
  <Header></Header>
  <toastsVue></toastsVue>
  <section class="text-center text-lg-start ">
    <div class="container w-50 py-4">
      <div class="row g-0 align-items-center">
        <div class="col-lg-12 mb-5 mb-lg-0">
          <div class="card cascading-right" style="
            background: hsla(0, 0%, 100%, 0.55);
            backdrop-filter: blur(30px);border-radius:25px
            ">
            <div class="card-body p-5 shadow-5 ">
              <h1 class=" mb-2 text-center" style="color:#23468c">Đăng Ký</h1>
              <Form :validation-schema="Signupform">
                <div class="form-outline mb-4">
                  <label class="form-label" for="name">Tên Tài Khoản</label>
                  <Field id="name" name="name" placeholder="Nhập vào username..." type="text" class="form-control" v-model="usernew.username"
                    style="border-radius:25px" />
                  <ErrorMessage name="name" class="text-danger" />
                </div>
                <div class="mb-4">
                  <label class="form-label" for="email">Email</label>
                  <div class="form-outline">
                    <Field id="email" name="email" placeholder="Nhập vào email..." type="email" class="form-control" v-model="usernew.email"
                      style="border-radius:25px" />
                    <ErrorMessage name="email" class="text-danger" />
                  </div>
                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="pwd">Mật Khẩu</label>
                  <Field id="pwd" name="pwd" placeholder="Nhập vào mật khẩu..." type="password" class="form-control" v-model="usernew.password"
                    style="border-radius:25px" />
                  <ErrorMessage name="pwd" class="text-danger" />
                </div>

                <button type="button" class="btn btn-primary btn-block mb-4 text-center" @click="postuser()">
                  Đăng Ký
                </button>
                <p>Nếu bạn đã có tài khoản hãy <router-link to="/login" class="link-danger">Đăng nhập</router-link></p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
<style scoped  >
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}
</style>
