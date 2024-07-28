const fetch = require('jest-fetch-mock');
const { TextEncoder, TextDecoder } = require('util');

global.fetch = fetch;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;