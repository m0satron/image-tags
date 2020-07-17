<template>
  <div class="photo">
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
const rectStyle = {
  color: "#5dd483",
  width: 2,
};

export default {
  name: "Photo",
  props: {
    coordinates: Array,
    size: Object,
    labelPosition: Object,
    tag: String,
    imgSrc: String,
  },
  data() {
    return {
      context: "",
    };
  },
  methods: {
    drawRectangle() {
      this.context.beginPath();
      this.context.rect(
        this.coordinates[0].x,
        this.coordinates[0].y,
        this.coordinates[1].x - this.coordinates[0].x,
        this.coordinates[1].y - this.coordinates[0].y
      );
      this.context.strokeStyle = rectStyle["color"];
      this.context.lineWidth = rectStyle["width"];
      this.context.stroke();
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
