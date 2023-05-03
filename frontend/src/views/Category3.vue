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
        <div class="flex-row" style="margin:0 30px;  ">
            <div style="margin: 30px 0;" class="heading">
                <h3><router-link to="/" style="text-decoration:none; color: black">Trang Chủ</router-link>/<span style="color:#23468c;
                   ">Tình Yêu</span></h3>
                <h6>Những cuốn sách giúp bạn tin vào tình yêu hoặc không</h6>
            </div>
            <div class="d-sm-flex flex-wrap" id="love">
                <div class="card m-1" style="width: 17rem;  border: solid #23468c 0px;text-align:center"
                    v-for="item in Products" v-show="item.categories === 'Tình Yêu' || item.categories === 'Dép'">
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
                            <button type="button" class="btn btn-outline-dark" style="border-radius:25px"
                                @click="nextdetailsproduct">Xem Chi Tiết</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
    </div>
</template>
<style scoped>   .wrapper-img {
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