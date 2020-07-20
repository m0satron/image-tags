<template>
  <div v-if="images" class="gallery">
    <Photo
      v-for="image in images"
      :key="image['tag']"
      :imgSrc="image['imgSrc']"
      :coordinates="image['coordinates']"
      :size="image['size']"
      :labelPosition="image['labelPosition']"
      :tag="image['tag']"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import Photo from "../Photo/Photo";
export default {
  name: "Gallery",
  components: {
    Photo,
  },
  props: {
    images: Array,
  },
};
</script>

<style lang="scss" src="./gallery.scss" />
