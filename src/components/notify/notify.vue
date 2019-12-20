<template>
  <div class="notify"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseout"
    :style="positionStyle"
  >
    <div class="content">
      <h2 class="title" v-if="title">{{ title }}</h2>
      <div class="body">
        <p>{{ message }}</p>
      </div>
    </div>
    <i class="close" @click="handleClose">×</i>
  </div>
</template>
<script>
export default {
  name: 'Notify',
  props: {
    title: {
      type: String,
      default: ''
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 2500
    },
    message: {
      type: String,
      default: '默认内容'
    }
  },
  data () {
    return {
      verticalOffset: 0
    }
  },
  computed: {
    positionStyle() {
      return {
        top: `${ this.verticalOffset }px`
      };
    }
  },
  methods: {
    handleMouseenter () {
      this.clearTimer();
    },
    handleMouseout () {
      this.autoCloseFunc();
    },
    handleClose () {
      this.close();
    },
    autoCloseFunc () {
      this.timer = setTimeout(() => {
        this.close();
      }, this.delay);
    },
    clearTimer () {
      clearTimeout(this.timer);
    }
  },
  mounted () {
    this.autoClose && this.autoCloseFunc();
  },
  beforeDestroy () {
    this.clearTimer();
  }
};
</script>
<style lang="scss" scoped>
.notify {
  top: 16px;
  z-index: 2001;
  right: 16px;
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  transition: top .4s;
  overflow: hidden;
  .content {
    margin-left: 13px;
    margin-right: 8px;
    .title {
      font-weight: 700;
      font-size: 16px;
      color: #303133;
      margin: 0;
    }
    .content {
      font-size: 14px;
      line-height: 21px;
      margin: 6px 0 0;
      color: #606266;
      font-weight: normal;
      text-align: justify;
    }
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10px;
    height: 10px;
    font-size: 20px;
    color: #909399;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      color: #606266;
    }
  }
}
</style>