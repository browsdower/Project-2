// // Use D3 to create an event handler
// d3.selectAll("body").on("change", updatePlotly);

// function updatePlotly() {
//   d3.csv("yards.csv").then(function(data) {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selOption");
//   // Assign the value of the dropdown menu option to a variable
//   var chosenPlayer = dropdownMenu.property("value");
//   console.log(chosenPlayer)
//   var player = data.map(row => row.chosenPlayer)
//   // var playerName = dropdownMenu.property("text")

//   // Update the output
//   var trace1 = {
//     x: data.map(row => row.Week),
//     y: player,
//     // text: playerName,
//     type: "scatter",
//     marker: {
//       color: 'red',
//       size: 26,
//       opacity: 1.0
//     }
//   };
//   var data = [trace1]
//   var layout = {
//   title: "Yardage Per Week",
//   xaxis: { title: "Week" },
//   yaxis: { title: "Total Yards"}
// }

//    Plotly.newPlot("plot", data, layout)
//   })
// }


function init(){ 
  // Read in csv summarized table, but coudl also be a d3.json() api call
  d3.csv("yards.csv").then(function(data) {

  // Print out data for review
  console.log(data)

var trace1 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Hill),
    text: "Tyreek Hill",
    name: "Tyreek Hill",
    type: "markers",
    marker: {
      color: 'red',
      size: 20,
      opacity: 0.5
    }
  };
  var trace2 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Kelce),
    text: "Travis Kelce",
    name: "Travis Kelce",
    type: "markers",
    marker: {
      color: 'black',
      size: 20,
      opacity: 0.5
    }
  };

  var trace3 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Damien),
    name: "Damien Williams",
    text: "Damien Williams",
    type: "markers",
    marker: {
      color: 'green',
      size: 20,
      opacity: 0.5
    }
  };

  var trace4 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.McCoy),
    name: "LeSean McCoy",
    text: "LeSean McCoy",
    mode: "mar",
    marker: {
      color: 'orange',
      size: 20,
      opacity: 0.5
    }
  };

  var trace5 = {
    x: data.map(row => row.Week),
    y: data.map(row => row.Darrel),
    name: "Darrel Williams",
    text: "Darrel Williams",
    mode: "mar",
    marker: {
      color: 'yellow',
      size: 20,
      opacity: 0.5
    }
  };

//creating variable for data
var data = [trace1, trace2, trace3, trace4, trace5];

// apply layout for chart
var layout = {
  title: "Yardage Per Week",
  xaxis: { title: "Week Played" },
  yaxis: { title: "Total Yards"}
}

// render plot with id "plot"
Plotly.newPlot("plot", data, layout);

  })
}

// Run init to create initial chart
init()
