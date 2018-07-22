<template>
  <div class="list-todos">
    <a class="list-todo activeListClass list" v-for="item in items">
      <span class="icon-lock" v-if="item.locked"></span>
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <a class=" link-list-new">
      <span class="icon-plus"></span>
      Add New
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Timothée',
          count: 1,
          locked: true,
        },
        {
          title: 'Saoirse',
          count: 2,
          locked: true,
        },
        {
          title: 'Robbie',
          count: 3,
          locked: false,
        },
      ],
    };
  },
};
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>
