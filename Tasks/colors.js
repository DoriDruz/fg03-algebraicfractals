function toColor_Classic(d){
  if(d == 0){
    return [0, 0, 0, 255];
  }
  else{
    return [255, 255, 255, 255];
  }
}
function toColor_Classic_Newton(attract){
    var red = 0;
    var green = 0;
    var blue = 0;
    var opacity = 255;
    switch (attract){
        case 1:
            red = 255;
            break;
        case 2:
            green = 255;
            break;
        case 3:
            blue = 255;
            break;
    }
    return [red, green, blue, opacity];
}
function toColor_Zebra(number){
  if ((number%2) == 0){
    return [0, 0, 0, 255];
  }
  else{
    return [255, 255, 255, 255];
  }
}
function toColor_level(number){
    var k = number, brightSet;
    number = cvs.number;
    if (number>1 == true){
      brightSet = 255 * k * 4 / (number - 1);
    }
    else{
      brightSet = 255;
    }
    return [brightSet, brightSet, 0 , 255];
}
function toColor_Hybrid(attract ,number){
    var opacity = 255, red = 0, green = 0, blue = 0;
    var k = number;
    number = cvs.number;
    switch (attract){
        case 1:
            red = number != 0 ? 255 * k / (number - 1) : 255;
            break;
        case 2:
            green = number != 0 ? 255 * k / (number - 1) : 255;
            break;
        case 3:
            blue = number != 0 ? 255 * k / (number - 1) : 255;
            break;
    }
    return [red, green, blue, opacity];
}
