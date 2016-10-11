(function () {
  function AnalyticsCtrl(Charts, Metric) {

    this.pieChartOptions = Charts.getPieChartOptions();
    this.historicalBarChartOptions = Charts.getHistoricChartOptions();
    this.pieData = Metric.pieChartData(Metric.listSongsPlayed());
    this.historicalBarChartData = Metric.dataForHistoricalBarChart(Metric.listSongsPlayedByDate());

  }

  angular
    .module('blocJams')
    .controller('AnalyticsCtrl', ['Charts', 'Metric', AnalyticsCtrl]);
})();
