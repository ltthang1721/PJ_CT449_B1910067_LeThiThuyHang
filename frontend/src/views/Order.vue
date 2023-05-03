<script>
import Header from '@/components/Header.vue'
import toastsVue from '../components/toasts.vue';
export default {
    components: {
        Header,
        toastsVue
    },
}
</script>
<template>
    <div class="header">
        <Header></Header>
    </div>
    <toastsVue></toastsVue>
    <img class="" src="../assets/img/order_accepted_icon.svg" alt="">
    <div class="container w-50 form">
        <h3>Đặt Hàng Thành Công!</h3>
        <p> Cảm ơn bạn đã mua hàng của chúng tôi! Đơn hàng sẽ được giao đến bạn từ 2 - 3 ngày, mong bạn yêu để ý điện thoại
            của
            mình. Chúc bạn sẽ tích lũy được thêm nhiều kiến thức sau khi đọc xong những cuốn sách này nha!!!</p>
        <router-link to="/" style=" color: black">
            <p >Trở Về Trang Chủ</p>
        </router-link>
    </div>
</template>
<style scoped>  img {
      margin-left: 39%;
  }

  .form {
    text-align: center;
    margin-bottom: 30px;
  }
</style>