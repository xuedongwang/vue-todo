<template>
  <div class="main-header">
    <i class="toggle-all" @click="handleToggleAll" :class="{'active': isAllDone}"></i>
    <input type="text" autofocus @keyup.enter="handleAddTodo" :value="value" @input="e => $emit('input', e.target.value)" class="add-todo-input" placeholder="What needs to be done?">
  </div>
</template>

<script>
const UNDONE_STATUS = 1;
export default {
  name: 'TodoHeader',
  props: {
    todoList: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    isAllDone () {
      return this.undoneTodos.length === 0 && this.todoList.length > 0;
    },
    undoneTodos () {
      return this.todoList.filter(todo => todo.status === UNDONE_STATUS);
    },
  },
  methods: {
    handleToggleAll () {
      this.$emit('toggle', this.isAllDone);
    },
    handleAddTodo () {
      this.$emit('confirm');
    },
  }
}
</script>

<style lang="scss" scoped>
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
</style>