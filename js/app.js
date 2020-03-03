// creating weekly receiving yards chart
​
var svgWidth = 960;
var svgHeight = 500;
​
var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};
​
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
​
// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
​
// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
​
// initial params, following hair metal app.js
// this will need to be chosen Y axis but just leaving as is for time being
var chosenYAxis = "yards_gained";
​
// function used for updating x-scale var upon click on axis label
function yScale(chiefsData, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
        //chosenYaxis is a column in the data
    .domain([d3.min(chiefsData, d => d[chosenYAxis]) * 0.8,
      d3.max(chiefsData, d => d[chosenYAxis]) * 1.2
    ])
    .range([0, width]);
​
  return yLinearScale;
​
}
​
// function used for updating xAxis var upon click on axis label
// will need to be updated to y axis and new y scale
function renderAxes(newYScale, yAxis) {
    var bottomAxis = d3.axisBottom(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return yAxis;
  }
  
  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newYScale, chosenYAxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }
  
  // function used for updating circles group with new tooltip
  function updateToolTip(chosenYAxis, circlesGroup) {
  
    if (chosenYAxis === "yardage") {
      var label = "Receiving Yards:";
    }
    else {
      var label = "Targets:";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
          // this will need to be a different return for rushing chart
        return (`${d.receiving_player_name}<br>${label} ${d[chosenYAxis]}`);
      });
  
    circlesGroup.call(toolTip);
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }
  
​
​
  // load data from json 
d3.json("json-file-here").then(function(chiefsData, err) {
    if (err) throw err;
​
    // print chiefs data
    chiefsData.forEach(function(data) {
        data.column_name = +data.column_name;
    });
  // yLinearScale function above csv import
  var yLinearScale = xScale(hairData, chosenYAxis);
​
  // Create x scale function, this will be for the week played. 1-17, skipping week 12 bc bye week
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(hairData, d => d.week)])
    .range([height, 0]);
​
  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
​
  // append x axis
  var xaxis = chartGroup.append("g")
    .classed("x-axis", true)
​
  // append y axis with transform and translate
  chartGroup.append("g")
    .call(leftAxis)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
​
  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(hairData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("cx", d => xLinearScale(d.week))
    // potentially changing the radius to be larger based on targets
    .attr("r", 15)
    // we ideally want to change the number inside each circle to match the player. will need help with this
    // maybe in separate function? 
    .attr("fill", "pink")
    .attr("opacity", ".5");
​
  // Create group for  2 y- axis labels
  // will this need .attr("transform", "rotate(-90)")? probably different width and height as well?
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");
​
// the code commented out above came from hair metal activity original code for a static y axis label. storing just in case 
  var labelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");
​
    // we can use this same label for rushers as yards are held in same column 
  var yardsLabel = labelsGroup.append("text")
    .attr("x", 0 - (height / 2))
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .attr("value", "yards_gained") // value to grab for event listener
    .classed("active", true)
    .text("Receiving Yards");
    
  // for rushers, we will use attemptsLabel
  var targetsLabel = labelsGroup.append("text")
  // i have not tested out if this height for x will work. 
    .attr("x", 0 - (height / 2.5))
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .attr("value", "targets") // value to grab for event listener, as defined via calculations
    .classed("inactive", true)
    .text("# of Targets");
​
  // append x axis
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)
    .attr("y", 20)
    .attr("x", 0)
    .classed("axis-text", true)
    .text("Week Played");
​
  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
​
  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {
​
        // replaces chosenYAxis with value
        chosenYAxis = value;
​
        // console.log(chosenYAxis)
​
        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(hairData, chosenYAxis);
​
        // updates y axis with transition
        yaxis = renderAxes(yLinearScale, yaxis);
​
        // updates circles with new y values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);
​
        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
​
        // changes classes to change bold text
        if (chosenYAxis === "yards_gained") {
          yardsLabel
            .classed("active", true)
            .classed("inactive", false);
          targetsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          yardsLabel
            .classed("active", false)
            .classed("inactive", true);
          targetsLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});
