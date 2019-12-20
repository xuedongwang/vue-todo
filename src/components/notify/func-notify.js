import Vue from 'vue';
import Notify from './notify';

const NotifyConstructor = Vue.extend(Notify)

const instances = [];
let seed = 1;
let offset = 10;
let initTop = 10;

const Notification = function (props) {
  const instance = new NotifyConstructor({
    propsData: props,
    methods: {
      close () {
        Notification.close(this.id);
      }
    }
  });
  const id = `notify_${seed++}`;
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el)
  instance.visible = true;

  let verticalOffset = 0;

  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + initTop
  })
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
}

Notification.close = function (id) {
  const index = instances.findIndex(ins => ins.id === id);
  if (index === -1) return;
  const instance = instances[index];
  const removeEl = instance.$el;
  const removeHeight = removeEl.offsetHeight + offset;

  document.body.removeChild(removeEl);
  instances.splice(index, 1);

  for (let i = index; i < instances.length; i++) {
    instances[i].$el.style.top = `${instances[i].$el.offsetTop-removeHeight}px`;
  }
}

export default  Notification;