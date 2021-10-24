<template>
  <CardList6 :products-group="productsGroup"/>
</template>

<script>
const CardList6 = () =>
  import(/* webpackChunkName: "CardList6" */ '~/components/CardList/CardList6.vue')

export default {
  name: "LazyCardList6",
  components: {CardList6},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
