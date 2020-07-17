<template>
  <div v-show="isActive"><slot /></div>
</template>

<script>
export default {
  name: "TabItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    this.isActive = this.selected;
  },
};
</script>
