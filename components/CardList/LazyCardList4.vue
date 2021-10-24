<template>
  <CardList4 :products-group="productsGroup"/>
</template>

<script>
const CardList4 = () =>
  import(/* webpackChunkName: "CardList4" */ '~/components/CardList/CardList4.vue')

export default {
  name: "LazyCardList14",
  components: {CardList4},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
