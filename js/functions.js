var options = {

    //Boolean - If we show the scale above the chart data
    scaleOverlay: false,

    //Boolean - If we want to override with a hard coded scale
    scaleOverride: true,

    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 30,
    //Number - The value jump in the hard coded scale
    scaleStepWidth: 1,
    //Number - The scale starting value
    scaleStartValue: 1,

    //String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    //Number - Pixel width of the scale line
    scaleLineWidth: 1,

    //Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    //Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    //String - Scale label font declaration for the scale label
    scaleFontFamily: "'Arial'",

    //Number - Scale label font size in pixels
    scaleFontSize: 12,

    //String - Scale label font weight style
    scaleFontStyle: "normal",

    //String - Scale label font colour
    scaleFontColor: "#666",

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether the line is curved between points
    bezierCurve: false,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 3,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: false,

    //Boolean - Whether to animate the chart
    animation: false,

    //Number - Number of animation steps
    animationSteps: 2,

    //String - Animation easing effect
    animationEasing: "easeOutQuart",

    //Function - Fires when the animation is complete
    onAnimationComplete: null

}


function starten() {
    loadData();
}

function loadData2(requestData, dataArray, labelArray) {
    if (requestData.length > 0) {
        $.getJSON(requestData[0][1],
            function (data) {
                var dataArrayNeu = dataArray.concat([data.rows.length]);
                var labelArrayNeu = labelArray.concat([requestData[0][0]]);
                loadData2(requestData.splice(1, requestData.length - 1), dataArrayNeu, labelArrayNeu);
            });
    } else {
        var data = {
            labels: labelArray,
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: dataArray
                }
            ]
        }
        var ctx = $("#myChart").get(0).getContext("2d");
        new Chart(ctx).Line(data, options);
    }
}


function loadData() {
    var counter = [];
    var labels = [];
    const year = [
        ["2011", "/ostseewelle/_design/artist_play/_view/artist_play?endkey=[%22ABBA%22,%222011-12-31T23:59:59.000Z%22]&startkey=[%22ABBA%22,%222011-01-01T00:00:00.000Z%22]"],
        ["2012", "/ostseewelle/_design/artist_play/_view/artist_play?endkey=[%22ABBA%22,%222012-12-31T23:59:59.000Z%22]&startkey=[%22ABBA%22,%222012-01-01T00:00:00.000Z%22]"],
        ["2013", "/ostseewelle/_design/artist_play/_view/artist_play?endkey=[%22ABBA%22,%222013-12-31T23:59:59.000Z%22]&startkey=[%22ABBA%22,%222013-01-01T00:00:00.000Z%22]"]
    ];
    loadData2(year, counter, labels);
}