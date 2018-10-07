
window.onload = function () {
    var btn = document.getElementById("run"),
        cd = document.getElementById("code"),
        chart;

    (btn.onclick = function () {
        try {
            var code = cd.value;
            if (chart) {
                chart.clean();
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
                'font-family': 'Helvetica',
                'font-weight': 'normal',
                'font-color': 'black',
                'line-color': 'black',
                'element-color': 'black',
                'fill': 'white',
                'yes-text': 'yes',
                'no-text': 'no',
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
    })();
};

function PrintDiv()
{
    var div = document.getElementById("canvas").children[0];

    (function saveSvg(svgEl, name) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    })(div,"flowchart.svg");
}
