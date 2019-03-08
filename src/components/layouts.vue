<template>
  <section class="container" :class="{'menu-open': menuOpen}">
    <section class="menu">
      <menus></menus>
    </section>
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import menus from './menus';
import todo from './todo';

export default {
  components: {
    menus,
    todo
  },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    }
  }
};
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
