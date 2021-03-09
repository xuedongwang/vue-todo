<template>
  <div class="page-wrapper">
    <Header/>
    <main class="main">
      <TodoHeader
        v-model="newTodoContent"
        :todoList="todoList"
        @toggle="handleToggleAll"
        @confirm="handleAddTodo"
      />
      <TodoBody
        :todoList="todoList"
        :active="filter"
        @edit="handleEditTodo"
        @save="handleConfirmEditTodo"
        @done="handleDoneTodo"
        @undone="handleUndoneTodo"
        @delete="handleDeleteTodo"
      />
      <TodoFooter
        :todoList="todoList"
        :active="filter"
        @change="handleChangeFilter"
        @onClearAll="handleClearAllDoneTodo"
      />
    </main>
    <Footer/>
  </div>
</template>
<script>
import { localforage, uuid } from '@/utils';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoHeader from './components/TodoHeader';
import TodoFooter from './components/TodoFooter';
import TodoBody from './components/TodoBody';
import { debounce } from 'lodash';
const CACHE_KEY = '__TODO_LIST__';
const UNDONE_STATUS = 1;
const DONE_STATUS = 2;
const ALL_STATUS = 1 | 2;
export default {
  name: 'Todo',
  data () {
    return {
      todoList: [],
      newTodoContent: '',
      filter: 'all' // 1: all 2: undone 3: done
    };
  },
  components: {
    TodoHeader,
    TodoBody,
    TodoFooter,
    Header,
    Footer
  },
  methods: {
    handleToggleAll (isAllDone) {
      this.todoList = this.todoList.map(todo => {
        return {
          ...todo,
          status: isAllDone ? UNDONE_STATUS : DONE_STATUS
        };
      })
    },
    handleAddTodo () {
      if (!this.newTodoContent.trim()) {
        alert('内容不能为空');
        return;
      }
      const newTodo = {
        id: uuid(),
        text: this.newTodoContent,
        status: UNDONE_STATUS,
        editing: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      this.todoList.push(newTodo);
      this.newTodoContent = '';
    },
    handleDoneTodo (todo) {
      todo.status = DONE_STATUS;
    },
    handleUndoneTodo (todo) {
      todo.status = UNDONE_STATUS;
    },
    handleDeleteTodo (id) {
      this.todoList = this.todoList.filter(todo => todo.id !== id);
    },
    handleEditTodo(todo) {
      todo.editing = true;
    },
    handleConfirmEditTodo (todo) {
      todo.editing = false;
    },
    handleClearAllDoneTodo () {
      this.todoList = this.todoList.filter(todo => {
        return todo.status !== DONE_STATUS;
      });
    },
    handleChangeFilter (filterType) {
      this.filter = filterType;
    },
    async fetchTodoList () {
      const todoList = await localforage.getItem(CACHE_KEY);
      this.todoList = todoList ?? [];
    },
    async cacheTodoList () {
      await localforage.setItem(CACHE_KEY, this.todoList);
    }
  },
  mounted () {
    this.fetchTodoList();
    this.debounceCacheTodoList = debounce(this.cacheTodoList, 10);
  },
  watch: {
    todoList: {
      handler () {
        this.debounceCacheTodoList();
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.debounceCacheTodoList && this.debounceCacheTodoList.cancel();
  }
};
</script>
<style lang="scss" scoped>
.page-wrapper {
  max-width: 550px;
  margin: 0 auto;
  font-weight: 300;
  .main {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2),  0 25px 50px 0 rgba(0, 0, 0, .1);
  }
}
</style>