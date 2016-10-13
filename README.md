# JsonSerialization
(node.js) JsonSerialization/Deserialization using `msgback5` and `node.zip`.

* node v4.
* ES6 coding style.
* using [msgpack5](https://www.npmjs.com/package/msgpack5)

* packing up json data to base64 string (magpacked).
```js
    static packing2String(json)
      => json => stringify => msgpacked => base64
    static unpackingFromString(str)
      => base64 => msgunpacked => parse => json
```

* packing up json data to base64 string (zipped).
```
    !!! these functions will result Promise (async) !!!

    static packing2String(json)
      => json => stringify => Promise.resolve(zipped => base64)
    static unpackingFromString(str)
      => base64 => Promise.resolve(unzipped => parse => json)
```

setup
```
> git clone
> make install
```

test
```
> npm test
```

run benchmark
```js
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


