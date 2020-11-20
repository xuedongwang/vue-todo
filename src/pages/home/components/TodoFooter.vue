<template>
  <div class="main-footer" v-if="todoList.length">
    <div class="control-inner">
      <div class="inner-left">{{ undoneTodos.length }} item left</div>
      <div class="inner-center">
        <div @click="handleChangeFilter('all')" class="all-todo control-item" :class="{active: active === 'all'}">all</div>
        <div @click="handleChangeFilter('undone')" class="undone-todo control-item" :class="{active: active === 'undone'}">active</div>
        <div @click="handleChangeFilter('done')" class="dont-todo control-item" :class="{active: active === 'done'}">completed</div>
      </div>
      <div class="inner-right" v-visiable="!!doneTodoList.length" @click="handleClearAllDoneTodo">Clear completed</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
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
  computed: {
    undoneTodos () {
      return this.todoList.filter(todo => todo.status === 1);
    },
    doneTodoList () {
      return this.todoList.filter(todo => todo.status === 2);
    },
  },
  methods: {
    handleChangeFilter (filterType) {
      this.$emit('change', filterType);
    },
    handleClearAllDoneTodo () {
      this.$emit('onClearAll');
    },
  }
}
</script>

<style lang="scss" scoped>
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
</style>