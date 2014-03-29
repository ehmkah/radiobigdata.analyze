var options = {

    //Boolean - If we show the scale above the chart data
    scaleOverlay: false,

    //Boolean - If we want to override with a hard coded scale
    scaleOverride: true,

    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps: 10,
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


function registerEvents() {
    $("#artists").change(function () {
        $("#artists option:selected").each(function () {
            loadData($(this).text());
        });
    });
}
function starten() {
    loadData();
    registerEvents();
}

function showDiagram(requestData, dataArray, labelArray) {
    if (requestData.length > 0) {
        $.getJSON(requestData[0][1],
            function (data) {
                var dataArrayNeu = dataArray.concat([data.rows.length]);
                var labelArrayNeu = labelArray.concat([requestData[0][0]]);
                showDiagram(requestData.splice(1, requestData.length - 1), dataArrayNeu, labelArrayNeu);
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
        var maxVal = Math.max.apply(Math, dataArray);
        options.scaleStepWidth = Math.round(maxVal / 10);

        new Chart(ctx).Line(data, options);
    }
}

function createDiagram(artists) {
    const firstPart = "/ostseewelle/_design/artist_play/_view/artist_play?endkey=[%22";
    const lastPart = "T00:00:00.000Z%22]";

    function createYearUris() {
        return [
            ["2011", firstPart + artists + "%22,%222011-12-31T23:59:59.000Z%22]&startkey=[%22" + artists + "%22,%222011-01-01" + lastPart],
            ["2012", firstPart + artists + "%22,%222012-12-31T23:59:59.000Z%22]&startkey=[%22" + artists + "%22,%222012-01-01" + lastPart],
            ["2013", firstPart + artists + "%22,%222013-12-31T23:59:59.000Z%22]&startkey=[%22" + artists + "%22,%222013-01-01" + lastPart]
        ];
    }

    function createMonthUris() {
        return [
            ["F11", firstPart + artists + "%22,%222011-03-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-02-01" + lastPart],
            ["M11", firstPart + artists + "%22,%222011-04-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-03-01" + lastPart],
            ["A11", firstPart + artists + "%22,%222011-05-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-04-01" + lastPart],
            ["M11", firstPart + artists + "%22,%222011-06-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-05-01" + lastPart],
            ["J11", firstPart + artists + "%22,%222011-07-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-06-01" + lastPart],
            ["J11", firstPart + artists + "%22,%222011-08-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-07-01" + lastPart],
            ["A11", firstPart + artists + "%22,%222011-09-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-08-01" + lastPart],
            ["S11", firstPart + artists + "%22,%222011-10-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-09-01" + lastPart],
            ["O11", firstPart + artists + "%22,%222011-11-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-10-01" + lastPart],
            ["N11", firstPart + artists + "%22,%222011-12-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-11-01" + lastPart],
            ["D11", firstPart + artists + "%22,%222012-01-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222011-12-01" + lastPart],

            ["J12", firstPart + artists + "%22,%222012-02-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-01-01" + lastPart],
            ["F12", firstPart + artists + "%22,%222012-03-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-02-01" + lastPart],
            ["M12", firstPart + artists + "%22,%222012-04-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-03-01" + lastPart],
            ["A12", firstPart + artists + "%22,%222012-05-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-04-01" + lastPart],
            ["M12", firstPart + artists + "%22,%222012-06-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-05-01" + lastPart],
            ["J12", firstPart + artists + "%22,%222012-07-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-06-01" + lastPart],
            ["J12", firstPart + artists + "%22,%222012-08-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-07-01" + lastPart],
            ["A12", firstPart + artists + "%22,%222012-09-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-08-01" + lastPart],
            ["S12", firstPart + artists + "%22,%222012-10-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-09-01" + lastPart],
            ["O12", firstPart + artists + "%22,%222012-11-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-10-01" + lastPart],
            ["N12", firstPart + artists + "%22,%222012-12-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-11-01" + lastPart],
            ["D12", firstPart + artists + "%22,%222013-01-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222012-12-01" + lastPart],

            ["J13", firstPart + artists + "%22,%222013-02-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-01-01" + lastPart],
            ["F13", firstPart + artists + "%22,%222013-03-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-02-01" + lastPart],
            ["M13", firstPart + artists + "%22,%222013-04-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-03-01" + lastPart],
            ["A13", firstPart + artists + "%22,%222013-05-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-04-01" + lastPart],
            ["M13", firstPart + artists + "%22,%222013-06-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-05-01" + lastPart],
            ["J13", firstPart + artists + "%22,%222013-07-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-06-01" + lastPart],
            ["J13", firstPart + artists + "%22,%222013-08-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-07-01" + lastPart],
            ["A13", firstPart + artists + "%22,%222013-09-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-08-01" + lastPart],
            ["S13", firstPart + artists + "%22,%222013-10-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-09-01" + lastPart],
            ["O13", firstPart + artists + "%22,%222013-11-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-10-01" + lastPart],
            ["N13", firstPart + artists + "%22,%222013-12-01T00:00:00.000Z%22]&startkey=[%22" + artists + "%22,%222013-11-01" + lastPart]
        ];
    }


    const uris = createMonthUris();

    showDiagram(uris, [], []);
}

function loadArtists() {
    $.getJSON("/ostseewelle/_design/artist/_view/artist?group=true",
        function (data) {
            data.rows.forEach(function (entry) {
                $("#artists").append("<option value=\"" + entry.key + "\">" + entry.key + "</option>");
            });
            //  alert(data.rows[0].key);
        });
}


function loadData(artists) {
    artists = artists || "REVOLVERHELD";
    createDiagram(artists);
    loadArtists();
}