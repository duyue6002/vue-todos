<template>
  <div class="page lists-show">
    <!-- 上半部分 -->
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
      <!-- right icon -->
      <div class="nav-group right">
        <div class="options-web">
          <a class="nav-item">
            <span class="icon-unlock"></span>
          </a>
          <a class="nav-item">
            <span class="icon-trash"></span>
          </a>
        </div>
      </div>
      <!-- Input -->
      <div class=" form todo-new input-symbol">
        <input placeholder="Please Enter" type="text" v-model="text" @keyup="onAdd" :disabled="todo.locked">
        <span class="icon-add"></span>
      </div>
    </nav>
    <!-- 下半部分 -->
    <div class="content-scrollable list-items">
      <div v-for="item in items">
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './item';
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
          checked: true,
          text: "Call Me By Your Name",
          isDelete: false
        },
        {
          checked: false,
          text: "Lady Bird",
          isDelete: false
        },
        {
          checked: true,
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
  },
  components: {
    item
  }
};
</script>

<style lang="less">
@import "../common/style/todo.less";
@import "../common/style/form.less";
@import "../common/style/nav.less";
</style>
