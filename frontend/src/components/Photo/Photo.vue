<template>
  <div class="photo">
    <canvas
      v-if="coordinates"
      ref="photo-canvas"
      class="photo__canvas"
      style="border: 2px solid red;"
    />
    <label v-if="tag"> {{ tag }} </label>
    <img class="photo__image" :src="imgSrc" />
  </div>
</template>

<script>
const rectStyle = {
  color: "#df4b26",
  width: 1,
};

export default {
  name: "Photo",
  props: {
    coordinates: Array,
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
    if (canvas) {
      this.context = canvas.getContext("2d");
      this.drawRectangle();
    }
  },
};
</script>
<style lang="scss" src="./photo.scss" />
