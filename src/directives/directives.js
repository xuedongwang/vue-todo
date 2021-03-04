export default {
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