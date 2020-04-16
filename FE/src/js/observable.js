export class Observable {
  constructor() {
    this._eventObservers = [];
    this._renderFinishedObservers = [];
  }
  eventSubscribe(...observer) {
    this._eventObservers.push(...observer);
  }
  eventUnsubscribe(observer) {
    this._eventObservers = [...this._eventObservers].filter(
      (subscriber) => subscriber !== observer
    );
  }
  eventNotify(...data) {
    this._eventObservers.forEach((observer) => observer(...data));
  }

  renderFinishedSubscribe(...observer) {
    this._renderFinishedObservers.push(...observer);
  }
  renderFinishedUnsubscribe(observer) {
    this._renderFinishedObservers = [...this._renderFinishedObservers].filter(
      (subscriber) => subscriber !== observer
    );
  }
  renderFinishedNotify(...data) {
    this._renderFinishedObservers.forEach((observer) => observer(...data));
  }
}
