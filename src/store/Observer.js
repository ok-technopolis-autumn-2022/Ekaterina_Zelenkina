export default class Observer {
  subscribers = [];

  subscribe = (subscriber) => {
    this.subscribers.push(subscriber);
  }

  unSubscribe = (_subscriber) => {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== _subscriber);
  }

  notify = () => {
    this.subscribers.forEach(subscriber => subscriber());
  }
}

