<template>
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
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
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
</style>