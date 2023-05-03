<script>
import Header from "../components/Header.vue";;
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import ListProduct from "../components/ListProduct.vue";
import toast from "../assets/js/toasts";
export default {
    data() {
        return {
            products: [],
            activeIndex: -1,
            activeUser: -1,
            toasts: {
                title: "Warning",
                msg: "Bạn không có quyền Admin",
                type: "warn",
                duration: 3000
            },
        }
    },
    computed: {
        getindex() {
            if (this.activeIndex != -1) {
                const list = document.querySelectorAll(".product-item");
                list.forEach(element => {
                    element.classList.remove("active");
                });
                list[this.activeIndex].classList.add("active");
                return this.products[this.activeIndex];
            }
           
        },

    },
    components: {
        Header,
        ListProduct,
        toastsVue,
    },
    methods: {
        toast,
        async getall() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
                this.toast();
                setTimeout(() => {
                    this.$router.push({ name: "ShopMain" });
                }, 1000);
            }
        },
    },
    created() {
        this.getall();
    },
}
</script>

<template>
    <Header></Header>
    <toastsVue></toastsVue>
    <div class="header text-center mb-3">
        <h2> <router-link to="/admin" style="text-decoration:none; color: black">QUẢN TRỊ VIÊN</router-link>/<span
                style="color: #23468c;">Danh Sách Sản Phẩm</span></h2>
    </div>
    <router-link to="/admin">
        <button class="btn btn-outline-danger" style="margin-left:8%"><i class="bi bi-arrow-left"></i> Trở về</button>
    </router-link>
    
    <router-link to="/addproduct">
        <button class="btn btn-danger" style="margin-left: 20px">Thêm Sản phẩm <i class="bi bi-plus-lg"></i></button>
    </router-link>
    <div class="main_admin d-flex" style="margin-top:30px; margin-left: 100px; width:1150px;margin-bottom:20px">
        <div class="list_users">
            <div class=" list_item_user d-flex w-100" id="product">
                <ListProduct :products="products" :refeshlist="getall" :getindex="getindex"
                    v-model:activeIndex="activeIndex"></ListProduct>

                <div class="card_product " style="padding: 10px; " v-if="getindex">
                    <router-link :to="{
                            name: 'editproduct',
                            params: { id: getindex._id },
                        }">
                        <button class="btn btn-outline-primary"
                            style="position:absolute;margin-top:-80px;margin-left:-135px">
                            Chỉnh Sửa <i class="bi bi-pencil-fill"></i> </button>
                    </router-link>
                </div>
            </div>
           
        </div>
    </div>
</template>
<style scoped>
.list_item_product,
.list_item_user {
    max-height: 500px;
    overflow-y: scroll;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

#product::-webkit-scrollbar,
#user::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;

}
</style>