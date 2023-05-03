<script>
import Header from '@/components/Header.vue';
import CartService from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js'
import CartItem from "../components/CartItem.vue";
export default {
  data() {
    return {
      carts: [],
      toasts: {
        title: "",
        msg: "",
        type: "",
        duration: 0
      },
    }
  },
  components: {
    Header,
    toastsVue,
    CartItem
  },
  methods: {
    getiduser() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user._id;
    },
    async getcarts() {
      try {
        this.carts = await CartService.get(this.getiduser());
      } catch (error) {
        console.log(error);
      }
    },
    async delcart(index) {
      this.toasts.title = "Deleted",
        this.toasts.msg = "Đã xóa sản phẩm",
        this.toasts.type = "error",
        this.toasts.duration = 2000
      this.toastsjs();
      await CartService.delete(this.carts[index]._id)
      this.refeshlistcart();
    },
    toastsjs,
    refeshlistcart() {
      this.getcarts();
    },
    registerproduct() {
      if (this.carts.length > 0) {
        this.refeshlistcart();
        location.href = 'http://localhost:3001/order';

      } else {
        this.toasts.title = "Failed",
          this.toasts.msg = "Giỏ hàng không có sản phẩm",
          this.toasts.type = "error",
          this.toasts.duration = 2000,
          this.toastsjs();
      }
    },
    total() {
      var total = 0;
      for (var i in this.carts) {
        total += (this.carts[i].price * this.carts[i].quantity);
      }
      return total;
    }
  },
  created() {
    this.refeshlistcart();
  },
}
</script>
<template>
  <Header></Header>
  <toastsVue></toastsVue>
  <section class="h-100 h-custom" style="background-color: rgb(234,232,232);">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-12">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0" style="color: #23468c;">GIỎ HÀNG</h1>
                      <h6 class="mb-0 text-muted">{{ carts.length }} sản phẩm</h6>
                    </div>
                    <hr class="my-4">
                    <CartItem :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>
                    <div class="pt-5">
                      <h6 class="mb-0"><router-link to="/" class="text-body"><i
                            class="fas fa-long-arrow-alt-left me-2"></i>Tiếp tục mua hàng</router-link></h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 bg-grey">
                  <div class="p-5">
                    <hr class="my-4">
                    <div class="d-flex justify-content-between mb-5">
                      <h4 class="text-uppercase textf">TỔNG ĐƠN HÀNG</h4>
                      <h4 class="textf">{{ total() }}<span>.000VND</span></h4>
                    </div>

                    <button
                      style=" margin: auto; position: absolute; left: 0; right: 0;height: 50px; width:150px; background-color:#23468c;color:white"
                      type="button" class="btn btn-block btn-lg" data-mdb-ripple-color="dark"
                      @click="registerproduct()">Đặt Hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@media (min-width: 1025px) {
  .h-custom {
    height: 100%;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: .75em;
  padding-right: .75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #eae8e8;
}
</style>