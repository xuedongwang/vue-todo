<template>
  <div class="page-wrapper">
    <header class="header">
      <h1 class="title">Todos</h1>
    </header>
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
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-item">Double-click to edit a todo</div>
        <div class="footer-item">
          Written by 
          <a href="">XueDong Wang</a>
        </div>
        <div class="footer-item">
          Design by 
          <a href="">TodoMVC</a>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { id } from '@/utils/id';
import localforage from '@/utils/localforage';
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
    TodoFooter
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
        id: id(),
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
  .header {
    .title {
      font-size: 100px;
      color: rgba(175, 47, 47, 0.15);
      font-weight: 100;
      text-align: center;
      user-select: none;
    }
  }
  .main {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2),  0 25px 50px 0 rgba(0, 0, 0, .1);
  }
  .footer {
    margin: 65px auto 0;
    .footer-inner {
      font-size: 10px;
      color: #bfbfbf;
      text-align: center;
      text-shadow: 0 1px 0 rgba(255,255,255,.5);
      .footer-item {
        margin: 10px 0;
        a {
          color: inherit;
          text-decoration: none;
        }
      }
    }
  }
}
</style>