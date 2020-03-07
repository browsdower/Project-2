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
    name: "Rush",
    type: "bar",
    marker: {
      color: 'red'
    }
  };

  // Trace 2 for the Pass Data
  var trace2 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Pass),
    name: "Pass",
    type: "bar",
    marker: {
      color: 'gold'
    }
  };

  // Combining both traces
  var data = [trace1, trace2];

  // Apply the stack barmode to the layout
  var layout = {
    title: "Chiefs Pass vs Rush Yards Per Week",
    barmode: "stack"
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);

  });

}

// Run init to create initial chart
init()

