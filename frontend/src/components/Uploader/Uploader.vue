<template>
  <div class="uploader">
    <input
      type="file"
      id="file"
      @change="onFileSelected"
      class="uploader__input bg-color-purple"
    />
    <label for="file" class="bg-color-purple color-white with-border"
      >Choose a file</label
    >
    <span class="uploader__filepath with-border">{{ filePath }}</span>
  </div>
</template>

<script>
export default {
  name: "Uploader",
  data() {
    return {
      selectedFile: null,
    };
  },
  computed: {
    filePath() {
      if (this.selectedFile === null) return "no file selected";
      return this.selectedFile;
    },
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      this.selectedFile = event.target.value.split("\\").pop();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => this.$emit("newFile", e.target.result);
    },
  },
};
</script>

<style lang="scss" src="./uploader.scss" />
