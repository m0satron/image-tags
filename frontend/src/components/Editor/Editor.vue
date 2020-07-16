<template>
  <div class="editor">
    <Uploader v-on:newFile="imgPreview" />
    <div class="editor__wrapper">
      <canvas
        v-show="!isDisabled"
        class="editor__canvas"
        ref="canvas"
        style="border: 1px solid black;"
      />
      <img class="editor__image" :src="selectedFile" ref="image" />
      <div class="editor__bg bg-color-blue-light" />

      <label class="editor__label">{{ tag }}</label>
    </div>
    <div class="editor__foot">
      <input
        class="editor__input"
        :class="isDisabled ? 'inactive' : ''"
        type="text"
        v-model="tag"
        :disabled="isDisabled"
        placeholder="add tag..."
      />
      <button
        class="button bg-color-green-dark color-white"
        :class="isDisabled ? 'inactive' : ''"
        @click="saveImage"
        :disabled="isDisabled"
      >
        save
      </button>
      <button
        class="button bg-color-orange color-white"
        :class="isDisabled ? 'inactive' : ''"
        @click="resetCanvas"
        :disabled="isDisabled"
      >
        reset
      </button>
    </div>
  </div>
</template>

<script>
import Uploader from "../Uploader/Uploader";
export default {
  name: "Editor",
  components: {
    Uploader,
  },
  data() {
    return {
      selectedFile: null,
      canvasContext: null,
      canvasSize: {
        width: null,
        height: null,
      },
      coordinates: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      mousedown: false,
      mousemove: false,
      mouseup: false,
      tag: "",
    };
  },
  computed: {
    isDisabled() {
      if (this.selectedFile === null) return true;
      return false;
    },
  },
  methods: {
    imgPreview(value) {
      this.selectedFile = value;
    },
    saveImage() {
      const images = JSON.parse(localStorage.getItem("images"));
      const imageData = {
        imgSrc: this.selectedFile,
        coordinates: this.coordinates,
        tag: this.tag,
      };
      if (!images) {
        localStorage.setItem("images", JSON.stringify([{ ...imageData }]));
        this.$emit("newImage");
        return;
      }

      images.unshift(imageData);
      localStorage.setItem("images", JSON.stringify(images));
      this.$emit("newImage");
    },
    resetCanvas() {
      this.canvasContext.clearRect(
        0,
        0,
        this.$refs["canvas"].width,
        this.$refs["canvas"].height
      );
    },
    drawRectangle() {
      this.resetCanvas();
      this.canvasContext.beginPath();
      this.canvasContext.rect(
        this.coordinates[0].x,
        this.coordinates[0].y,
        this.coordinates[1].x - this.coordinates[0].x,
        this.coordinates[1].y - this.coordinates[0].y
      );
      this.canvasContext.strokeStyle = "#df4b26";
      this.canvasContext.lineWidth = 1;
      this.canvasContext.stroke();
    },
    mouseDown(e) {
      this.coordinates[0] = {
        x: e.offsetX,
        y: e.offsetY,
      };
      this.mousedown = true;
    },
    mouseMove(e) {
      if (!this.mousedown) return;
      this.coordinates[1] = {
        x: e.offsetX,
        y: e.offsetY,
      };
      this.drawRectangle();
    },
    mouseUp(e) {
      this.mousedown = false;
      this.coordinates[1] = {
        x: e.offsetX,
        y: e.offsetY,
      };
    },
    mouseLeave() {
      this.mousedown = false;
    },
  },
  mounted() {
    const canvas = this.$refs["canvas"];
    canvas.width = 250;
    canvas.height = 250;
    const context = canvas.getContext("2d");
    canvas.onmousedown = this.mouseDown;
    canvas.onmousemove = this.mouseMove;
    canvas.onmouseup = this.mouseUp;
    canvas.onmouseleave = this.mouseLeave;
    this.canvasContext = context;
  },
};
</script>

<style lang="scss" src="./editor.scss" />
