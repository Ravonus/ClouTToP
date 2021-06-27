/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:17:31 pm
 * @copyright TechnomancyIT
 */
import Store from 'electron-store';
import { array } from 'prop-types';

const store = new Store();

interface StoreType {
  [key: string]: any;
}

export function loadStore(values: string | string[]) {
  let stores: StoreType = {};
  let isArray = true;
  if (typeof values === 'string') {
    isArray = false;
    values = [values];
  }

  values.map((value) => {
    stores[value] = store.get(value);
  });

  if (!isArray) return stores[values[0]];
  else return stores;
}

export function setStore(key: string, value: any) {
  store.set(key, value);
}

export function deleteStore(key: string) {
  store.delete(key);
}
