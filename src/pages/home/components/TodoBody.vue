
<template>
  <div class="main-body">
    <draggable v-model="todoList" group="people" @start="drag=true" @end="drag=false">
      <div class="todo-item" :title="todo.createdAt | ago" v-for="todo of todoList" :key="todo.id">
        <div class="item-inner edit" v-if="todo.editing">
          <input type="text" v-focus autofocus @keyup.enter="handleConfirmEditTodo(todo)" @blur="handleConfirmEditTodo(todo)" v-model="todo.text" class="edit-todo-input">
        </div>
        <template v-else>
          <div class="item-inner undone" v-if="todo.status === 1">
            <img
              class="todo-status-icon"
              width="30"
              height="30"
              src="@/assets/svg/undone-icon.svg"
              @click="handleDoneTodo(todo)"
              alt="undont svg"
            >
            <div class="todo-text" @dblclick="handleEditTodo(todo)">{{ todo.text }}</div>
            <div class="todo-control">
              <i class="delete-todo" @click="handleDeleteTodo(todo.id)"></i>
            </div>
          </div>
          <div class="item-inner done" v-if="todo.status === 2">
            <img
              class="todo-status-icon"
              width="30"
              height="30"
              src="@/assets/svg/done-icon.svg"
              @click="handleUndoneTodo(todo)"
              alt="done svg"
            >
            <div class="todo-text" @dblclick="handleEditTodo(todo)">{{ todo.text }}</div>
            <div class="todo-control">
              <i class="delete-todo" @click="handleDeleteTodo(todo.id)"></i>
            </div>
          </div>
        </template>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
const UNDONE_STATUS = 1;
const DONE_STATUS = 2;
export default {
  name: 'TodoBody',
  props: {
    todoList: {
      type: Array,
      default () {
        return [];
      }
    },
    active: {
      type: String,
      default: 'all'
    }
  },
  components: {
    draggable
  },
  computed: {
    displayTodoList() {
      if (this.active === 'all') {
        return this.todoList;
      }
      if (this.active === 'undone') {
        return this.todoList.filter(todo => todo.status === UNDONE_STATUS);
      }
      if (this.active === 'done') {
        return this.todoList.filter(todo => todo.status === DONE_STATUS);
      }
    }
  },
  methods: {
    handleConfirmEditTodo (todo) {
      this.$emit('save', todo);
    },
    handleDoneTodo (todo) {
      this.$emit('done', todo);
    },
    handleEditTodo(todo) {
      this.$emit('edit', todo);
    },
    handleDeleteTodo (id) {
      this.$emit('delete', id);
    },
    handleUndoneTodo (todo) {
      this.$emit('undone', todo);
    },
  }
}
</script>

<style lang="scss" scoped>
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
</style>