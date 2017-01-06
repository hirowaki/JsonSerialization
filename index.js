'use strict';
/*
 json-pack/index.js
 Copyright (c) 2017 hirowaki https://github.com/hirowaki
*/

const msgpack = require('msgpack5')();
const zlib = require('zlib');

class PackJson {
    // message packing.

    static packing2Buffer(json) {
        return msgpack.encode(json)
    }

    static unpackingFromBuffer(buffer) {
        return msgpack.decode(buffer)
    }

    static packing2String(json) {
        return this.packing2Buffer(json).toString('base64');
    }

    static unpackingFromString(str) {
        const buffer = new Buffer(str, 'base64');
        return this.unpackingFromBuffer(buffer);
    }

    // message zipping.
    static zipping2base64(json) {
        const str = JSON.stringify(json);

        return new Promise((resolve, reject) => {
            zlib.gzip(str, (err, binary) => {
                if (err) {
                    return reject(err);
                }
                return resolve(binary.toString('base64'));
            });
        });
    }

    // message zipping.
    static unzippingFromBase64(str) {
        const buffer = new Buffer(str, 'base64');

        return new Promise((resolve, reject) => {
            zlib.gunzip(buffer, (err, binary) => {
                if (err) {
                    return reject(err);
                }
                return resolve(JSON.parse(binary.toString()));
            });
        });
    }
}

module.exports = PackJson;
