export class Model {
  constructor(...views) {
    this._views = views;
  }

  notify(func) {
    return this._views.forEach(func);
  }
}
