# JsonSerialization
(node.js) JsonSerialization/Deserialization using `msgback5` and `node.zip`.

* node v4.
* ES6 coding style.
* using [msgpack5](https://www.npmjs.com/package/msgpack5)

setup
```
> git clone
> make install
```

test
```
> npm test
```

runnin benchmark
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
