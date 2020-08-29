var datasetOTU;

function init(){
    d3.json("samples.json").then((data) => {
        datasetOTU = data;
        showOTUChart(940, datasetOTU);
        showBubbleChart(940, datasetOTU);
        showDemogData(940,datasetOTU);

        // Configure dropdown list
        var OTUDropDown = d3.select("#selDataset");

        datasetOTU.names.forEach(function(name){
            OTUDropDown.append("option").text(name);
        });        
    });
}

function showOTUChart(otuID, dataset){
    var selectedIDdata = dataset.samples.filter(function(d) { return d.id == otuID })
    var sample_values  = selectedIDdata[0].sample_values.slice(0,10);
    var otu_ids = selectedIDdata[0].otu_ids.slice(0,10);
    var otu_labels = selectedIDdata[0].otu_labels.slice(0,10);        

    var updatedOtuID = [];
    otu_ids.forEach(element => {
        updatedOtuID.push(`OTU ${element}`);
    });

    var trace1 = {
        x: sample_values.reverse(),
        y: updatedOtuID.reverse(),        
        text: otu_labels.reverse(),
        type: "bar",
        orientation: "h"
      };
    
    var data = [trace1];
    Plotly.newPlot("bar", data);
}

function showBubbleChart(otuID, dataset){
    var selectedIDdata = dataset.samples.filter(function(d) { return d.id == otuID });
    var x = selectedIDdata.map(row => row.otu_ids)
    var y = selectedIDdata.map(row => row.sample_values)
    var text = selectedIDdata.map(row => row.otu_labels)
    var color = selectedIDdata.map(row => row.otu_ids)
    var size = selectedIDdata.map(row => row.sample_values)

    var trace1 = {
        x: x[0],
        y: y[0],
        mode: 'markers',
        marker: {
          color: color[0],
          size: size[0]
        },
        text: text[0]
      };
      
      var data = [trace1];
      
      var layout = {
        title: `Test Subject ID ${otuID}`
      };
      
      Plotly.newPlot('bubble', data, layout);
}

function showDemogData(otuID, dataset){
    var selectedIDdata = dataset.metadata.filter(function(d) { return d.id == otuID });
    var divDemog = d3.select("#sample-metadata");
    var innerStr = '<b>';
    for (const [key, value] of Object.entries(selectedIDdata[0])) {
        innerStr = innerStr + `${key}: ${value} <BR>`;
    }
    innerStr = innerStr + '</b>';
    console.log(innerStr);
    divDemog.html(innerStr);
}

function optionChanged(selection){
    showOTUChart(selection, datasetOTU);
    showBubbleChart(selection, datasetOTU);
    showDemogData(selection,datasetOTU);
}

init();

