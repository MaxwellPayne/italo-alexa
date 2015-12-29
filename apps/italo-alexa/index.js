'use strict';

var util  = require('util'),
    alexa = require('alexa-app'),
    _     = require('underscore'),
    ssml  = require('ssml'),
    songs = require('./songs');
var app   = new alexa.app('italo-alexa');

var APP_ID = '',
    APP_NAME = 'Italo Disco',
    DEFAULT_ARTIST = 'topo and roby';


app.launch(function(req, res) {
  // pass
});

app.intent('SingIntent', {
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
  var artist = req.slot('Artist').toLowerCase();
  console.log('Received request for artist: ' + artist);
  var mediaUrl = songs[DEFAULT_ARTIST].getMediaUrl();
  var reply;
  if (_.has(songs, artist)) {
    // play song if exists
    reply = util.format('Ok, %s coming right up.', artist);
    mediaUrl = songs[artist].getMediaUrl();
  } else {
    // play a default song
    reply = util.format('Fuck that. Let\'s just listen to %s instead.', DEFAULT_ARTIST);
  }

  res.say(reply).say(new ssml().break(200).audio(mediaUrl));
  res.card(APP_NAME, reply);
});

app.sessionEnded(function(req, res) {
  // pass
});

app.error = function(ex, req, res) {
  console.log('ERROR');
  console.log(ex);
  res.say('Oh no! Some sort of mysterious error occurred');
};

exports.handler = app.lambda();

exports.schema = function() {
  console.log(app.schema());
};

exports.utterances = function() {
  console.log(app.utterances());
};
