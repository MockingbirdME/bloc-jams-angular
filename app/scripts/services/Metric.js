(function(){
  function Metric($rootScope) {
    $rootScope.songPlays = [];

    return {
      registerSongPlay: function(songObj) {
        songObj['playedAt'] = new Date();
        $rootScope.songPlays.push(songObj);
console.log('Song play registered, current number of songs registered: ' + $rootScope.songPlays.length);
      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
          songs.push(song.title);
        });
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$rootScope', Metric]);
})();
