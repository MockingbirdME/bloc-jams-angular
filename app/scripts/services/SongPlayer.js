(function() {
  function SongPlayer(Fixtures, Metric) {
    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();
/**
* @desc Buzz object audio file
* @type {Object}
*/
    var currentBuzzObject = null;
    var controllerScope = null;
/**
* @function playSong
* @desc plays currently set songs
*/
    var playSong = function() {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    };
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      if (controllerScope) {
        currentBuzzObject.bind('timeupdate', function() {
          controllerScope.$apply(function() {
            SongPlayer.currentTime = currentBuzzObject.getTime();
            if (SongPlayer.currentTime >= SongPlayer.currentSong.duration) {
              SongPlayer.next();
            }
          });
        });
      }

      SongPlayer.currentSong = song;
      Metric.registerSongPlay(song);
console.log(Metric.listSongsPlayed());
console.log(Metric.listSongsPlayedByDate());


    };

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

/**
* @desc Active song object from list of songs
* @type {object}
*/
    SongPlayer.currentSong = null;
    SongPlayer.currentTime = null;
    SongPlayer.volume = 50;
    SongPlayer.muted = false;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong();
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong();
        }
      }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong();
      }
    }

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      if (currentSongIndex > currentAlbum.songs.length -1) {
        currentSongIndex = 0;
      }
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong();
    }

    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
    };

    SongPlayer.muteToggle = function() {
      if (currentBuzzObject) {
        currentBuzzObject.toggleMute();
        if (SongPlayer.muted) {
          SongPlayer.muted = false;
        } else {
          SongPlayer.muted = true;
        }
      }
    }

    SongPlayer.registerScope = function(scope) {
      controllerScope = scope;
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', 'Metric', SongPlayer]);
})();
