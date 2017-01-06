# JsonSerialization
(node.js) pack/unpack json to string using `msgback5` and `node.zip`.

[![Build Status](https://travis-ci.org/hirowaki/json-pack.svg?branch=master)](https://travis-ci.org/hirowaki/json-pack)

* ES6. (using Promise.)
* using [msgpack5](https://www.npmjs.com/package/msgpack5)
* Tested in the node versions below.
  - "6.9.3"
  - "5.12.0"
  - "4.7.1"
  - "4.3.0"
  - "4.0"

* packing up json data to base64 string (magpacked).
```js
    static packing2String(json)
      => json => stringify => msgpacked => base64

    static unpackingFromString(str)
      => base64 => msgunpacked => parse => json
```

* packing up json data to base64 string (zipped).
```js
    !!! these functions will result Promise (async) !!!

    static packing2String(json)
      => json => stringify => Promise.resolve(zipped => base64)

    static unpackingFromString(str)
      => base64 => Promise.resolve(unzipped => parse => json)
```

setup
```
> git clone git@github.com:hirowaki/json-pack.git
> npm install
```

test
```
> npm test
```

run benchmark
```
> npm run bench
>
> result
> no packing. Json.stringify
>  size:  3758
> msgpack5.toString('base64')
>  size:  3200
> zipping.toString('base64')
>  size:  1450
```


