(function () {
  function AnalyticsCtrl(Metric) {
    this.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLables: true,
        duration: 500,
        lableThreshold: 1,
        labelSunbeamLayout: true,
        showLegend: false,
      }
    };

    var songPlayedFromMetrics = Metric.listSongsPlayed();
//    var songPlayedFromMetrics = ["blue", "blue", "green", "red", "blue"];
    var songPlayedData = {};
    for (var i=0;i < songPlayedFromMetrics.length; i++) {
      var songName = songPlayedFromMetrics[i];
      songPlayedData[songName] = songPlayedData[songName] ? songPlayedData[songName]+1 : 1;
    }
    var songPlayedDataForChart = [];
    for(var key in songPlayedData){
      var dataPoint = {key: 0, y: 0};
      dataPoint["key"] = key;
      dataPoint["y"] = songPlayedData[key];
      songPlayedDataForChart.push(dataPoint);
    }
    this.data = songPlayedDataForChart;
  }

  angular
    .module('blocJams')
    .controller('AnalyticsCtrl', ['Metric', AnalyticsCtrl]);
})();
