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
export default {
  name: 'Home',
  data () {
    return {
      todoList: [],
      newTodoContent: '',
      filter: 'all' // 1: all 2: undone 3 done
    };
  },
  components: {
    TodoHeader,
    TodoBody,
    TodoFooter,
    Header,
    Footer
  },
  computed: {
    isAllDone () {
      return !this.undoneTodos.length && this.todoList.length !== 0;
    },
    undoneTodos () {
      return this.todoList.filter(todo => todo.status === 1);
    },
    doneTodoList () {
      return this.todoList.filter(todo => todo.status === 2);
    },
    displayTodoList: {
      set (newValue) {
        this.todoList = newValue;
      },
      get () {
        if (this.filter === 'all') {
          return this.todoList;
        }
        if (this.filter === 'undone') {
          return this.todoList.filter(todo => todo.status === 1);
        }
        if (this.filter === 'done') {
          return this.todoList.filter(todo => todo.status === 2);
        }
      }
    }
  },
  methods: {
    handleToggleAll () {
      this.todoList = this.todoList.map(todo => {
        return {
          ...todo,
          status: this.isAllDone ? 1 : 2
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
        status: 1, // 1: undone 2: done
        editing: false,
        createAt: Date.now(),
        updateAt: Date.now()
      };
      this.todoList.push(newTodo);
      this.newTodoContent = '';
    },
    handleDoneTodo (todo) {
      todo.status = 2;
    },
    handleUndoneTodo (todo) {
      todo.status = 1;
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
        return todo.status !== 2;
      })
    },
    handleChangeFilter (filterType) {
      this.filter = filterType;
    },
    async initTodoList () {
      const todoList = await localforage.getItem('__todoList');
      this.todoList = todoList || [];
    },
    async cacheTodoList () {
      await localforage.setItem('__todoList', this.todoList);
    }
  },
  mounted () {
    this.initTodoList ();
    this.debounceCacheTodoList = _.debounce(this.cacheTodoList, 10);
    window.addEventListener('resize', this.a)
  },
  watch: {
    todoList: {
      handler () {
        this.debounceCacheTodoList();
      },
      deep: true
    }
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