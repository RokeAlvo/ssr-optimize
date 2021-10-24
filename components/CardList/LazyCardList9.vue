<template>
  <CardList9 :products-group="productsGroup"/>
</template>

<script>
const CardList9 = () =>
  import(/* webpackChunkName: "CardList9" */ '~/components/CardList/CardList9.vue')

export default {
  name: "LazyCardList9",
  components: {CardList9},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
