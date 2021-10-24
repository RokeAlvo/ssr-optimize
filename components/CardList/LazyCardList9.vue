<template>
  <CardList9/>
</template>

<script>
const CardList9 = () =>
  import(/* webpackChunkName: "CardList9" */ '~/components/CardList/CardList9.vue')

export default {
  name: "LazyCardList9",
  components: {CardList9},
}
</script>
