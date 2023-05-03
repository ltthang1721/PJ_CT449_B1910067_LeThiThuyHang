<script>
import Banner from '@/components/Banner.vue'
import Header from '@/components/Header.vue'
import ProductService from '../services/Product.service'
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toastsVue from '../components/toasts.vue';
import { defineComponent } from 'vue'
import { Pagination, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
export default {
    name: 'swiper-example-free-mode',
    title: 'Free mode / no fixed positions',
    data() {
        return {
            Products: [],
        }
    },
    components: {
        Header,
        Banner,
        toastsVue,
        Swiper,
        SwiperSlide,
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
    setup() {
        return {
            modules: [Pagination, FreeMode]
        }
    }
}
</script>
<template>
    <div class="header">
        <Header></Header>
    </div>
    <toastsVue></toastsVue>
    <div class="slider">
        <Banner></Banner>
    </div>
    <div>
        <div class="divider"><span></span><span><router-link to="/cuocsong" style="text-decoration:none;color:#23468c">Cuộc
                    Sống</router-link></span><span></span></div>
        <swiper class="swiper container" :modules="modules" :space-between="0" :slides-per-view="4" :free-mode="true"
            :pagination="{ clickable: true }" style="height: 450px;">
            <swiper-slide class="slide" v-for="item in Products" v-show="item.categories === 'Cuộc Sống'">
                <div class="flex-row" style="margin:0 10px; text-align:center">
                    <div class="d-lg-flex flex-wrap" id="life">
                        <div class="card m-1" style="width: 17rem; border: solid #23468c 0px">
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
                                    <button type="button" class="btn btn-outline-dark" style="border-radius:25px">
                                        Xem Chi Tiết </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>



        <div class="divider"><span></span><span><router-link to="/cuocsong" style="text-decoration:none;color:#23468c">Tình
                    Yêu
                </router-link></span><span></span></div>

        <swiper class="swiper container" :modules="modules" :space-between="0" :slides-per-view="4" :free-mode="true"
            :pagination="{ clickable: true }" style="height: 450px;">
            <swiper-slide class="slide" v-for="item in Products" v-show="item.categories === 'Tình Yêu'">
                <div class="flex-row" style="margin:0 10px; text-align:center">
                    <div class="d-lg-flex flex-wrap" id="life">
                        <div class="card m-1" style="width: 17rem; border: solid #23468c 0px">
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
                                    <button type="button" class="btn btn-outline-dark" style="border-radius:25px">
                                        Xem Chi Tiết </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <div class="divider"><span></span><span><router-link to="/cuocsong" style="text-decoration:none;color:#23468c">Tâm
                    Lý Học</router-link></span><span></span></div>
        <swiper class="swiper container" :modules="modules" :space-between="0" :slides-per-view="4" :free-mode="true"
            :pagination="{ clickable: true }" style="height: 450px;">
            <swiper-slide class="slide" v-for="item in Products" v-show="item.categories === 'Tâm Lý Học'">
                <div class="flex-row" style="margin:0 10px; text-align:center">
                    <div class="d-lg-flex flex-wrap" id="life">
                        <div class="card m-1" style="width: 17rem; border: solid #23468c 0px">
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
                                    <button type="button" class="btn btn-outline-dark" style="border-radius:25px">
                                        Xem Chi Tiết </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <div class="divider"><span></span><span><router-link to="/cuocsong" style="text-decoration:none;color:#23468c">Kinh
                    Tế</router-link></span><span></span></div>
        <swiper class="swiper container" :modules="modules" :space-between="0" :slides-per-view="4" :free-mode="true"
            :pagination="{ clickable: true }" style="height: 450px;">
            <swiper-slide class="slide" v-for="item in Products" v-show="item.categories === 'Kinh Tế'">
                <div class="flex-row" style="margin:0 10px; text-align:center">
                    <div class="d-lg-flex flex-wrap" id="life">
                        <div class="card m-1" style="width: 17rem; border: solid #23468c 0px">
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
                                    <button type="button" class="btn btn-outline-dark" style="border-radius:25px">
                                        Xem Chi Tiết </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

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



   .divider {
       display: table;
       font-size: 30px;
       text-align: center;
       width: 75%;
       font-weight: bold;
       padding: 30px;
   }

   .divider span {
       display: table-cell;
       position: relative;
   }

   .divider span:first-child,
   .divider span:last-child {
       width: 50%;
       top: 20px;
       -moz-background-size: 100% 2px;
       background-size: 100% 2px;
       background-position: 0 0, 0 100%;
       background-repeat: no-repeat;
   }

   .divider {
       display: table;
       font-size: 30px;
       text-align: center;
       width: 75%;
       margin: 40px auto;
   }

   .divider span {
       display: table-cell;
       position: relative;
   }

   .divider span:first-child,
   .divider span:last-child {
       width: 50%;
       top: 23px;
       -moz-background-size: 100% 2px;
       background-size: 100% 2px;
       background-position: 0 0, 0 100%;
       background-repeat: no-repeat;
   }

   .divider span:first-child {
       background-image: -webkit-gradient(linear,
               0 0,
               0 100%,
               from(transparent),
               to(#23468c));
       background-image: -webkit-linear-gradient(180deg, transparent, #23468c);
       background-image: -moz-linear-gradient(180deg, transparent, #23468c);
       background-image: -o-linear-gradient(180deg, transparent, #23468c);
       background-image: linear-gradient(90deg, transparent, #23468c);
   }

   .divider span:nth-child(2) {
       color: #2252b1;
       padding: 0px 6px;
       width: auto;
       white-space: nowrap;
   }

   .divider span:last-child {
       background-image: -webkit-gradient(linear,
               0 0,
               0 100%,
               from(#23468c),
               to(transparent));
       background-image: -webkit-linear-gradient(180deg, #23468c, transparent);
       background-image: -moz-linear-gradient(180deg, #23468c, transparent);
       background-image: -o-linear-gradient(180deg, #23468c, transparent);
       background-image: linear-gradient(90deg, #23468c, transparent);
   }
</style>