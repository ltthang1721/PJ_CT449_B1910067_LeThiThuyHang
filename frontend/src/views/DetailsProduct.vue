<script>
import Header from '@/components/Header.vue'
import ProductService from '../services/Product.service'
import CartService from '../services/Cart.service'
import toastsVue from '../components/toasts.vue'
import toastsjs from '../assets/js/toasts.js'
import { mapState } from 'pinia'
import { useAuthStore } from "@/stores/Auth.store";
export default {
    data() {
        return {
            detailproduct: [],
            cartitem: {
                userId: '',
                productId: this.$route.params.id,
                quantity: 1,
                title: "",
                img: "",
                price: "",
                year: "",
                author: "",
            },
            carts: [],
            toasts: {
                title: "Success",
                msg: "Thêm vào giỏ hàng thành công",
                type: "success",
                duration: 2000
            },
            sub_quantity: 1,
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    components: {
        Header,
        toastsVue
    },
    methods: {
        toastsjs,
        async getproduct() {
            try {
                this.detailproduct = await ProductService.get(this.$route.params.id);
                this.cartitem.title = this.detailproduct.title;
                this.cartitem.img = this.detailproduct.img[0];
                this.cartitem.price = this.detailproduct.price;
                this.cartitem.year = this.detailproduct.year;
                this.cartitem.author = this.detailproduct.author;
            } catch (error) {
                console.log(error);
            }
        },
        async getidcart() {
            this.cartitem.quantity = this.sub_quantity;
            var exitcart = false;

            try {
                this.carts = await CartService.get(this.currentUser._id);
                this.cartitem.userId = this.currentUser._id;
                this.carts.map((cartproduct) => {
                    if (cartproduct.productId == this.cartitem.productId) {
                        this.cartitem.quantity += cartproduct.quantity;
                        CartService.update(cartproduct._id, this.cartitem);
                        exitcart = true;
                        this.toastsjs();
                        setTimeout(() => {
                            this.$router.push({ name: 'CartShop' });
                        }, 1000);
                    }
                })
                if (exitcart === false) {
                    this.cartitem.userId = this.currentUser._id;
                    CartService.create(this.cartitem);
                    this.toastsjs();
                    setTimeout(() => {
                        this.$router.push({ name: 'CartShop' });
                    }, 1000);
                }
            } catch (error) {
                this.toasts.title = "Message",
                    this.toasts.msg = "Bạn chưa đăng nhập!",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000,
                    this.toastsjs();
                console.log(error);
            }
        },
    },
    created() {
        this.getproduct();
    },

}
</script>
<template>
    <Header></Header>
    <toastsVue></toastsVue>
    <div class="heading">
        <div style=" margin: -20px 0;" class="heading">
            <h4><router-link to="/" style="text-decoration:none; color: black">Trang Chủ</router-link>/
                <span style="color:#23468c;">Chi Tiết Sản Phẩm</span>
            </h4>
            <h6>Thêm sách vào giỏ hàng đi sách hay lắm, mua sách đi sách đọc vui lắm</h6>
        </div>
    </div>
    <div class="wrapper w-75">
        <div class="details d-flex justify-content-between flex-wrap">
            <div class="img_product col-5 " style="margin-left: 30px;">
                <div v-for="(img, index) in detailproduct.img" :class="{ active: index == 0 }">
                    <img :src="img" class="d-block  " alt="..." style="border-radius: 8px ; width:450px">
                </div>
            </div>
            <div class="info_product col-6 ">
                <h4 style="font-weight: 400; text-transform:uppercase ">{{ detailproduct.title }}</h4>
                <h6 style="text-align:justify">{{ detailproduct.desc.substring(0, 175) + "..." }}</h6>
                <h4 class="pricte text-danger lh-lg mt-3"><i class="bi bi-credit-card"></i> {{ detailproduct.price }}.000VND</h4>
                <div class="year_product">
                    <h5> Thể Loại: <span class="text-secondary lh-base">{{ detailproduct.categories }}</span></h5>
                </div>
                <div class="year_product">
                    <h5>Năm Xuất Bản: <span class="text-secondary lh-base">{{ detailproduct.year }}</span></h5>
                </div>
                <div class="author_product">
                    <h5>Tác Giả: <span class="text-secondary lh-base">{{ detailproduct.author }}</span></h5>
                </div>
                <div class="quatitly-product">
                    <div class="row-1">
                        <div class="col-md-12 col-lg-6 col-xl-6 d-flex">
                            <h5>Số Lượng: </h5>
                            <input id="quantity" name="quantity" type="number" v-model="sub_quantity"
                                class="form-control form-control-sm quantitty text-secondary lh-base" />
                        </div>
                    </div>
                </div>
                <div class="btn_product mt-5">
                    <button type="submit" class="btn btn-danger" style="width:150px;" @click="getidcart()">Đặt hàng</button>
                    <router-link to="/allproduct">
                        <button type="button" class="btn btn-outline-success" style="width:200px; margin-left:20px">Xem Sản
                            Phẩm
                            Khác</button>
                    </router-link>
                </div>
            </div>
            <div class="describe_product ">
                <h4>Mô tả sản phẩm</h4>
                <p>{{ detailproduct.desc }}
                </p>
            </div>
        </div>
        
    </div>
</template>
<style scoped>
.btn_product {
    display: flex;

}

.year_product,
.author_product {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}

.list_btn_year,
.list_btn_author {
    margin: 0 10px;
    display: flex;
    flex-wrap: wrap;
}

.list_btn_year button,
.list_btn_author button {
    margin: 10px 5px;
}

.btn {
    width: 100px;
}

.wrapper {
    margin: 50px 100px;
}

.heading {
    margin: 0 100px;
}



.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100px;
}

.describe_product {
    margin-top: 5%;
    text-align: justify;
    margin-left: 100px;
}

.quantitty {
    width: 60px;
    border-radius: 25px;
    border: none;
    font-size: 18px;
    margin-left: 10px;
    text-align: center;
    margin-top: -8px;
}

.clr {
    color: #23468c
}
</style>