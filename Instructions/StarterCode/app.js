function metadata (sample) {
    d3.json ("samples.json").then((data)=>{
        var metadata = data.metadata; 
        var array = metadata.filter(object=> object.id==sample);
        var result = array[0];
        var display = d3.select("#sample-metadata");
        display.html ("");
        Object.entries(result).forEach(([key,value])=>{
            display.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
function createchart(sample){
    d3.json ("samples.json").then((data)=>{
        var samples = data.samples;
        var array = samples.filter(object=> object.id==sample);
        var results = array[0];
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var sample_values = results.sample_values;
        var bar_data = [{
            y:otu_ids.map(otuID => `OTU ${otuID}`).slice(0,10).reverse(),
            x:sample_values.slice(0,10).reverse(),
            type:"bar",
            orientation: "h"
        }
        ];
        Plotly.newPlot("bar",bar_data)
});
}
function init() {
    var display2 = d3.select("#selDataset");
    d3.json ("samples.json").then((data)=>{
        var names = data.names; 
        names.forEach((sample)=>{
            display2.append("option").text(sample).property("value",sample);
        });
        var sample1 = names[0];
        metadata(sample1)
        createchart (sample1)
});
}
init()

function optionChanged (newsample){
    metadata(newsample)
    createchart (newsample)
}