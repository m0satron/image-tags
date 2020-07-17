<template>
  <div id="app">
    <TabArea>
      <TabItem name="Upload" :selected="true">
        <Editor v-on:newImage="updateGallery" />
      </TabItem>
      <TabItem name="Gallery">
        <Gallery :images="imageList" />
      </TabItem>
    </TabArea>
  </div>
</template>

<script>
import Editor from "./components/Editor/Editor";
import Gallery from "./components/Gallery/Gallery";
import TabArea from "./components/Tabs/TabArea";
import TabItem from "./components/Tabs/TabItem";

export default {
  name: "App",
  components: {
    Editor,
    Gallery,
    TabArea,
    TabItem,
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
