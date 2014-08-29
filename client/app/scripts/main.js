console.log("hello");

$(function(){
  var socket = io.connect("", {
    path: "/diasroom-watcher/socket.io",
      transports: ['websocket']
  });

  var dataset =[];
  for(var i = 0; i < 20; i++){
    dataset.push({
      frequency:0,
      letter:"NULL"+i
    });
  }
  var dataNum = 0;
  graph(dataset);
  socket.on('emit_from_server',function(data){
    d3.select('svg').remove();
    console.log(data);
    var DD = new Date();
    dataset.shift();
    dataset.push({
      frequency: data,
      letter:  dataNum+":"+DD.getHours() +"h"
    });
    dataNum++;
    graph(dataset);
    tempText(data);
    //svg.selectAll('.bar').data(dataset);
  });

  var tempText = function(data){
    d3.select("h1").text("now temp is " +data+" C");
  };

  function graph(data){

    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format("02d");

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(formatPercent);

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>temperature:</strong> <span style='color:red'>" + d.frequency + "</span>";
      });

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    console.log(height);
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, 50]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("temperature");

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  }

});
