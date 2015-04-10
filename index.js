/**
 * A collection of scale modes
 * @type {{none: number, stretch: number, fit: number, no_scale_up: number, detect_proportions: number, fit_no_scale_up: number}}
 */
var mode = {
  none: 0,
  stretch: 1,
  fit: 2
};

/**
 * Mode modifier
 * @type {{none: number, no_scale_up: number, detect_proportions: number}}
 */
var modifier = {
  none: 0,
  no_scale_up: 1,
  detect_proportions: 2 // detect if the picture width & height are need to be swapped
};

/**
 * Calculates aspect rations for image scaling
 * @param originalWidth - the original bitmap width
 * @param originalHeight - the original bitmap height
 * @param desiredWidth - the desired width
 * @param desiredHeight - the desired height
 * @param scaleMode - a combination of mode values
 * @param modeModifier - a combination of modifiers
 * @returns {{factorX: number, factorY: number}}
 */
function makeScaleTransform2(originalWidth, originalHeight, desiredWidth, desiredHeight, scaleMode, modeModifier) {
  if(typeof originalWidth === 'object') {
    var params = originalWidth;
    originalWidth = params.originalWidth;
    originalHeight = params.originalHeight;
    desiredWidth = params.desiredWidth;
    desiredHeight = params.desiredHeight;
    scaleMode = params.scaleMode;
    modeModifier = params.modeModifier || 0;
  }

  var factorX = 1;
  var factorY = 1;

  if(scaleMode & mode.none) {
    // NONE
    factorX = factorY = (1.0);
  }
  else if(scaleMode & mode.stretch) {
    // STRETCH
    factorX = desiredWidth / originalWidth;
    factorY = desiredHeight / originalHeight;
  }
  else if(scaleMode & mode.fit) {
    // FIT
    if(modeModifier & modifier.detect_proportions) {
      var p1 = desiredWidth / desiredHeight;
      var p2 = originalWidth / originalHeight;

      // swap width & height
      if((p1 > (1.0) && p2 < (1.0)) || (p1 < (1.0) && p2 > (1.0))) {
        var t = desiredWidth;
        desiredWidth = desiredHeight;
        desiredHeight = t;
      }
    }

    var k1 = desiredWidth / originalWidth;
    var k2 = desiredHeight / originalHeight;

    var k = Math.min(k1, k2);

    // If we don't want the image to be scaled more than its original size, include the special coefficient check
    if(modeModifier & modifier.no_scale_up) {
      if(k > 1.0)
        k = 1.0; // do not scale up small images at all.
    }

    factorX = factorY = k;
  }

  return { factorX: factorX, factorY: factorY };
}


module.exports.calc = makeScaleTransform2;
module.exports.mode = mode;
module.exports.modifier = modifier;

