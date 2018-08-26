/**
 * Custom Local Storage module
 * It store all of the mess you need to store
 * like saved commits and sessions
 */
const session_key = 'session';

export default {

  getSessions: () => this.getItems(session_key),

  /**
   * Temporary method to retrieve a list of items
   * Might change later
   */
  getItems: (keyBase:string):{[k:string]:any} => {
    let output:{[k:string]:any} = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.startsWith(keyBase)) {
        output[key] = this.getItem(key)
      }
    }
    return output;
  },

  /**
   * Get item from the local storage
   */
  getItem: (key:string): any => {
    try {
      return JSON.parse(localStorage.getItem(key))
    }
    catch (e) {
      throw new Error (`LocalStorage: Error while retrieving the key '${key}'. [${e.message}]`)
    }
  },

  /**
   * Save an item in the local storage
   */
  setItem: (key:string, value:any): void => {
    try {
      return localStorage.setItem(key, JSON.stringify(value))
    }
    catch (e) {
      throw new Error (`LocalStorage: Error while setting the key '${key}'. [${e.message}]`)
    }
  }
}