'use strict';

var should = require('should');
var lib = require('../index');

var mode = lib.mode;
var modifier = lib.modifier;

describe('scale factor', function() {

  it('it can be calculated for mode.none', function() {
    var params = {
      originalWidth: 640,
      originalHeight: 480,
      desiredWidth: 320,
      desiredHeight: 240,
      scaleMode: mode.none
    };

    var factors = lib.calc(params);
    factors.factorX.should.be.approximately(1, 0.001);
    factors.factorY.should.be.approximately(1, 0.001);
  });

  it('it can be calculated for mode.stretch', function() {
    var params = {
      originalWidth: 640,
      originalHeight: 480,
      desiredWidth: 320,
      desiredHeight: 240,
      scaleMode: mode.stretch
    };

    var factors = lib.calc(params);
    factors.factorX.should.be.approximately(0.5, 0.001);
    factors.factorY.should.be.approximately(0.5, 0.001);
  });

  it('it can be calculated for mode.fit', function() {
    var params = {
      originalWidth: 640,
      originalHeight: 480,
      desiredWidth: 320,
      desiredHeight: 240,
      scaleMode: mode.fit
    };

    var factors = lib.calc(params);
    factors.factorX.should.be.approximately(0.5, 0.001);
    factors.factorY.should.be.approximately(0.5, 0.001);
  });

  it('it can be calculated for mode.fit + modifier.no_scale_up', function() {
    var params = {
      originalWidth: 320,
      originalHeight: 240,
      desiredWidth: 640,
      desiredHeight: 480,
      scaleMode: mode.fit,
      modeModifier: modifier.no_scale_up
    };

    var factors = lib.calc(params);
    factors.factorX.should.be.approximately(1.0, 0.001);
    factors.factorY.should.be.approximately(1.0, 0.001);
  });

  it('it can be calculated for mode.fit + modifier.detect_proportions', function() {
    var params = {
      originalWidth: 640,
      originalHeight: 480,
      desiredWidth: 240,
      desiredHeight: 320,
      scaleMode: mode.fit,
      modeModifier: modifier.detect_proportions
    };

    var factors = lib.calc(params);
    factors.factorX.should.be.approximately(0.5, 0.001);
    factors.factorY.should.be.approximately(0.5, 0.001);
  });

  it('it can be calculated for mode.fit + modifier.no_scale_up + modifier.detect_proportions', function() {
    var params = {
      originalWidth: 640,
      originalHeight: 480,
      desiredWidth: 240,
      desiredHeight: 320,
      scaleMode: mode.fit,
      modeModifier: modifier.no_scale_up | modifier.detect_proportions
    };

    var factors = lib.calc(params);
    factors.factorX.should.be.approximately(0.5, 0.001);
    factors.factorY.should.be.approximately(0.5, 0.001);
  });

});
