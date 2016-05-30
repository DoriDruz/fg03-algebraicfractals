function HasClosePoints(x1,y1,x2,y2){
    var e = 0.0001;
    return Math.abs(x1 - x2) <= e && Math.abs(y1 - y2) <= e;
}
function setAttractorNewton(x, y, iter, number){
    var a = x*x;
    var b = y*y;
    var newX = 2*x/ 3+(a-b)/ (3 * ((a+b)*(a+b)));
    var newY = 2*y*(1-x/ ((a+b)*(a+b)))/ 3;
    if (number == 0)
      return {att : 0, it : iter};
    else if (HasClosePoints(x, y, 1, 0))
      return {att : 1, it : iter};
    else if (HasClosePoints(x, y, -Math.cos(Math.PI/ 3), Math.sin(Math.PI/ 3)))
      return {att : 2, it : iter};
    else if (HasClosePoints(x, y, -Math.cos(Math.PI/ 3), -Math.sin(Math.PI/ 3)))
      return {att : 3, it : iter};
    else
      return setAttractorNewton(newX, newY, iter + 1, number - 1);
}
//------
function Mandel_Distances(x, y, number){
    var x0 = 0, x1 = 0, y0 = 0, y1 = 0, iter = 0;
    while (iter < number){
        x1 = x0*x0 - y0*y0 + x;
        y1 = 2*x0*y0 + y;
        if ((x1*x1) + (y1*y1) > 4)
            return iter;
        x0 = x1;
        y0 = y1;
        ++iter;
    }
    return 0;
}
//--------
function setIterJulia(x, y, a, b, number){
    var x0 = x, y0 = y, x1 = 0, y1 = 0, iter = 0;
    while (iter < number){
        if ((x0*x0) + (y0*y0) > 4)
            return iter;
        x1 = x0*x0 - y0*y0 + a;
        y1 = 2*x0*y0 + b;
        x0 = x1;
        y0 = y1;
        ++iter;
    }
    return 0;
}
