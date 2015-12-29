var util = require('util'),
    _ = require('underscore'),
    Q = require('q'),
    config = require('./config');

function Song(artist, songName) {
  this.artist = artist.toLowerCase();
  this.songName = songName.toLowerCase();
}

Song.prototype.getMediaUrl = function() {
  var foldername = this.artist.replace(/ /g, '-');
  var filename = this.songName.replace(/ /g, '-');

  return util.format('%s/%s/%s.mp3', config.audio_root, foldername, filename);
};

Song.prototype.download = function() {
  return Q.fcall(function() {
    throw new Error('Not implemented');
  });
};

var songs = [
  new Song('Eddy Huntington', 'U.S.S.R'),
  new Song('Gary Low', 'You are a Danger'),
  new Song('Joe Yellow', 'Take my Heart'),
  new Song('Martinelli', 'Voices in the Night'),
  new Song('P Lion', 'Happy Children'),
  new Song('Raf', 'Self Control'),
  new Song('Raggio di Luna', 'Comanchero'),
  new Song('Taffy', 'Midnight Radio'),
  new Song('Tom Hooker', 'Looking for Love'),
  new Song('Topo and Roby', 'Under the Ice')
];

module.exports = {};

_.forEach(songs, function(song) {
  module.exports[song.artist] = song;
});
