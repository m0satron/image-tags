<template>
  <div class="photo">
    <close class="photo__icon" @click="deleteImage" />
    <canvas v-if="coordinates" ref="photo-canvas" class="photo__canvas" />
    <div v-if="tag" class="photo__label--wrapper" :style="labelPosition">
      <label class="photo__label bg-color-green-light color-black">{{
        tag
      }}</label>
    </div>
    <img class="photo__image" :ref="`img-${tag}`" :src="imgSrc" />
  </div>
</template>

<script>
import { drawCanvas } from "../../mixins/drawCanvas";
import Close from "vue-material-design-icons/Close.vue";

export default {
  name: "Photo",
  components: {
    Close,
  },
  props: {
    coordinates: Array,
    size: Object,
    labelPosition: Object,
    tag: String,
    imgSrc: String,
  },
  mixins: [drawCanvas],
  methods: {
    deleteImage() {
      this.$emit("delete", this.tag);
    },
  },
  mounted() {
    const canvas = this.$refs["photo-canvas"];
    canvas.width = this.size["width"];
    canvas.height = this.size["height"];
    if (canvas) {
      this.context = canvas.getContext("2d");
      this.drawRectangle();
    }
  },
};
</script>
<style lang="scss" src="./photo.scss" />
