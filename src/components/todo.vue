<template>
  <!-- v-show 用来定义 display字段 -->
  <div class="page lists-show" v-show="!todo.isDelete">
    <nav>
      <!-- update title -->
      <div class="form list-edit-form" v-show="isUpdate">
        <!-- updateTitle只写方法名即可 -->
        <!-- v-model 实现数据双向绑定，监听输入事件并更新数据 -->
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <!-- 直接修改数据值 -->
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close"></span>
          </a>
        </div>
      </div>
      <!-- icon -->
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <!-- title -->
      <h1 class="title-page" @click="isUpdate = true" v-show="!isUpdate">
        <span class="title-wrapper">{{todo.title}}</span>
        <span class="count-list">{{todo.count || 0}}</span>
      </h1>
      <!-- right icon -->
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class=" nav-item" @click="onlock">
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <a class=" nav-item">
            <span class="icon-trash" @click="onDelete"></span>
          </a>
        </div>
      </div>
      <!-- Input -->
      <div class=" form todo-new input-symbol">
        <input placeholder="Please Enter" type="text" v-model="text" @keyup.enter="onAdd" :disabled="todo.locked">
        <span class="icon-add"></span>
      </div>
    </nav>
    <!-- 下半部分 -->
    <div class="content-scrollable list-items">
      <div v-for="(item, index) in items" :key="index">
        <item :item="item" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './item';
import { getTodo, addRecord, editTodo } from '../api/api';

export default {
  data() {
    return {
      todo: {},
      items: [],
      text: '',
      isUpdate: false
    };
  },
  components: {
    item
  },
  watch: {
    // eslint-disable-next-line
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
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo;
        this.items = record;
        this.todo = {
          id,
          title,
          count,
          locked,
          isDelete
        };
      });
    },
    onAdd() {
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text }).then(res => {
        this.text = '';
        this.init()
      });
    },
    updateTodo() {
      let that = this;
      editTodo({
        todo: this.todo
      }).then(data => {
        that.$store.dispatch('getTodo');
      })
    },
    updateTitle() {
      this.updateTodo();
      this.isUpdate = false;
    },
    onlock() {
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    },
    onDelete() {
      this.todo.isDelete = true;
      this.updateTodo();
    }
  }
};
</script>

<style lang="less">
@import "../common/style/todo.less";
@import "../common/style/form.less";
@import "../common/style/nav.less";
</style>
