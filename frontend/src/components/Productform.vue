<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  props: {
    product: { type: Object, required: true },
    resetAfterSubmit: { type: Boolean, default: false },
  }
  ,
  data() {
    const productform = yup.object().shape({
      name: yup
        .string()
        .required("Tên sách phải có giá trị.")
        .min(5, "Tên phải ít nhất 5 ký tự."),
      img: yup
        .string()
        .required("Hình ảnh phải có giá trị."),
      price: yup
        .string()
        .required("Giá sách phải có giá trị."),
      description: yup
        .string()
        .min(5, "Mô tả phải ít nhất 5 ký tự."),
      category: yup
        .string(),
      year: yup
        .string()
        .required("Năm xuất bản phải có giá trị."),
      author: yup
        .string()
        .required("Tác Giả phải có giá trị."),
    });
    return {
      productLocal: this.product,
      productform,
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: ['submit:product'],
  methods: {
    // addImge(){
    //   document.querySelector("#imgproduct2").style.display = "block";
    // },
    submitproduct() {
      this.$emit('submit:product', this.productLocal);
      if (this.resetAfterSubmit) {
        this.$refs.contactForm.resetForm();
      }
    },

  }
}
</script>
<template>
  <div class="wrapper">
    <Form :validation-schema="productform" @submit="submitproduct">
      <div class="form-group textc">
        <label for="namebook">Tên Sách</label>
        <Field type="text" class="form-control border border-primary" style="border-radius: 25px; height: 50px"
          id="namebook" name="name" placeholder="Nhập tên sách..." v-model="productLocal.title" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="form-group textc">
        <label for="imgbook">Hình Ảnh</label>
        <div style="display: flex; flex-direction: row;">
          <Field type="text" class="form-control border border-primary" style="border-radius: 25px; height: 50px"
            id="imgbook" name="img" placeholder="Nhập vào link hình ảnh..." v-model="productLocal.img[0]" />
        </div>
      </div>
      <div class="form-group textc">
        <label for="pricebook">Giá</label>
        <Field type="number" class="form-control border border-primary" style="border-radius: 25px; height: 50px"
          id="pricebook" name="price" placeholder="Nhập vào giá..." v-model="productLocal.price" />
        <ErrorMessage name="price" class="text-danger" />
      </div>

      <div class="form-group textc">
        <label for="desc">Mô Tả Sách</label>
        <Field name="desc" class="form-control" id="desc" v-slot="{ desc }"><textarea
            class="form-control  border border-primary" style="border-radius: 25px;" cols="120" rows="10" v-bind="desc"
            v-model="productLocal.desc"></textarea>
        </Field>
        <ErrorMessage name="desc" class="error-feedback" />
      </div>

      <div class="form-group textc">
        <label for="type">Thể Loại </label>
        <Field name="type" class="form-control " id="type" v-slot="{ type }">
          <select class="form-control border border-primary" style="border-radius: 25px; height: 50px"
            v-model="productLocal.categories" v-bind="type">
            <option v-for="option in ['Cuộc Sống', 'Kinh Tế', 'Tâm Lý Học', 'Tình Yêu']" :value="option"> {{ option }}
            </option>
          </select>
        </Field>
        <ErrorMessage name="type" class="error-feedback" />
      </div>

      <div class="form-group textc">
        <label for="yearbook">Năm Xuất Bản</label>
        <Field type="text" class="form-control border border-primary" style="border-radius: 25px; height: 50px"
          id="yearbook" name="year" placeholder="Nhập vào năm xuất bản sách..." v-model="productLocal.year" />
        <ErrorMessage name="year" class="text-danger" />
      </div>

      <div class="form-group textc">
        <label for="authorbook">Tác Giả</label>
        <Field type="text" class="form-control border border-primary" style="border-radius: 25px; height: 50px"
          id="authorbook" name="author" placeholder="Nhập vào tác giả sách..." v-model="productLocal.author" />
        <ErrorMessage name="author" class="text-danger" />
      </div>

      <button type="submit" class="btn btn-success mt-3">Cập Nhật</button>

      <router-link to="/productlist" style="margin: 10px;">
        <button class="btn btn-danger mt-3">Hủy</button>
      </router-link>
      <br>
    </Form>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 50px 200px;
}

.btn_img-add {
  font-size: 30px;
  color: dodgerblue;
}

.textc {
  font-size: 18px;
  margin-top: 20px;
}
</style>