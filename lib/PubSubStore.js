import { MessageQueue } from "./PubSubMQ.js";

export default class Store {
  constructor(actions, initialState = {}) {
    this.messageQueue = new MessageQueue();
    this.actions = actions;
    this.state = initialState;
  }

  dispatch(actionName, payload) {
    if (typeof this.actions?.[actionName] === "function") {
      this.state = this.actions[actionName](this.state, payload);
      this.messageQueue.publish(this.state);
      return true;
    } else {
      console.error(`Action "${actionName}" is not defined.`);
      return false;
    }
  }

  subscribe(callback) {
    callback(this.state);
    return this.messageQueue.subscribe(callback);
  }
}
