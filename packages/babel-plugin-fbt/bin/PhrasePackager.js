/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 *
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p babel_plugin_fbt --local ~/www
 *
 * @emails oncall+internationalization
 * @format
 */

const {FbtType} = require('../FbtConstants');
const fbtHashKey = require('../fbtHashKey');
const jenkinsHash = require('../fbtJenkinsHash');
const mergePhrase = require('./mergePhrase');

/**
 * PhrasePackager differs from TextPackager in that it hashes the
 * entire payload for identfication
 */
class PhrasePackager {
  constructor(terse) {
    this._terse = terse;
  }

  pack(phrases) {
    return phrases.map(phrase => {
      const payload =
        phrase.type === FbtType.TABLE ? phrase.jsfbt.t : phrase.jsfbt;
      // Append hash keys to phrases for translation dictionary generation
      return mergePhrase(
        {
          hash_key: fbtHashKey(payload, phrase.desc),
          hash_code: jenkinsHash(payload, phrase.desc),
        },
        phrase,
        !this._terse,
      );
    });
  }
}
module.exports = PhrasePackager;
