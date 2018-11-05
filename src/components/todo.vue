<template>
  <div class="page lists-show" v-show="!todo.isDelete">
    <nav>
      <!-- update title -->
      <div class="form list-edit-form" v-show="isUpdate">
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
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
    },
    onAdd() {
      const ID = this.$route.params.id;
      addRecord({id: ID, text: this.text }).then(res => {
        this.text = '';
        this.init()
      });
    },
    updateTodo() {
      let _this = this;
      editTodo({
        todo: this.todo
      }).then(data => {
        _this.$store.dispatch('getTodo');
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
