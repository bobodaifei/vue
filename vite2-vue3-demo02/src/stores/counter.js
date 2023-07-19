import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {},
  getters: {},
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      {
        storage: localStorage,
        paths: ['user'],
        key: "user"
      }
    ]
  }
})
