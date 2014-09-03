'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

/**
 * Initialize Mocha generator
 *
 * @param {String|Array} args
 * @param {Object} options
 * @api public
 */
var MochaGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('ui', {
      desc: 'Choose your style of DSL (bdd, tdd)',
      type: String,
      defaults: 'bdd'
    });

    this.option('skip-install', {
      desc: 'Skip the bower and node installations',
      defaults: false
    });
  },

  prompting: function () {
    var cb = this.async();

    var prompts = [];
    var dslPrompt = {
      type: 'list',
      name: 'ui',
      message: 'Choose your style of DSL (bdd, tdd)',
      choices: [{
        name: 'BDD',
        value: 'bdd',
      }, {
        name: 'TDD',
        value: 'tdd',
      }]
    };

    if (!this.options.ui) {
      prompts.push(dslPrompt);
    }

    this.prompt(prompts, function (answers) {
      this.env.options.ui = answers.ui;

      cb();
    }.bind(this));

    this.config.set('ui', this.env.options.ui);
  },

  configuring: function () {
    this.config.save();
  },

  /**
   * Setup environment
   *
   * @api public
   */
  writing: {
    setupEnv: function () {
      this.log(this.env.options.ui)
      this.template('_bower.json', 'test/bower.json');
      this.template('bowerrc', 'test/.bowerrc');
      this.template('test.js', 'test/spec/test.js');
      this.template('index.html', 'test/index.html');
    },
  },

  /**
   * Install dependencies
   *
   * @api public
   */
  install: {
    aaa: function () {
      if (this.options['skip-install']) {
        return;
      }

      var done = this.async();
      process.chdir('test');

      this.installDependencies({
        skipInstall: this.options['skip-install'],
        skipMessage: this.options['skip-message'],
        callback: done
      });
    }
  }
});

/**
 * Module exports
 */

module.exports = MochaGenerator;
