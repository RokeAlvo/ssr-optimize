<template>
  <CardList1/>
</template>

<script>
const CardList1 = () =>
  import(/* webpackChunkName: "CardList1" */ '~/components/CardList/CardList1.vue')

export default {
  name: "LazyCardList1",
  components: {CardList1},
}
</script>
