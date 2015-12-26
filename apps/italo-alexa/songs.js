var _ = require('underscore');

function Song(artist, music) {
  this.artist = artist;
  this.music = music;
}

var songs = [
  new Song('topo and roby', 'bop boop bop beep'),
  new Song('taffy', 'I love my radio, my midnight radio')
];

module.exports = {};

_.forEach(songs, function(song) {
  module.exports[song.artist] = song;
});
