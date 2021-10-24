<template>
  <CardList8/>
</template>

<script>
const CardList8 = () =>
  import(/* webpackChunkName: "CardList8" */ '~/components/CardList/CardList8.vue')

export default {
  name: "LazyCardList8",
  components: {CardList8},
}
</script>
