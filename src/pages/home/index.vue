<template>
  <div class="page-wrapper">
    <header class="header">
      <h1 class="title">Todos</h1>
    </header>
    <main class="main">
      <div class="main-header">
        <i class="toggle-all" @click="handleToggleAll" :class="{'active': isAllDone}"></i>
        <input type="text" autofocus @keyup.enter="handleAddTodo" v-model="newTodoContent" class="add-todo-input" placeholder="What needs to be done?">
      </div>
      <div class="main-body">
        <draggable v-model="displayTodoList" group="people" @start="drag=true" @end="drag=false">
          <div class="todo-item" :title="todo.createAt | ago" v-for="todo of displayTodoList" :key="todo.id">
            <div class="item-inner edit" v-if="todo.editing">
              <input type="text" v-focus autofocus @keyup.enter="handleConfirmEditTodo(todo)" @blur="handleConfirmEditTodo(todo)" v-model="todo.text" class="edit-todo-input">
            </div>
            <template v-else>
              <div class="item-inner undone" v-if="todo.status === 1">
                <img class="todo-status-icon" width="30" height="30" :src="require('@/assets/svg/undone-icon.svg').default" @click="handleDoneTodo(todo)" alt="">
                <div class="todo-text" @dblclick="handleEditTodo(todo)">{{ todo.text }}</div>
                <div class="todo-control">
                  <i class="delete-todo" @click="handleDeleteTodo(todo.id)"></i>
                </div>
              </div>
              <div class="item-inner done" v-if="todo.status === 2">
                <img class="todo-status-icon" width="30" height="30" :src="require('@/assets/svg/done-icon.svg').default" @click="handleUndoneTodo(todo)" alt="">
                <div class="todo-text" @dblclick="handleEditTodo(todo)">{{ todo.text }}</div>
                <div class="todo-control">
                  <i class="delete-todo" @click="handleDeleteTodo(todo.id)"></i>
                </div>
              </div>
            </template>
          </div>
        </draggable>
      </div>
      <div class="main-footer" v-if="todoList.length">
        <div class="control-inner">
          <div class="inner-left">{{ undoneTodos.length }} item left</div>
          <div class="inner-center">
            <div @click="handleChangeFilter('all')" class="all-todo control-item" :class="{active: filter === 'all'}">all</div>
            <div @click="handleChangeFilter('undone')" class="undone-todo control-item" :class="{active: filter === 'undone'}">active</div>
            <div @click="handleChangeFilter('done')" class="dont-todo control-item" :class="{active: filter === 'done'}">completed</div>
          </div>
          <div class="inner-right" v-visiable="!!doneTodoList.length" @click="handleClearAllDoneTodo">Clear completed</div>
        </div>
      </div>
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
import draggable from 'vuedraggable'
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
    draggable
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
<style lang="scss" scope>
.page-wrapper {
  max-width: 550px;
  margin: 0 auto;
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
    .main-header {
      box-shadow: inset 0 -2px 1px rgba(0, 0, 0, .03);
      padding: 16px 16px 16px 60px;
      position: relative;
      .toggle-all {
        font-style: normal;
        position: absolute;
        cursor: pointer;
        width: 20px;
        left: 10px;
        top: 50%;
        text-align: center;
        line-height: 30px;
        transform: translateY(-50%);
        padding: 5px 10px;
        &.active {
          &:before {
            color: #737373;
          }
        }
        &:before {
          content: '❯';
          font-size: 22px;
          color: #e6e6e6;
          transform: rotate(90deg);
        }
      }
      .add-todo-input {
        width: 100%;
        font-size: 24px;
        font-weight: 300;
        border: 0;
        outline: 0;
        padding: 0;
        &::placeholder {
          font-style: italic;
          font-weight: 300;
          color: var(--gray);
        }
      }
    }
    .main-body {
      .todo-item {
        background: #fff;
        .item-inner {
          display: flex;
          align-items: center;
          font-size: 24px;
          border-bottom: 1px solid #ededed;
          padding: 0 12px;
          &:hover {
            .delete-todo {
              cursor: pointer;
              visibility: visible !important;
            }
          }
          .todo-status-icon {
            cursor: pointer;
          }
          .todo-control {
            &:hover {
              .delete-todo {
                &:after {
                  color: #af5b5e;
                }
              }
            }
            .delete-todo {
              visibility: hidden;
              &:after {
                content: '×';
                font-size: 30px;
                color: #cc9a9a;
              }
            }
            .icon-shanchu {
              visibility: hidden;
            }
          }
          &:hover {
            .todo-control {
              .icon-shanchu {
                visibility: visible;
              }
            }
          }
          &.undone {}
          &.done {
            .todo-text {
              color: #d9d9d9;
              text-decoration: line-through;
            }
          }
          &.edit {
            .edit-todo-input {
              flex: 1;
              margin-left: 5px;
              padding: 15px 10px;
              word-break: break-all;
              border: 1px solid #999;
              box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, .2);
              outline: none;
            }
          }
          .todo-text {
            flex: 1;
            margin-left: 5px;
            padding: 13px 10px;
            word-break: break-all;
          }
        }
      }
    }
    .main-footer {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0,0,0,.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0,0,0,.2);
      }
      .control-inner {
        position: relative;
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
        .inner-center {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .inner-right {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .control-item {
          color: inherit;
          margin: 3px;
          padding: 3px 7px;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 3px;
          cursor: pointer;
          user-select: none;
          &.active {
            border-color: rgba(175,47,47,.2);
          }
        }
      }
    }
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
          font-weight: 400;
        }
      }
    }
  }
}
</style>
