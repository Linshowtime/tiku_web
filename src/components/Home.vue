<template>
  <div>
    <headcommon v-bind:initIndex="1"v-bind:manageIndex="1"></headcommon>
    <productpaper></productpaper>
  </div>
</template>

<script>
import Head from '@/components/head'
import ProductPaper from '@/components/paper/productPaper'
export default {
  components: {
    headcommon: Head,
    productpaper: ProductPaper
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>

</style>
