(function() {
  function Charts() {
    var Charts = {};
    var pieChartOptions = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLables: true,
        duration: 500,
        lableThreshold: 1.0,
        labelSunbeamLayout: true,
        showLegend: false,
        yAxis: {
          tickFormat: d3.format(',.0f')
        },
        valueFormat: d3.format('d')
      }
    };
    var historicalBarChartOptions = {
      chart: {
        type: 'historicalBarChart',
        height: 500,
        margin : {
          top: 20,
          right: 20,
          bottom: 65,
          left: 100
        },
        x: function(d){return d[0];},
        y: function(d){return d[1];},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.0f')(d);
        },
        duration: 100,
        xAxis: {
          axisLabel: 'Date',
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d))
          },
          rotateLabels: 30,
          showMaxMin: true
        },
        yAxis: {
          axisLabel: 'Plays',
          axisLabelDistance: -10,
          tickFormat: function(d){
              return d3.format(',.0f')(d);
          }
        },
        tooltip: {
          keyFormatter: function(d) {
              return d3.time.format('%x')(new Date(d));
          }
        },
        zoom: {
          enabled: false,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    };

    Charts.getPieChartOptions = function() {
      return pieChartOptions;
    }
    Charts.getHistoricChartOptions = function() {
      return historicalBarChartOptions;
    }

    return Charts;
  }

  angular
    .module('blocJams')
    .factory('Charts', Charts);
})();
