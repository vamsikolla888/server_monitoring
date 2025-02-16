export const getDataFromLocalStorage = (key, callback = null) => {
  try {
    if (callback) {
      console.log('AA', callback(JSON.parse(localStorage.getItem(key))));
      return callback(JSON.parse(localStorage.getItem(key)));
    }
    return localStorage.getItem(key) ?? 'null';
  } catch (error) {
    console.log('LOCAL STORAGE ERROR: ' + error);
    return 'null';
  }
};
