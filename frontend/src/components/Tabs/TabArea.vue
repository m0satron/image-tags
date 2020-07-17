<template>
  <div class="wrapper">
    <div class="tabs">
      <ul class="tabs__area">
        <li v-for="tab in tabs" :key="tab.name">
          <div
            class="tabs-item"
            :class="{
              'is-active': tab.isActive,
            }"
            @click="selectTab(tab)"
          >
            {{ tab.name }}
          </div>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabArea",
  data() {
    return {
      tabs: [],
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        if (tab.name == selectedTab.name) tab.isActive = true;
        else tab.isActive = false;
      });
    },
  },
  created() {
    this.tabs = this.$children;
  },
};
</script>

<style lang="scss" src="./tabs.scss" />
