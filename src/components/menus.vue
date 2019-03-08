<template>
  <div class="list-todos">
    <!-- items是本vue文件的一个数据结构 -->
    <a @click="goList(item.id)" class="list-todo activeListClass list" :class="{'active': item.id === todoId}" v-for="(item, index) in todoList" :key="index">
      <span class="icon-lock" v-if="item.locked"></span>
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.title}}
    </a>
    <a class=" link-list-new" @click="addTodoList()">
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
    this.$store.dispatch('getTodo').then(() => {
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      })
    })
  },
  computed: {
    todoList() {
      return this.$store.getters.getTodoList;
    }
  },
  methods: {
    // 进入menu中某一条的todoList
    goList(id) {
      this.todoId = id;
    },
    // 在menu里添加一条
    addTodoList() {
      // 获得mock数据
      addTodo({}).then(data => {
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              // 跳转到新创建的todoList
              this.goList(this.todoList[this.todoList.length - 1].id);
            }, 100);
          });
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
