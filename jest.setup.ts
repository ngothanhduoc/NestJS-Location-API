/* eslint-disable @typescript-eslint/no-unused-vars */
process.env.NODE_ENV = 'test';

import * as crypto from 'crypto';

// Polyfill for crypto.randomUUID if not available
if (typeof crypto.randomUUID !== 'function') {
  const customRandomUUID = () => {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: any) =>
        (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16),
    );
  };
}

// Polyfill for crypto.randomUUID if not available
if (typeof crypto.randomUUID !== 'function') {
  crypto.randomUUID = () => {
    return ([1e7] as any + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c: any) =>
        (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16),
    );
  };
}

global.crypto = {
  ...crypto,
  subtle: {} as SubtleCrypto,
  getRandomValues: <T extends ArrayBufferView>(array: T): T => {
    const bytes = crypto.randomBytes(array.byteLength);
    const uint8Array = new Uint8Array(bytes);
    (array as unknown as Uint8Array).set(uint8Array);
    return array;
  },
};
