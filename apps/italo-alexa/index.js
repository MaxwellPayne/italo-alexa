'use strict';

var alexa = require('alexa-app'),
    _     = require('underscore'),
    songs = require('./songs');
var app   = new alexa.app('italo-alexa');

var APP_ID = '',
    APP_NAME = 'Italo Disco',
    DEFAULT_ARTIST = 'topo and roby';


app.launch(function(req, res) {
  // pass
});

app.intent('TestIntent', {
  'slots': {
    'Artist': 'ITALO_ARTIST'
  },
  'slot_types': [
    {
      'name': 'Artist',
      'values': _.keys(songs)
    }
  ],
  'utterances': [
    '{sing|play} {-|Artist}'
  ]
}, function(req, res) {
  var artist = req.slot('Artist');
  var reply;
  if (_.has(songs, artist)) {
    // play song if exists
    reply = songs[artist].music;
  } else {
    // play a default song
    reply = 'Let\'s just listen to ' + 
      songs[DEFAULT_ARTIST].music + ' instead';
  }

  res.say(reply);
  res.card(APP_NAME, reply);
});

app.sessionEnded(function(req, res) {
  // pass
});

app.error = function(ex, req, res) {
  res.say('Oh no! Some sort of mysterious error occurred');
};

exports.handler = app.lambda();

exports.schema = function() {
  console.log(app.schema());
};

exports.utterances = function() {
  console.log(app.utterances());
};
