export class Observable {
  constructor() {
    this._clickObservers = [];
    this._dblclickObservers = [];
    this._renderFinishedObservers = [];
  }
  clickSubscribe(...observer) {
    this._clickObservers.push(...observer);
  }
  clickUnsubscribe(observer) {
    this._clickObservers = [...this._clickObservers].filter(
      (subscriber) => subscriber !== observer
    );
  }
  clickNotify(...data) {
    this._clickObservers.forEach((observer) => observer(...data));
  }
  dblclickSubscribe(...observer) {
    this._dblclickObservers.push(...observer);
  }
  dblclickUnsubscribe(observer) {
    this._dblclickObservers = [...this._dblclickObservers].filter(
      (subscriber) => subscriber !== observer
    );
  }
  dblclickNotify(...data) {
    this._dblclickObservers.forEach((observer) => observer(...data));
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
