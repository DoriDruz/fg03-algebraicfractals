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
    this.chooseColor = function (d){
        switch (this.color){
            case "classic":
                if (this.method == "Newton"){
                    return toColor_Classic_Newton(d.att);
                }
                return toColor_Classic(d);
            case "level":
                if (this.method == "Newton"){
                    return toColor_level(d.it);
                }
                return toColor_level(d);
            case "zebra":
                if (this.method == "Newton"){
                    return toColor_Zebra(d.it);
                }
                return toColor_Zebra(d);
            case "hybrid":
                if (this.method == "Newton")
                    return toColor_Hybrid(d.att, d.it);
                else{
                    location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                    break;
                }
        }
    };
}
cvs = new Canvas_settings();
function drawPoints(imageData, methodColor, iterations){
          var pointColor = methodColor;
          imageData.data[4 * (iterations[0] + cvs.width * iterations[1]) + 0] = pointColor[0];
          imageData.data[4 * (iterations[0] + cvs.width * iterations[1]) + 1] = pointColor[1];
          imageData.data[4 * (iterations[0] + cvs.width * iterations[1]) + 2] = pointColor[2];
          imageData.data[4 * (iterations[0] + cvs.width * iterations[1]) + 3] = pointColor[3];
}
function drawInCycleNewton(imageData){
  for (var i = 0; i < cvs.width; ++i) {
      for (var j = 0; j < cvs.height; ++j) {
          var iterations = [i, j];
          var point = cvs.getComplexCoordinats(i, j);
          drawPoints(imageData, cvs.chooseColor(setAttractorNewton(point.x, point.y, 0, cvs.number)), iterations);
      }
    }
}
function drawInCycleMandelbrot(imageData){
  for (var i = 0; i < cvs.width; ++i) {
      for (var j = 0; j < cvs.height; ++j) {
          var iterations = [i, j];
          var point = cvs.getComplexCoordinats(i, j);
          drawPoints(imageData, cvs.chooseColor(Mandel_Distances(point.x, point.y, cvs.number)), iterations);
      }
    }
}
function drawInCycleJulia(imageData){
  for (var i = 0; i < cvs.width; ++i) {
      for (var j = 0; j < cvs.height; ++j) {
          var iterations = [i, j];
          var point = cvs.getComplexCoordinats(i, j);
          drawPoints(imageData, cvs.chooseColor(setIterJulia(point.x, point.y, parseFloat(cvs.x), parseFloat(cvs.y), cvs.number)), iterations);
      }
    }
}
function doFractalThing(left, top, right, bottom){
    cvs.newCoords(left,top,right,bottom);
    cvs.getElements();
    var canvas = document.getElementById("cvs");
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(cvs.width, cvs.height);
    switch (cvs.method) {
        case "Newton":
            drawInCycleNewton(imageData);
            break;
        case  "Mandelbrot":
            drawInCycleMandelbrot(imageData);
            break;
        case "Julia":
            drawInCycleJulia(imageData);
            break;
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
