class Observable {
  constructor() {
    this._observers = new Set();
  }

  subscribe(observer) {
    this._observers.add(observer);
  }

  unsubscribe(observer) {
    this._observers = [...this._observers].filter(
      (subscriber) => subscriber !== observer
    );
  }

  notify(func, data) {
    this._observers.forEach((observer) => {
      if (observer === func) observer(data);
    });
  }
}
