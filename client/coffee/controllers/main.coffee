module.exports = ($scope) ->
  n = 50
  data =
    key: 'Temperature'
    values: []
    color: 'orange'

  chart = nv.models.multiBarChart()
    .showControls false
    .showLegend false
    .tooltips false
    .x (d) -> d.datetime
    .y (d) -> d.temperature
    .yDomain [0, 50]
    .rotateLabels 45
    .reduceXTicks false
    .margin
      right: 80
      bottom: 80
  chart.xAxis
    .tickFormat d3.time.format '%Y/%m/%d %H:%M'

  selection = d3.select '#barchart'
    .attr
      height: 500
    .datum [data]
    .call chart

  $scope.temperature = 0

  socket = io.connect '',
    path: '/diasroom-watcher/socket.io'
    transports: ['websocket']

  socket.on 'update temperature', (temperature) ->
    $scope.temperature = +temperature.temperature
    $scope.$apply()
    return

  socket.on 'response minitely', (temperatures) ->
    temperatures.forEach (t) ->
      t.datetime = new Date(+t.datetime)
      return
    data.values = temperatures
    selection
      .call chart
    return

  socket.on 'update minitely temperature', ->
    socket.emit 'request minitely',
      n: n

  return
