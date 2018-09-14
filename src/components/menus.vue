<template>
  <div class="list-todos">
    <a @click="goList(item.id)" class="list-todo activeListClass list" :class="{'active': item.id === todoId}" v-for="item in items" :key="item.count">
      <span class="icon-lock" v-if="item.locked"></span>
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <a class=" link-list-new">
      <span class="icon-plus"></span>
      Add NewList
    </a>
  </div>
</template>

<script>
import { getTodoList, addTodo } from '../api/api';

export default {
  data() {
    return {
      items: [],
      todoId: ''
    };
  },
  created() {
    getTodoList({}).then(res => {
      const TODOS = res.data.todos;
      this.items = TODOS;
      this.todoId = TODOS[0].id;
    });
  },
  methods: {
    goList(id) {
      this.todoId = id;
    },
    addTodoList() {
      addTodo({}).then(data => {
        getTodoList({}).then(res => {
          const TODOS = res.data.todos;
          this.todoId = TODOS[TODOS.length - 1].id;
          this.items = TODOS;
        });
      });
    }
  },
  watch: {
    todoId(id) {
      this.$router.push({
        name: 'todo',
        params: { id }
      });
    }
  }
};
</script>

<style lang="less">
@import '../common/style/menu.less';
</style>
