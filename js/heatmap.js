var margin = { top: 50, right: 0, bottom: 100, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,    
    days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    times = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];

var svg = d3.select("#heatmap").append("svg").attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "svg1")
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabels = svg.selectAll(".dayLabel").data(days).enter().append("text")
                .text(function(d){return d;})
                .attr("y", function(d,i){return i*gridSize;})
                .attr("x", 0).style("text-anchor", "end")
                .attr("transform", "translate(-6,"+gridSize/1.5+")")
                .attr("font-family", "helvetica");

var timeLabels = svg.selectAll(".timeLabel").data(times).enter()
                .append("text").text(function(d){return d;})
                .attr("x", function(d,i){return i*gridSize;})
                .attr("y", 0).style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("font-family", "helvetica");

var scale = d3.scale.linear().domain([0, 5]).range(["white", "blue"]);


var heatmapChart = function(file){
    d3.csv(file,
        function(d) {
          return {
            day: +d.day,
            hour: +d.hour,
            count: +d.count
          };
	},
    function(error, data){


	       var cards = svg.selectAll(".hour").data(data, function(d){return d.day+':'+d.hour;});
	       cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.hour) * gridSize; })
              .attr("y", function(d) { return (d.day ) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("width", gridSize)
		          .attr("height", gridSize)
              .style("fill", "white")
              .style("stroke-width",1)
              .style("stroke", '#fff')
              .append('text').text(function(d){return d.count;});
       
          cards.transition().duration(1000)
              .style("fill", function(d) { return scale(d.count); });
        
          cards.enter().append("text").attr("x", function(d) { return (d.hour -1) * gridSize+(gridSize/8); })
              .attr("y", function(d) { return (d.day - 1) * gridSize+(gridSize/1.5); });
      
         
          cards.exit().remove();	   

	   });
};


$(document).ready(function(){
  console.log($('#dropdown').val());
  heatmapChart($('#dropdown').val());
  $('#dropdown').change(function(){
    heatmapChart($('#dropdown').val());
  });
}); 
	 

																		       
