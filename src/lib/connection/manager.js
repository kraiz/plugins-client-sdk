import genID from './../utils/genId';
let log = require('loglevel');
/**
 * @type {Object.<string, {resolve: function, reject: function, promise: Promise}>}
 */
let promiseMap = {};

/**
 * Create an info object for a new promise in the map.
 *
 * @return {string} id of the promise
 */
function createPromiseObject() {
  let id = genID();

  // When the id is already used, it invokes the function again
  if (promiseMap.hasOwnProperty(id)) return createPromiseObject();

  promiseMap[id] = { resolve: null, reject: null, promise: null };
  return id;
}

/**
 * Create a promise and return it's id.
 *
 * The id can be used to operate on the promise using other interface functions.
 *
 * @return {string} id of the promise
 */
export const create = () => {
  let id = createPromiseObject();

  let p = new Promise(function(resolve, reject) {
    promiseMap[id].resolve = resolve;
    promiseMap[id].reject = reject;
  });

  promiseMap[id].promise = p;
  log.debug('promiseManager/create ' + id);
  return id;
};

/**
 * Resolve a promise by id.
 *
 * @param {string} id of the promise
 * @param {any} msg the message which will will be passed to resolve
 *
 * @throws {Error} on unknown id
 */
export const resolve = (id, msg) => {
  log.debug('promiseManager/resolve ' + id);
  if (!promiseMap.hasOwnProperty(id))
    throw new Error('Tried to resolve an unknown [' + id + '] promise.');

  promiseMap[id].resolve(msg);

  delete promiseMap[id];
};

/**
 * Reject a promise by id.
 *
 * @param {string} id of the promise
 * @param {any} err the error which will will be passed to reject
 * @throws {Error} on unknown id
 */
export const reject = (id, err) => {
  log.debug('promiseManager/reject ' + id);
  if (!promiseMap.hasOwnProperty(id))
    throw new Error('Tried to reject an unknown [' + id + '] promise.');

  promiseMap[id].reject(err);
  delete promiseMap[id];
};

/**
 * Get a promise by id.
 *
 * @param {string} id of the promise
 * @return {Promise} the promise identified by id
 * @throws {Error} on unknown id
 */
export const get = id => {
  if (!promiseMap.hasOwnProperty(id))
    throw new Error('Tried to get an unknown [' + id + '] promise.');

  return promiseMap[id].promise;
};

/**
 * Resets the state to the default
 */
export const unload = () => {
  promiseMap = {};
};
