
<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import Header from "../components/Header.vue";
import EditUser from "../components/EditUser.vue";
import toastsVue from "../components/toasts.vue";
export default {
	data() {
		return {
			checkedit: false,
		}
	},
	components: {
		Header,
		EditUser,
		toastsVue
	},
	computed: {
		...mapState(useAuthStore, {
			currentUser: "user",
		}),
	},
	methods: {
		showedit() {
			if (!this.checkedit) {
				this.checkedit = true;
			}
			else {
				this.checkedit = false;
			}
		},

	}
};
</script>
<template>
	<Header></Header>
	<toastsVue></toastsVue>
	<div class="container w-50">
	<div v-if="currentUser" style="margin: 40px 100px;">
		<div style=" margin-top:0px;text-align:center" class="heading">
			<h3><router-link to="/" style="text-decoration:none; color: black">Trang Chủ</router-link>/<span style="color:#23468c;
               ">Thông Tin Tài Khoản</span></h3>
			<h6>Chỉnh sửa thông tin theo ý của bạn</h6>
		</div>
		<div class="row mt-5">
			<div class="col-md-12">
				<p class="text-break">
					<strong>Tên Tài Khoản:</strong>
					{{ currentUser.username }}
				</p>
				<p>
					<strong>E-mail:</strong>
					{{ currentUser.email }}
				</p>
			</div>
		</div>
		<router-link to="/">
			<button class="btn btn-danger"><i class="bi bi-arrow-left-circle-fill"></i></button>
		</router-link>
		<button class="btn btn-success text-light" style="margin-left: 20px;" @click="showedit">Chỉnh Sửa</button>
	</div>
	<div v-if="checkedit" style="display: flex;flex-direction: column;justify-content: center;margin-left:100px; margin-bottom:10px" >
		<EditUser :user="currentUser"></EditUser>
	</div>
	</div>
</template>

