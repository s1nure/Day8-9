<template>
  <div class="modal"  v-show="open">
    <div class="modal-container wrapper">
      <h3>Ми хотіли б отримати доступ до геолокації для кращого досвіду використання нашого сайту</h3>
      <button class="button-get-location" @click="getLocation">Дозволити доступ до геолокації</button>
      <button class="button-get-location" @click="close"> Ні, дякую</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    getLocation: {
    },
    close: {
    }
  }
}
</script>

<style>
</style>
