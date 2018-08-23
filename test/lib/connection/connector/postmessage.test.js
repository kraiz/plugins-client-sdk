/* eslint-disable no-global-assign */
/* eslint-env jest, es6 */

import stubPostMessage, { mockPostMessage } from '../../mocks';
import connect from '../../../../src/lib/connection/connector/postmessage';
import { disconnect } from '../../../../src/lib/connection/connector/postmessage';
import command from '../../../../src/lib/connection/commands.js';
import genId from '../../../../src/lib/utils/genId';

jest.mock('../../../../src/lib/utils/genId');
const mockVersion = '3.6-dev';
const standardMsg = [
  'SUCCESS',
  0,
  {
    platform: { native: 'ios', mobile: true, version: mockVersion },
    language: {
      branchLanguages: {
        de: {
          key: 'de',
          locale: 'de_DE',
          name: 'Deutsch',
          localizedName: 'Deutsch'
        },
        en: {
          key: 'en',
          locale: 'en_US',
          name: 'English',
          localizedName: 'Englisch'
        }
      }
    }
  }
];

describe('postmessage', () => {
  describe('connect', () => {
    beforeEach(() => {
      disconnect();
      mockPostMessage();
    });

    afterEach(() => {
      disconnect();
    });

    test('should be a function', () => {
      expect(connect).toBeFunction();
    });

    test('should yield a Promise', () => {
      let res = connect();
      expect(res instanceof Promise).toBeTrue;
    });

    test('should use postMessage', () => {
      jest.spyOn(window.parent, 'postMessage');
      connect();
      expect(window.parent.postMessage).toHaveBeenCalledTimes(1);
    });

    test('should send a HELLO message', () => {
      jest.spyOn(window.parent, 'postMessage');
      connect();
      let message = window.parent.postMessage.mock.calls[0][0];
      expect(message[0]).toEqual('HELLO');
    });

    test('should resolve on SUCCESS message', async () => {
      stubPostMessage(standardMsg);
      return expect(await connect()).toBe.ok;
    });

    test('should provide a function', async () => {
      stubPostMessage(standardMsg);
      let fn = await connect();
      return expect(fn).toBeFunction();
    });

    describe('send function', async () => {
      describe('should accept sdk commands', async () => {
        beforeEach(() => {
          stubPostMessage(standardMsg);
        });

        afterEach(() => {
          disconnect();
        });

        test(command.ios, async () => {
          let sendFn = await connect();
          let ios = await sendFn(command.ios);
          expect(ios).toBe.true;
        });

        test(command.android, async () => {
          let sendFn = await connect();
          let android = await sendFn(command.android);
          expect(android).toBe.false;
        });

        test(command.mobile, async () => {
          let sendFn = await connect();
          let mobile = await sendFn(command.mobile);
          expect(mobile).toBe.true;
        });

        test(command.version, async () => {
          let sendFn = await connect();
          let version = await sendFn(command.version);
          expect(version).toEqual(mockVersion);
        });

        test('throw error on unknown commands', async () => {
          let sendFn = await connect();
          let data = 'Command unknown not supported by driver';

          try {
            await sendFn('unknown');
          } catch (error) {
            expect(error.message).toEqual(data);
          }
        });
      });

      describe('should send invoke commands', async () => {
        let responseSpy;

        beforeEach(() => {
          responseSpy = stubPostMessage(standardMsg);
        });

        afterEach(() => {
          disconnect();
        });
        test(command.openLink, async () => {
          let sendFn = await connect();
          let data = 'Link opened';
          let success = ['SUCCESS', 'ff22', data];

          genId.mockReturnValue('ff22');
          responseSpy.changeMsg(success);
          let result = await sendFn(command.openLink, 'http://staffbase.com');

          expect(result).toEqual(data);
        });

        test('reject on error', async () => {
          let sendFn = await connect();
          let data = 'No url set.';
          let error = ['ERROR', 'ff22', data];

          genId.mockReturnValue('ff22');
          responseSpy.changeMsg(error);
          expect(sendFn(command.openLink, 'http://staffbase.com')).rejects.toEqual(data);
        });
      });
    });
  });
});
