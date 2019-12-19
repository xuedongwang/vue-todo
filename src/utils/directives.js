const directives = {
  focus: {
    inserted: function (el) {
      el.focus();
    }
  },
  visiable: {
    bind (el, { value }) {
      el.style.visibility = value ? 'visible' : 'hidden';
    },
    update (el, { value }) {
      el.style.visibility = value ? 'visible' : 'hidden';
    }
  }
};

export default {
  install (Vue) {
    for (let [key, value] of Object.entries(directives)) {
      Vue.directive(key, value);
    }
  }
};