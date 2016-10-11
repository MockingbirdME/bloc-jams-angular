(function(){
  function Metric($rootScope) {
    $rootScope.songPlays = [];

    function rawData(metricData) {
      var dataObject = {};
      for (var i=0; i < metricData.length; i++) {
        var dataKey = metricData[i];
        dataObject[dataKey] = dataObject[dataKey] ? dataObject[dataKey]+1 : 1;
      }
      return dataObject;
    }

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
      },
      listSongsPlayedByDate: function() {
        var dates = [];
        angular.forEach($rootScope.songPlays, function(song) {
          dates.push((Math.floor(song.playedAt.getTime()/86400000)*86400000) +18000000);
        });
        return dates;
      },
      pieChartData: function(metricData) {
        var data = rawData(metricData);
        var organizedData = [];
        for(var key in data) {
          var dataPoint = {key: 0, y: 0};
          dataPoint["key"] = key;
          dataPoint["y"] = data[key];
          organizedData.push(dataPoint);
        }
        return organizedData;
      },
      dataForHistoricalBarChart: function(metricData) {
        console.log(metricData);
        var data = rawData(metricData);
        var organizedData = [];
        for (var key in data) {
          var dataPointArray = [];
          dataPointArray.push(parseInt(key));
          dataPointArray.push(data[key]);
          organizedData.push(dataPointArray);
          console.log(dataPointArray);
          console.log(organizedData);
        }
        while (organizedData.length != 0 && organizedData.length < 7){
          organizedData.unshift([organizedData[0][0]-86400000, 0]);
        }
        return [{ "key" : "Quantity", "bar" : true, "values" : organizedData }];
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$rootScope', Metric]);
})();
