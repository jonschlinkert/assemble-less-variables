'use strict';

var grunt = require('grunt');

exports.variables = {
  bootstrap: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/bootstrap.less');
    var result = grunt.file.read('tmp/bootstrap.less');
    test.equal(expect, result, 'Should inline variables task options.');

    test.done();
  },
  with_banner: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/main.less');
    var result = grunt.file.read('tmp/main.less');
    test.equal(expect, result, 'Should inline variables from external JSON file and prefix banner.');

    test.done();
  },
  overrides: function(test) {
    test.expect(1);

    var expect = grunt.file.read('test/expected/overrides.less');
    var result = grunt.file.read('tmp/overrides.less');
    test.equal(expect, result, 'Should inline variables from external JSON file, prefix banner and list file overrides.');

    test.done();
  }
};