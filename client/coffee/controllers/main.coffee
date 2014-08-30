module.exports = ($scope) ->
  n = 20
  data =
    key: 'Temperature'
    values: (x: i, y: 0 for i in [0...n])
    color: 'orange'

  chart = nv.models.multiBarChart()
    .showControls false
    .showLegend false
    .tooltips false

  selection = d3.select '#barchart'
  selection
    .attr
      height: 500
    .datum [data]
    .call chart

  $scope.temperature = 0

  socket = io.connect '',
    path: '/diasroom-watcher/socket.io'
    transports: ['websocket']

  socket.on 'emit_from_server', (temperature) ->
    $scope.temperature = +temperature

    for i in [0...n - 1]
      data.values[i].y = data.values[i + 1].y
    data.values[n - 1].y = +temperature

    selection
      .call chart
    $scope.$apply()
    return

  return
