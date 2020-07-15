<template>
  <div>
    <input
type="file"
@change="onFileSelected" />
  </div>
</template>

<script>
export default {
  name: "Uploader",
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
        this.$emit('newFile', e.target.result)
      }
    }
  }
};
</script>
