import { useUserStore } from '@/stores/counter'
import pinia from '@/stores/store'

export default {
  mounted(el, binding) {

    //获取当前使用指令的值
    const { value } = binding

    const store = useUserStore(pinia);
    let rootMenu = store.user.menu[0]
    let flag = checkValue(rootMenu, 'function', value)
    if (!flag) {
        el.style.display = "none"
    }
  }
}

function checkValue(obj, key, value) {
  if (obj === null) {
    return false;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (checkValue(obj[i], key, value)) {
        return true;
      }
    }
  } else if (typeof obj === 'object') {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    }
    for (let prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop) && checkValue(obj[prop], key, value)) {
        return true;
      }
    }
  }

  return false;
}