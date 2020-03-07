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
    y: data.map(row => row.Kelce),
    name: "Kelce",
    type: "scatter",
    marker: {
      color: 'black',
      size: 12,
      opacity: 0.7
    }
  };

  var trace4 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Hill),
    name: "Hill",
    type: "scatter",
    marker: {
      color: 'purple',
      size: 12,
      opacity: 0.7
    }
  };

  var trace5 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Damien),
    name: "Damien",
    type: "scatter",
    marker: {
      color: 'green',
      size: 12,
      opacity: 0.7
    }
  };

  var trace6 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.McCoy),
    name: "McCoy",
    type: "scatter",
    marker: {
      color: 'light-blue',
      size: 12,
      opacity: 0.7
    }
  };

  var trace7 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Darrel),
    name: "Darrel",
    type: "scatter",
    marker: {
      color: 'grey',
      size: 12,
      opacity: 0.7
    }
  };

    
    // Create data object
    var data = [trace1, trace3, trace4, trace5, trace6, trace7];
    
    // Create layout object
    var layout = {
      title: "Chiefs Yards Per Week by Win/Loss",
    };
    
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
    
    });