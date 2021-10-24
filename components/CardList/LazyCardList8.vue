<template>
  <CardList8 :products-group="productsGroup"/>
</template>

<script>
const CardList8 = () =>
  import(/* webpackChunkName: "CardList8" */ '~/components/CardList/CardList8.vue')

export default {
  name: "LazyCardList8",
  components: {CardList8},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
