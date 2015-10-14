# scale-factor
> Calculate scale factors for image resizing

## Installation

installing with npm:
```bash
$ npm install scale-factor --save
```

## Usage:
To calculate scale factors:
```javascript
var sf = require('scale-factor');

var mode = sf.mode;
var modifier = sf.modifier;

var params = {
  // width & height of the source image
  originalWidth: 640,
  originalHeight: 480,
  
  // width & height of the target image
  desiredWidth: 240,
  desiredHeight: 320,
  
  // scale options
  scaleMode: mode.fit,
  modeModifier: modifier.detect_proportions
};

var factors = sf.calc(params); // { factorX: 0.5, factorY: 0.5 }
```


## API

### .scale(originalWidth, originalHeight, desiredWidth, desiredHeight, scaleMode, modeModifier)
or
### .scale(params)
`params` is an object with the following properties:
* originalWidth: `number`
* originalHeight: `number`
* desiredWidth: `number`
* desiredHeight: `number`
* scaleMode: `mode.none | mode.fit | mode.fit_any | mode.stretch`
* modeModifier: `modifier.none | modifier.no_scale_up | modifier.detect_proportions`

`scale`-function returns an object: `{ factorX: number, factorY: number }`


## Tests

To run the tests for _scale-factor_:
```bash
$ npm test
```

## Contact

[Grigoriy Chudnov] (mailto:g.chudnov@gmail.com)


## License

Distributed under the [The MIT License (MIT)](https://github.com/gchudnov/scale-factor/blob/master/LICENSE).
