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
      <img
        class="editor__image"
        :src="selectedFile"
        ref="image"
        @load="createCanvas"
      />
      <div v-if="tag" class="editor__label--wrapper" :style="labelPositon">
        <label class="editor__label bg-color-green-light color-black">
          {{ tag }}
        </label>
      </div>
      <div class="editor__bg bg-color-blue-light" />
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
        class="button bg-color-green-dark color-white with-border"
        :class="isDisabled ? 'inactive' : ''"
        @click="saveImage"
        :disabled="isDisabled"
      >
        save
      </button>
      <button
        class="button bg-color-orange color-white with-border"
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
      labelPositon: {
        top: 0,
        left: 0,
      },
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
    resetCanvas(e) {
      if (e && e["type"] === "click") this.tag = "";
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
      this.canvasContext.strokeStyle = "#5dd483";
      this.canvasContext.lineWidth = 2;
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
      this.labelPositon["left"] = `${this.coordinates[1].x / 2}px`;
      this.labelPositon["top"] = `${this.coordinates[1].y + 10}px`;
      this.drawRectangle();
    },
    mouseUp(e) {
      this.mousedown = false;
      this.coordinates[1] = {
        x: e.offsetX,
        y: e.offsetY,
      };
    },
    createCanvas() {
      const canvas = this.$refs["canvas"];
      canvas.width = this.$refs["image"].width;
      canvas.height = this.$refs["image"].height;
      canvas.onmousedown = this.mouseDown;
      canvas.onmousemove = this.mouseMove;
      canvas.onmouseup = this.mouseUp;
      this.canvasContext = canvas.getContext("2d");
    },
  },
};
</script>

<style lang="scss" src="./editor.scss" />
