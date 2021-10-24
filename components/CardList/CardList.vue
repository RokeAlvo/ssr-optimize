<template>
  <!-- component -->
  <div class="w-full bg-gray-800">
    <p>baseUrl: {{baseUrl}}</p>
    <p v-if="errors">{{errors}}</p>
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div class="text-center pb-12">
        <h2 class="text-base font-bold text-indigo-600">
          {{ description }}
        </h2>
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
          {{ title }}
        </h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CatCard
          v-for="product in products"
          :key="product.productId"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CatCard from "~/components/CatCard/CatCard";
export default {
  name: "CardList",
  components: {CatCard},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      products: [],
      errors: '',
      baseUrl: ''
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.$get(`/api-mocks/products${this.productsGroup}.json`)
      this.baseUrl = this.$axios.defaults.baseURL
      this.products = response.body.products
    } catch (e) {
      this.errors = JSON.stringify(e)
    }
  }
}
</script>

<style scoped>

</style>
