'use strict';

/**
 * A collection of scale modes
 * @type {{none: number, stretch: number, fit: number, fit_any: number}}
 */
var mode = {
  none: 0,
  stretch: 1,  // do not respect aspect ratio
  fit: 2,      // fit into the target bounds
  fit_any: 4   // fit any dimension into the target bounds
};

/**
 * Mode modifier
 * @type {{none: number, no_scale_up: number, detect_proportions: number}}
 */
var modifier = {
  none: 0,
  no_scale_up: 1,       // do not scale up
  detect_proportions: 2 // detect if the picture width & height are need to be swapped
};

/**
 * Calculates scale factors for image resizing
 * @param {number} originalWidth - the original bitmap width
 * @param {number} originalHeight - the original bitmap height
 * @param {number} desiredWidth - the desired width
 * @param {number} desiredHeight - the desired height
 * @param {object} scaleMode - a combination of mode values
 * @param {object} modeModifier - a combination of modifiers
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
    factorX = factorY = (1.0);
  }
  else if(scaleMode & mode.stretch) {
    factorX = desiredWidth / originalWidth;
    factorY = desiredHeight / originalHeight;
  }
  else if((scaleMode & mode.fit) || (scaleMode & mode.fit_any)) {
    if(modeModifier & modifier.detect_proportions) {
      var p1 = desiredWidth / desiredHeight;
      var p2 = originalWidth / originalHeight;

      // swap width & height
      if((p1 > 1.0 && p2 < 1.0) || (p1 < 1.0 && p2 > 1.0)) {
        var t = desiredWidth;
        desiredWidth = desiredHeight;
        desiredHeight = t;
      }
    }

    var k1 = desiredWidth / originalWidth;
    var k2 = desiredHeight / originalHeight;

    var k = ((scaleMode & mode.fit) ? Math.min(k1, k2) : Math.max(k1, k2));

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
