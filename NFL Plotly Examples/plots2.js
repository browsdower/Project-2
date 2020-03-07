// Read in csv summarized table, but coudl also be a d3.json() api call
d3.csv("yards.csv").then(function(data) {

// Print out data for review
console.log(data)
score = data.map(row => row.Score);
// Trace1 for the Yards Data
var trace1 = {
  x: data.map(row => row.Week),
  y: data.map(row => row.Yards),
  name: "Total Yards",
  type: "bar", 
  marker: {
    color: data.map(row => row.Color)
  }
};

var trace2 = {
  x: data.map(row => row.Week),
  y: data.map(row => row.Score),
  name: "Points Scored",
  mode: "markers",
  marker: {
    color: "blue",
    opacity: 0
  }
}

// Create data object
var data = [trace1, trace2];

// Create layout object
var layout = {
  title: "Chiefs Yards Per Week by Win/Loss",
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

});