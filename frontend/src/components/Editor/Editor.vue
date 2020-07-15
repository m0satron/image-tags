<template>
  <div>
    <Uploader v-on:newFile="imgPreview" />
    <div>
      <canvas
class="editor__canvas"
ref="canvas"
style="border: 2px solid black;" />
      <Photo
class="editor__image"
:imgSrc="selectedFile" />
    </div>
    <EditorButton
buttonText="hi"
:fn="buttonFn" />
  </div>
</template>

<script>
import Uploader from "../Uploader/Uploader";
import Photo from "../Photo/Photo";
import EditorButton from "../EditorButton/EditorButton";
export default {
  name: "Editor",
  components: {
    Uploader,
    Photo,
    EditorButton
  },
  data() {
    return {
      selectedFile: null,
      canvasContext: null,
      coordinates: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      mousedown: false,
      mousemove: false,
      mouseup: false
    };
  },
  methods: {
    imgPreview(value) {
      this.selectedFile = value;
    },
    buttonFn() {
      console.log("clicked!");
    },
    drawRectangle() {
      this.canvasContext.clearRect(
        0,
        0,
        this.$refs["canvas"].width,
        this.$refs["canvas"].height
      );
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
        y: e.offsetY
      };
      this.mousedown = true;
    },
    mouseMove(e) {
      if (!this.mousedown) return;
      this.coordinates[1] = {
        x: e.offsetX,
        y: e.offsetY
      };
      this.drawRectangle();
    },
    mouseUp(e) {
      this.mousedown = false;
      this.coordinates[1] = {
        x: e.offsetX,
        y: e.offsetY
      };
    },
    mouseLeave() {
      this.mousedown = false;
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    const context = canvas.getContext("2d");
    canvas.onmousedown = this.mouseDown;
    canvas.onmousemove = this.mouseMove;
    canvas.onmouseup = this.mouseUp;
    canvas.onmouseleave = this.mouseLeave;
    this.canvasContext = context;
  }
};
</script>
