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
  new Song('Topo and Roby', 'Under the Ice'),
  new Song('Taffy', 'Midnight Radio')
];

module.exports = {};

_.forEach(songs, function(song) {
  module.exports[song.artist] = song;
});
