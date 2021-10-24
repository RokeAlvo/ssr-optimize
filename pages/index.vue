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
import CardList1 from "~/components/CardList/CardList1";
import CardList2 from "~/components/CardList/CardList2";
import CardList3 from "~/components/CardList/CardList3";
import CardList4 from "~/components/CardList/CardList4";
import CardList5 from "~/components/CardList/CardList5";
import CardList6 from "~/components/CardList/CardList6";
import CardList7 from "~/components/CardList/CardList7";
import CardList8 from "~/components/CardList/CardList8";
import CardList9 from "~/components/CardList/CardList9";
import CardList10 from "~/components/CardList/CardList10";

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
