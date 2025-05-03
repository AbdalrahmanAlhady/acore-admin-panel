export const bookStore = {
  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },

  notify(data) {
    this.listeners.forEach((listener) => listener(data));
  },
};
