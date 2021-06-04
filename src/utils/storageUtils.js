import store from 'store'

const storage = {
  set : function(keyName,obj) {
    store.set(keyName,obj);
  },
  get : function(keyName) {
    return store.get(keyName)
  },
  remove : function(keyName) {
    store.remove(keyName)
  }
}

export default storage