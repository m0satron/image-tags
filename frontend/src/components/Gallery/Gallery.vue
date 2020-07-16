<template>
  <div>
    <div v-if="images">
      <Photo
        v-for="image in images"
        :key="image['tag']"
        :imgSrc="image['imgSrc']"
        :coordinates="image['coordinates']"
        :tag="image['tag']"
      />
    </div>
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
