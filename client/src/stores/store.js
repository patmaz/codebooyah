import { observable, action } from 'mobx';
import axios from 'axios';

class MainStore {
  @observable introItems = observable.array();
  @observable introItemsLoading = false;

  @action
  getIntroItems = () => {
    this.introItemsLoading = true;
    return axios.get('/api/intro').then(data => {
      this.introItems.replace(data.data);
      this.introItemsLoading = false;
    });
  }
}

export const stores = {
  mainStore: new MainStore(),
};