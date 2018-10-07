var cddec,cdcon,canvas,chart;
window.onload = function () {
    cddec = document.getElementById("code-declare");
    cdcon = document.getElementById("code-connect");
    canvas = document.getElementById("canvas");

    cdcon.oninput = cddec.oninput = function(){
        updateChart();
    }
    updateChart();//calling initially to load demo chart
};

function PrintDiv() {
    var div = document.getElementById("canvas").children[0];

    (function saveSvg(svgEl, name) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    })(div, "flowchart.svg");
}

function updateChart() {
    try {
        var code = cddec.value+"\n"+cdcon.value;
        if (chart) {
            canvas.innerHTML = '';
        }

        chart = flowchart.parse(code);
        chart.drawSVG('canvas', {
            // 'x': 30,
            // 'y': 50,
            'line-width': 3,
            'maxWidth': 3,//ensures the flowcharts fits within a certian width
            'line-length': 50,
            'text-margin': 10,
            'font-size': 14,
            'font': 'normal',
            'font-weight': 'bold',
            'font-color': 'rgb(60,60,60)',
            'line-color': 'rgb(60,60,60)',
            'element-color': 'rgb(60,60,60)',
            'fill': 'rgb(245,245,245)',
            'yes-text': 'Yes',
            'no-text': 'No',
            'arrow-end': 'block',
            'scale': 1,
            // 'symbols': {
            //     'start': {
            //         'font-color': 'red',
            //         'element-color': 'green',
            //         'fill': 'yellow'
            //     },
            //     'end': {
            //         'class': 'end-element'
            //     }
            // },
            // 'flowstate': {
            //     'past': { 'fill': '#CCCCCC', 'font-size': 12 },
            //     'current': { 'fill': 'yellow', 'font-color': 'red', 'font-weight': 'bold' },
            //     'future': { 'fill': '#FFFF99' },
            //     'request': { 'fill': 'blue' },
            //     'invalid': { 'fill': '#444444' },
            //     'approved': { 'fill': '#58C4A3', 'font-size': 12, 'yes-text': 'APPROVED', 'no-text': 'n/a' },
            //     'rejected': { 'fill': '#C45879', 'font-size': 12, 'yes-text': 'n/a', 'no-text': 'REJECTED' }
            // }
        });
        $('[id^=sub1]').click(function () {
            alert('info here');
        });
    }
    catch (err) {
        chart = document.getElementById("canvas");
        console.log(err);
    }
}

