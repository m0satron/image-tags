<template>
  <div>
    <button @click="fn">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: "EditorButton",
  props: {
    buttonText: {
      type: String,
      required: true
    },
    fn: {
      type: Function,
      required: true
    }
  }
};
</script>
