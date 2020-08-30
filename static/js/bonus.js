function showGuage(washIndex){
  var data = [
      {
          domain: { x: [0, 1], y: [0, 1] },
          value: washIndex,
          title: { text: "<b>Belly Button Washing Frequency</b><BR>Scrubs per week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: { axis: { visible: false, range: [0, 10] },
                  steps: [
                      { range: [0, 1], color: "#f7ffe6" },
                      { range: [1, 2], color: "#eeffcc" },
                      { range: [2, 3], color: "#e6ffb3" },
                      { range: [3, 4], color: "#ddff99" },
                      { range: [4, 5], color: "#d5ff80" },
                      { range: [5, 6], color: "#ccff66" },
                      { range: [6, 7], color: "#c4ff4d" },
                      { range: [7, 8], color: "#bbff33" },
                      { range: [8, 9], color: "#b3ff1a" },
                      { range: [9, 10], color: "#aaff00" }
                  ]}
      }
  ];
  
  Plotly.newPlot('gauge', data);   
}