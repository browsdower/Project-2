d3.csv("yards.csv").then(function(data) {

    // Print out data for review
    console.log(data)
    
    // Trace1 for the Yards Data
    var trace1 = {
      x: data.map(row => row.Week),
      y: data.map(row => row.Yards),
      name: "Yards",
      type: "bar",
      marker: {
        color: data.map(row => row.Color)
      }
    };

    // traces for Player Data
  var trace3 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Run),
    name: "Rush Yards",
    type: "scatter",
    marker: {
      color: 'black',
      size: 12,
      opacity: 0.7
    }
  };

    
    // Create data object
    var data = [trace1, trace3];
    
    // Create layout object
    var layout = {
      title: "Chiefs Yards Per Week by Win/Loss",
      xaxis: { title: "Week Played (Red = Loss)" },
      yaxis: { title: "Total Yards Gained" }
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot3", data, layout);
    
    });