<script>
import Header from '@/components/Header.vue'
import ProductService from '../services/Product.service'
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toastsVue from '../components/toasts.vue';
export default {
    data() {
        return {
            Products: [],
        }
    },
    components: {
        Header,
        toastsVue
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    methods: {
        async retrieveProduct() {
            try {
                this.Products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveProduct();
    },
}
</script>
<template>
    <div class="header">
        <Header></Header>
    </div>
    <toastsVue></toastsVue>
    <div style="margin: 20px 50px;">
        <div style=" margin: 30px 0;" class="heading">
            <h3><router-link to="/" style="text-decoration:none; color: black">Trang Chủ</router-link>/<span style="color:#23468c;
              ">Tất cả sản phẩm</span></h3>
            <h6>Tất cả những cuốn sách hay đều ở đây</h6>
        </div>
        <div class="flex-row" style="margin:0 30px; text-align:center">
            <div class="d-lg-flex flex-wrap" id="life">
                <div class="card m-1" style="width: 17rem; border: solid #23468c 0px" v-for="item in Products">
                    <div class="wrapper-img">
                        <div class="image_slider">
                            <div class="image_item" v-for="img in item.img">
                                <img :src="img" class="card-img-top" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="card-body product">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <h6 class="price">{{ item.price }}.000VND</h6>
                        <router-link :to="{
                            name: 'details',
                            params: { id: item._id },
                        }">
                            <button type="button" class="btn btn-outline-dark" style="border-radius:25px"> Xem Chi
                                Tiết</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>  .wrapper-img {
      width: 100%;
      height: 100%;
      overflow: hidden;
  }

  .image_slider {
      display: flex;
      transition: all .8s ease;

  }

  .image_item {
      flex: 1 0 100%;
  }
</style>