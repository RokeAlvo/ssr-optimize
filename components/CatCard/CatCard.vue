<template>
  <div class="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center">
    <div class="mb-8">
      <img
        class="object-center object-cover rounded-full h-36 w-36"
        :src="product.image"
        alt="photo"
      >
    </div>
    <div class="text-center">
      <p class="text-xl text-white font-bold mb-2">{{ product.name }}</p>
      <p class="text-base text-gray-400 font-normal">{{ product.category.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
