// Use D3 to create an event handler
d3.selectAll("body").on("change", updatePlotly);

function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selOption");
  // Assign the value of the dropdown menu option to a variable
  var mode = dropdownMenu.property("value");
  // Update the layout feature 'barmode' based on selection
  Plotly.relayout("plot", "barmode", mode);

}

// Create initialization script to create default stacked chart
function init(){ 
  // Read in csv summarized table, but coudl also be a d3.json() api call
  d3.csv("yards.csv").then(function(data) {

  // Print out data for review
  console.log(data)

  // Trace1 for the Rush Data
  var trace1 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Run),
    name: "Rush Yards",
    type: "bar",
    marker: {
      color: 'red'
    }
  };

  // Trace 2 for the Pass Data
  var trace2 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Pass),
    name: "Pass Yards",
    type: "bar",
    marker: {
      color: 'gold'
    }
  };

  // traces for Player Data
  var trace3 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Kelce),
    name: "Travis Kelce",
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
    name: "Tyreek Hill",
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
    name: "Damien Williams",
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
    name: "LeSean McCoy",
    type: "scatter",
    marker: {
      color: 'orange',
      size: 12,
      opacity: 0.7
    }
  };

  var trace7 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Darrel),
    name: "Darrel Williams",
    type: "scatter",
    marker: {
      color: 'blue',
      size: 12,
      opacity: 0.7
    }
  };




  // Combining both traces
  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

  // Apply the stack barmode to the layout
  var layout = {
    title: "Chiefs Pass vs Rush Yards Per Week",
    xaxis: { title: "Week Played" },
    yaxis: { title: "Total Yards" },
    barmode: "stack"
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);

  });

}

// Run init to create initial chart
init()

