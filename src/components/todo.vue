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
        <span class="count-list">{{todo.count || 0}}</span>
      </h1>
      <!-- right icon -->
      <div class="nav-group right">
        <div class="options-web">
          <a class=" nav-item">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <a class=" nav-item">
            <span class="icon-trash"></span>
          </a>
        </div>
      </div>
      <!-- Input -->
      <div class=" form todo-new input-symbol">
        <input placeholder="Please Enter" type="text" v-model="text" :disabled="todo.locked">
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
import { getTodo } from '../api/api';

export default {
  data() {
    return {
      todo: {},
      items: [],
      text: ''
    };
  },
  components: {
    item
  },
  watch: {
    '$route.params.id'() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const ID = this.$route.params.id;
      getTodo({id: ID}).then(res => {
        let {id, title, count, isDelete, locked, record } = res.data.todo;
        this.items = record;
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        };
      });
    }
  }
};
</script>

<style lang="less">
@import "../common/style/todo.less";
@import "../common/style/form.less";
@import "../common/style/nav.less";
</style>
