function Canvas_settings(){
    this.left;
    this.top;
    this.right;
    this.bottom;
    this.width = 600;
    this.height = 600;
    this.number;
    this.color;
    this.method;
    this.x;
    this.y;
    this.newCoords = function (left, top, right, bottom){
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    };
    this.getElements = function(){
        this.number = document.getElementById("number").value
        this.color = document.getElementById("colors").value;
        this.method = document.getElementById("methods").value;
        this.x = document.getElementById("x").value;
        this.y = document.getElementById("y").value;
    }
    this.getComplexCoordinats = function (x, y){
        var i = x*(this.right - this.left)/ (this.width - 1) + this.left;
        var j = y*(this.bottom - this.top)/ (this.height - 1) + this.top;
        return {x: i, y: j};
    };
    this.chooseFunction = function (x,y){
        switch (this.method) {
            case "Newton":
                return GetNewton(x,y);
            case  "Mandelbrot":
                return GetMandelbrot(x,y);
            case "Julia":
                return GetJulia(x,y);
        }
    };
    this.chooseColor = function (d){
        switch (this.color){
            case "classic":
                if (this.method == "Newton"){
                    return Color_Classic_Newton(d.att);
                }
                return Color_Classic(d);
            case "level":
                if (this.method == "Newton"){
                    return Color_level(d.it);
                }
                return Color_level(d);
            case "zebra":
                if (this.method == "Newton"){
                    return Color_Zebra(d.it);
                }
                return Color_Zebra(d);
            case "hybrid":
                if (this.method == "Newton")
                    return Color_Hybrid(d.att, d.it);
                else{
                  console.log("No hybrid color for nonNewton");
                  break;
                }
        }
    };
}
cvs = new Canvas_settings();
function doFractalThing(left, top, right, bottom){
    cvs.newCoords(left,top,right,bottom);
    cvs.getElements();
    var canvas = document.getElementById("cvs");
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(cvs.width, cvs.height);
    for (var i = 0; i < cvs.width; ++i) {
        for (var j = 0; j < cvs.height; ++j) {
            var point = cvs.getComplexCoordinats(i, j);
            var pointColor = cvs.chooseFunction(point.x, point.y);
            imageData.data[4 * (i + cvs.width * j) + 0] = pointColor[0];
            imageData.data[4 * (i + cvs.width * j) + 1] = pointColor[1];
            imageData.data[4 * (i + cvs.width * j) + 2] = pointColor[2];
            imageData.data[4 * (i + cvs.width * j) + 3] = pointColor[3];
        }
    }
    context.putImageData(imageData, 0, 0);
}
HTMLCanvasElement.prototype.relMouseCoords = function (event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    // Fix for variable canvas width
    canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
    canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

    return {x:canvasX, y:canvasY}
}
function mouseDownHandler(canvas, e){
    var zoom = 10;
    var coords = canvas.relMouseCoords(e);
    var coord_s = document.getElementById("zoom");
    var x, y;
    if (coord_s.value == "in"){
        x = cvs.width/ zoom;
        y = cvs.height/ zoom;
    }else if(coord_s.value == "out"){
        x = cvs.width*zoom/2;
        y = cvs.height*zoom/2;
    }
    var left = coords.x - x;
    var top = coords.y - y;
    var right = coords.x + x;
    var bottom = coords.y + y;
    var first_point = cvs.getComplexCoordinats(left, top);
    var second_point = cvs.getComplexCoordinats(right, bottom);
    doFractalThing(first_point.x, first_point.y, second_point.x, second_point.y);
}
function onClick(){
    var canvas = document.getElementById("cvs");
    canvas.addEventListener("mousedown", function (e){
        mouseDownHandler(canvas, e);
    }, false);
}
