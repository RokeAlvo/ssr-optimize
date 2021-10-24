<template>
  <div>
    <img src="/Pdb/10025791b.jpg.webp" alt="main-image" class="w-full main-image">
    <CardList1 :products-group="1"/>
    <CardList2 :products-group="2"/>
    <CardList3 :products-group="1"/>
    <CardList4 :products-group="2"/>
    <CardList5 :products-group="1"/>
    <CardList6 :products-group="2"/>
    <CardList7 :products-group="1"/>
    <CardList8 :products-group="2"/>
    <CardList9 :products-group="1"/>
    <CardList10 :products-group="2"/>
  </div>
</template>

<script>
const CardList1 = () => import(/* webpackChunkName: "CardList1" */ '~/components/CardList/CardList1.vue')
const CardList2 = () => import(/* webpackChunkName: "CardList2" */ '~/components/CardList/CardList2.vue')
const CardList3 = () => import(/* webpackChunkName: "CardList3" */ '~/components/CardList/CardList3.vue')
const CardList4 = () => import(/* webpackChunkName: "CardList4" */ '~/components/CardList/CardList4.vue')
const CardList5 = () => import(/* webpackChunkName: "CardList5" */ '~/components/CardList/CardList5.vue')
const CardList6 = () => import(/* webpackChunkName: "CardList6" */ '~/components/CardList/CardList6.vue')
const CardList7 = () => import(/* webpackChunkName: "CardList7" */ '~/components/CardList/CardList7.vue')
const CardList8 = () => import(/* webpackChunkName: "CardList8" */ '~/components/CardList/CardList8.vue')
const CardList9 = () => import(/* webpackChunkName: "CardList9" */ '~/components/CardList/CardList8.vue')
const CardList10 = () => import(/* webpackChunkName: "CardList10" */ '~/components/CardList/CardList10.vue')

export default {
  name: 'HomePage',
  components: {
    CardList1, CardList2, CardList3, CardList4, CardList5, CardList6, CardList7, CardList8, CardList9, CardList10
  },
}
</script>
<style>
  .main-image {
    width: 375px;
    height: 375px;
  }
</style>
