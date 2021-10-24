<template>
  <CardList4/>
</template>

<script>
const CardList4 = () =>
  import(/* webpackChunkName: "CardList4" */ '~/components/CardList/CardList4.vue')

export default {
  name: "LazyCardList4",
  components: {CardList4},
}
</script>
