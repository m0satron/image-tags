<template>
  <div>
    <input type="file" @change="onFileSelected" />
    <Photo :imgSrc="selectedFile" />
  </div>
</template>

<script>
import Photo from "../Photo/Photo";

export default {
  name: "Uploader",
  components: {
    Photo
  },
  data() {
    return {
      selectedFile: null
    };
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.selectedFile = e.target.result;
      }
    }
  }
};
</script>
