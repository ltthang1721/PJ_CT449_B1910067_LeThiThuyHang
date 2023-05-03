<script>
import ProductService from "../services/Product.service";
import toastjs from "../assets/js/toasts";
export default {
    data() {
        return {
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
        }
    },
    props: {
        products: Array,
        refeshlist: Function,
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        toastjs,
        async delproduct(id) {
            try {
                await ProductService.delete(id);
                this.refeshlist();
                this.toasts.title = "Success",
                    this.toasts.msg = "Đã xóa sản phẩm thành công",
                    this.toasts.type = "success",
                    this.toasts.duration = 3000
                this.toastjs();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning",
                    this.toasts.msg = "Bạn không có quyền Admin",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000
                this.toastjs();
            }
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    }
}
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item product-item d-flex justify-content-between" style="background-color: #23468c; color:white;">
            <span style="margin-left:5%">Hình Ảnh</span>
            <span style="margin-left:%">Tên Sách</span>
            <span style="margin-left:-5%">Tác Giả</span>
            <span style="margin-left:-3%">Năm Xuất Bản</span>
            <span style="margin-left:-4%">Danh Mục</span>
            <span style="margin-left:-4%">Giá</span>
            <span>Mô Tả</span>
            <div >QL</div>
        </li>
        <li class="list-group-item product-item d-flex justify-content-between" v-for="(product, index) in products"
            :key="product._id" @click="updateActiveIndex(index)">
            <span><img :src=" product.img[0]" alt="img" width="200"></span>
            <span style="width: 150px; margin-left:10px; font-weight: bold">{{ product.title }}</span>
            <span style="width: 180px">{{ product.author }}</span>
            <span style="width: 140px">{{ product.year }}</span>
            <span style="width: 130px">{{ product.categories }}</span>
            <span style="width: 80px">{{ product.price }}</span>
            <span style="width: 200px; text-align:justify">{{ product.desc.substring(0, 150) + "..." }}</span>
            <div style="margin-left: 30px;" class="" @click="delproduct(product._id)"><i class="bi bi-trash"></i></div>
        </li>
    </ul>
</template>
<style scoped>
.list-group-item:hover {
    background-color: #97b9ff;
    color: azure;
}
</style>