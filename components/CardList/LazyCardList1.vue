<template>
  <CardList1 :products-group="productsGroup"/>
</template>

<script>
const CardList1 = () =>
  import(/* webpackChunkName: "CardList1" */ '~/components/CardList/CardList1.vue')

export default {
  name: "LazyCardList1",
  components: {CardList1},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>
