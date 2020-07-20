<template>
  <div class="editor">
    <Uploader v-on:newFile="imgPreview" />
    <div class="editor__wrapper">
      <canvas v-show="!isDisabled" class="editor__canvas" ref="canvas" />
      <img
        class="editor__image"
        :src="selectedFile"
        ref="image"
        @load="createCanvas"
      />
      <div v-if="tag" class="editor__label--wrapper" :style="labelPosition">
        <label class="editor__label bg-color-green-light color-black">
          {{ tag }}
        </label>
      </div>
      <div class="editor__bg bg-color-blue-light" />
    </div>
    <div class="editor__foot">
      <input
        class="editor__input with-border"
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
import { drawCanvas } from "../../mixins/drawCanvas";

export default {
  name: "Editor",
  components: {
    Uploader,
  },
  mixins: [drawCanvas],
  data() {
    return {
      labelPosition: {
        top: 0,
        left: 0,
      },
      selectedFile: null,
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
      const imageData = {
        imgSrc: this.selectedFile,
        size: {
          width: this.$refs["image"].width,
          height: this.$refs["image"].height,
        },
        labelPosition: this.labelPosition,
        coordinates: this.coordinates,
        tag: this.tag,
      };
      this.$emit("newImage", imageData);
    },
    resetCanvas(e) {
      if (e && e["type"] === "click") this.tag = "";
      this.context.clearRect(
        0,
        0,
        this.$refs["canvas"].width,
        this.$refs["canvas"].height
      );
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
      this.labelPosition["left"] = `${this.coordinates[1].x / 2}px`;
      this.labelPosition["top"] = `${this.coordinates[1].y + 10}px`;
      this.drawRectangle(this.resetCanvas);
    },
    mouseUp(e) {
      this.mousedown = false;
      this.coordinates[1] = {
        x: e.offsetX,
        y: e.offsetY,
      };
    },
    createCanvas() {
      this.tag = "";
      const canvas = this.$refs["canvas"];
      canvas.width = this.$refs["image"].width;
      canvas.height = this.$refs["image"].height;
      canvas.onmousedown = this.mouseDown;
      canvas.onmousemove = this.mouseMove;
      canvas.onmouseup = this.mouseUp;
      this.context = canvas.getContext("2d");
    },
  },
};
</script>

<style lang="scss" src="./editor.scss" />
