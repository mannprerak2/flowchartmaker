var cddec, cdcon, canvas, chart;
var opts = {
    'line-width': 3,
    'maxWidth': 90,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 14,
    'font-weight':'bold',
    'font-color': 'rbg(60,60,60)',
    // 'font': 'normal',
    // 'font-family': 'calibri',
    // 'font-weight': 'normal',
    'line-color': 'rbg(60,60,60)',
    'element-color': 'rbg(60,60,60)',
    'fill': 'rgb(243,243,243)',
    'yes-text': 'Yes',
    'no-text': 'No',
    'arrow-end': 'block',
    'scale': 1
};
window.onload = function () {
    cddec = document.getElementById("code-declare");
    cdcon = document.getElementById("code-connect");
    canvas = document.getElementById("canvas");

    cdcon.oninput = cddec.oninput = function () {
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
        var code = cddec.value + "\n" + cdcon.value;
        if (chart) {
            canvas.innerHTML = '';
        }

        chart = flowchart.parse(code);
        chart.drawSVG('canvas',opts);
    }
    catch (err) {
        chart = document.getElementById("canvas");
        console.log(err);
    }
}

