<template>
  <div class="photo">
    <img class="photo__image" :src="imgSrc" />
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: {
    coordinates: Object,
    tag: String,
    imgSrc: String
  }
};
</script>

<style lang="scss" src="./photo.scss">
