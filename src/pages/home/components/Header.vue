<template>
  <header class="header">
    <h1 class="title">Todos</h1>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.header {
  .title {
    font-size: 100px;
    color: rgba(175, 47, 47, 0.15);
    font-weight: 100;
    text-align: center;
    user-select: none;
  }
}
</style>