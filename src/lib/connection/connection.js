import postMessageLegacy from './connector/postmessage-legacy.js';
import fallback from './connector/fallback.js';
import postMessage from './connector/postmessage.js';
import putMessage from './connector/putMessage.js';
let log = require('loglevel');
let connect = Promise.race([putMessage(), postMessage(), postMessageLegacy(), fallback()]);

/**
 * Send a message to the App
 *
 * Will reuse the determined connector
 * to send a message to the Staffbase App
 *
 * @param {any} msg message to send to Staffbase App
 * @param {any} payload that will be attached to the message
 * @return {Promise<any>} result of the request
 */
export default async (msg, ...payload) => {
  log.info('connection/sendMessage ' + msg);
  log.debug('connection/sendMessage/payload ' + JSON.stringify(payload));

  return connect.then(sendFn => sendFn(msg, ...payload));
};
