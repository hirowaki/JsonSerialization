'use strict';
/*eslint-disable no-console*/

const PackJson = require('./../index');
const testJson = require('./SampleJson.json');

function _benchMark() {
    return Promise.resolve()
    .then(() => {
        console.log("no packing. Json.stringify");
        const stringify = JSON.stringify(testJson);
        console.log(" size: ", encodeURIComponent(stringify).length);

        console.log("msgpack5.toString('base64')");
        const packed = PackJson.packing2String(testJson);
        console.log(" size: ", encodeURIComponent(packed).length);

        console.log("zipping.toString('base64')");
        return PackJson.zipping2base64(testJson)
        .then((zipped) => {
            console.log(" size: ", encodeURIComponent(zipped).length);
            return PackJson.unzippingFromBase64(zipped)
            .then((json) => {
            })
        });
    });
}

function benchMark() {
    return _benchMark();
}

benchMark();

/*eslint-enable no-console*/
