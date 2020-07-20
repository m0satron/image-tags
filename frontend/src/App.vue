<template>
  <div id="app">
    <TabArea>
      <TabItem name="Upload" :selected="true">
        <Editor v-on:newImage="saveImage" />
      </TabItem>
      <TabItem name="Gallery">
        <Gallery :images="imageList" v-on:delete="deleteImage" />
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
    saveImage(e) {
      if (this.imageList === null) {
        localStorage.setItem("images", JSON.stringify([{ ...e }]));
        this.$emit("newImage");
        return;
      }
      
      this.imageList.unshift(e);
      localStorage.setItem("images", JSON.stringify(this.imageList));
      this.updateGallery();


    },
    deleteImage(e) {
      const newImageList = this.imageList.filter(image => image.tag !== e);
      localStorage.setItem("images", JSON.stringify(newImageList));
      this.updateGallery();
    },
  },
  beforeMount() {
    this.updateGallery();
  },
};
</script>

<style lang="scss" src="./style/style.scss" />
