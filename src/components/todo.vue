<template>
  <div class="page lists-show">
    <nav>
      <!-- icon -->
      <div class="nav-group">
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <!-- title -->
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count-list">{{todo.count}}</span>
      </h1>
      <!--  -->
</template>

<script>
export default {
  data() {
    return {
      todo: {
        title: "Timothée",
        count: 21,
        locked: false
      },
      items: [
        {
          checked: false,
          text: "Call Me By Your Name",
          isDelete: false
        },
        {
          checked: false,
          text: "Lady Bird",
          isDelete: false
        },
        {
          checked: false,
          text: "The King",
          isDelete: false
        }
      ],
      text: ""
    };
  },
  methods: {
    onAdd() {
      this.items.push({
        checked: false,
        text: this.text,
        isDelete: false
      });
      this.text = "";
    }
  }
};
</script>

<style lang="less">
@import "../common/style/todo.less";
@import "../common/style/form.less";
@import "../common/style/nav.less";
</style>
