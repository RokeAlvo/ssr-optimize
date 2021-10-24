<template>
  <CardList10/>
</template>

<script>
const CardList10 = () =>
  import(/* webpackChunkName: "CardList10" */ '~/components/CardList/CardList10.vue')

export default {
  name: "LazyCardList10",
  components: {CardList10},
}
</script>
