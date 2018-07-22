<template>
  <section class="container" >
    <section class="menu">
      <menus></menus>
    </section>
    <section class="content-container" >
      <todo></todo>
    </section>
  </section>
</template>

<script>
import menus from './menus';

export default {
  components: {
    menus,
  },
};
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
