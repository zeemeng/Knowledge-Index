class Subscription {
  constructor(callback, subscriptionContainer) {
    this.callback = callback;
    this.unsubscribe = () => {
      const index = subscriptionContainer.indexOf(this);
      if (index > -1) subscriptionContainer.splice(index, 1);
    };
  }
}

export class MessageQueue {
  observers = [];

  subscribe(callback) {
    const subscription = new Subscription(callback, this.observers);
    this.observers.push(subscription);
    return subscription;
  }

  publish(message) {
    this.observers.forEach((subscription) => subscription.callback(message));
  }
}

export class MemoMessageQueue extends MessageQueue {}
