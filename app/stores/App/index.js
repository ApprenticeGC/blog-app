import { observable, computed, reaction, action } from 'mobx';

import data from './data.json';

export default class {
  @observable articles = [];

  constructor() {
    this.articles = data.articles;
  }
};
