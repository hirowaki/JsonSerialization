'use strict';

const _ = require('lodash');
const sinon = require('sinon');
const assert = require('assert');
const PackJson = require('./../index');
const zlib = require('zlib');

describe('PackJson.', function () {
    let sandbox;

    before(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('Pack.', function () {
        it('packing2Buffer, unpackingFromBuffer.', function () {
            const testJson = {sentence: "Hello World"};

            const packed = PackJson.packing2Buffer(testJson);
            assert.ok(packed instanceof Buffer);

            const unpacked = PackJson.unpackingFromBuffer(packed);
            assert.deepEqual(unpacked, testJson);
        });

        it('packing2String, unpackingFromBuffer.', function () {
            const testJson = {sentence: "Hello World"};

            const packedString = PackJson.packing2String(testJson);
            assert.ok(_.isString(packedString));

            const unpackedString = PackJson.unpackingFromString(packedString);
            assert.deepEqual(unpackedString, testJson);
        });
    });

    describe('Zip.', function () {
        it('zipping2base64, unzippingFromBase64.', function () {
            const testJson = {sentence: "Hello World"};

            return PackJson.zipping2base64(testJson)
            .then((zipped) => {
                assert.ok(_.isString(zipped));

                return PackJson.unzippingFromBase64(zipped)
                .then((json) => {
                    assert.deepEqual(json, testJson);
                });
            });
        });

        it('zipping2base64 error handler.', function () {
            const spyZip = sandbox.stub(zlib, 'gzip', function (str, cb) {
                void(str);
                return cb(new Error("TEST ERROR"));
            });

            return PackJson.zipping2base64('SOURCE')
            .then(() => {
                assert.ok(false);   // zipping2base64 should not get resolved.
            })
            .catch((err) => {
                assert.ok(spyZip.calledOnce);
                assert.ok(spyZip.args[0][0], 'SOURCE');
                assert.strictEqual(err.message, "TEST ERROR");
            })
        });

        it('unzippingFromBase64 error handler.', function () {
            const spyUnzip = sandbox.stub(zlib, 'gunzip', function (str, cb) {
                void(str);
                return cb(new Error("TEST ERROR"));
            });

            return PackJson.unzippingFromBase64('SOURCE')
            .then(() => {
                assert.ok(false);   // zipping2base64 should not get resolved.
            })
            .catch((err) => {
                assert.ok(spyUnzip.calledOnce);
                assert.ok(spyUnzip.args[0][0], 'SOURCE');
                assert.strictEqual(err.message, "TEST ERROR");
            })
        });
    });
});

