<template>
  <div id="app">
    <Editor v-on:newImage="updateGallery" />
    <Gallery :images="imageList" />
  </div>
</template>

<script>
import Editor from "./components/Editor/Editor";
import Gallery from "./components/Gallery/Gallery";

export default {
  name: "App",
  components: {
    Editor,
    Gallery,
  },
  data() {
    return {
      imageList: null,
    };
  },
  methods: {
    updateGallery() {
      this.imageList = JSON.parse(localStorage.getItem("images"));
    },
  },
  beforeMount() {
    this.updateGallery();
  },
};
</script>

<style lang="scss" src="./style/style.scss" />
