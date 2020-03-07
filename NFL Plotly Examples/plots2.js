// Read in csv summarized table, but coudl also be a d3.json() api call
d3.csv("yards.csv").then(function(data) {

// Print out data for review
console.log(data)

// Trace1 for the Yards Data
var trace1 = {
  x: data.map(row => row.Week),
  y: data.map(row => row.Yards),
  name: "Rush",
  type: "bar",
  marker: {
    color: data.map(row => row.Color)
  }
};

// Create data object
var data = [trace1];

// Create layout object
var layout = {
  title: "Chiefs Yards Per Week by Win/Loss",
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

});