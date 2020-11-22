pushed = false;
last_mouse_cell_position = null;
const canvas_margin = 8;
const canvas_width = 800;
const canvas_height = 800;
const cell_dimension = 10;
const cell_x_count = canvas_width / cell_dimension;
const cell_y_count = canvas_height / cell_dimension;
const cell_margin = 1;

window.onload=function()
{
    if(cell_x_count != this.parseInt(cell_x_count) || cell_y_count != this.parseInt(cell_y_count))
        throw 'cell_x_count or cell_y_count is not integer !!!';

    //setting canvas dimensions
    canv=document.getElementById("gc");
    canv.width = canvas_width;
    canv.height = canvas_height;

    //filling canvas with gridcell
    ctx=canv.getContext("2d");
    ctx.fillStyle="#404040";
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.fillStyle="black";
    for(i = 0; i < canvas_width/cell_dimension; i++)
    {
        for(j = 0; j < canvas_height/cell_dimension; j++)
        {
            ctx.fillRect(i*10,j*10,cell_dimension-cell_margin,cell_dimension-cell_margin);
        }
    }

    //adding event listeners
    canv.addEventListener("mousemove",mouseMove);
    canv.addEventListener("mousedown",mouseDown);
    canv.addEventListener("mouseup",mouseUp);
    canv.oncontextmenu  = function(e)
    {
        var evt = new Object({keyCode:93});
        if(e.preventDefault != undefined)
            e.preventDefault();
        if(e.stopPropagation != undefined)
            e.stopPropagation();
        mouseUp(evt);
    }

    /*createCells({x:0,y:0},{x:0,y:4});
    createCells({x:2,y:0},{x:5,y:0});
    createCells({x:7,y:0},{x:11,y:4});
    createCells({x:14,y:4},{x:18,y:0});
    createCells({x:20,y:0},{x:22,y:4});
    createCells({x:24,y:0},{x:32,y:3});*/

}

function whichCell(x,y)
{
    if(x % cell_dimension >= cell_dimension - cell_margin || y % cell_dimension >= cell_dimension - cell_margin)
        return null;
    cell_x = Math.floor(x / cell_dimension);
    cell_y = Math.floor(y / cell_dimension);
    if(cell_x < 0 || cell_x >= cell_x_count || cell_y < 0 || cell_y >= cell_y_count)
        return null;
    return {x : cell_x, y : cell_y};
}
function mouseMoveOrDown(evt)
{
    x = parseInt(evt.pageX)-canvas_margin;
    y = parseInt(evt.pageY)-canvas_margin;
    if(last_mouse_cell_position != null && x >= 0 && x < canvas_width && y >= 0 && y < canvas_height) // if there is previous cell position and curent position is on canvas
        cell = {x:Math.floor(x / cell_dimension),y:Math.floor(y / cell_dimension)};
    else    //if there is no previous cell or it is not on canvas
        cell = whichCell(x,y);
    document.getElementById("test").innerHTML = "x = " + x + ", y = " + y + ", button = " + evt.buttons;
    if(cell == null && last_mouse_cell_position == null)
    {
        return;
    }
    else if(cell!=null || last_mouse_cell_position != null)
    {
        if(last_mouse_cell_position != null)
        {
            if(evt.buttons === 1)
                createCells(last_mouse_cell_position,cell);
            if(evt.buttons === 2)
                killCells(last_mouse_cell_position,cell);
        }
        else
        {
            if(evt.buttons === 1)
                createCell(cell);
            if(evt.buttons === 2)
                killCell(cell);
        }
        document.getElementById("test").innerHTML += ", cell_x = " + cell.x + ", cell_y = " + cell.y;
    }
    last_mouse_cell_position = cell;
}
function createCells(prev_cell,cell)
{
    console.log("createCells();, prev_cell = (" + prev_cell.x + "," + prev_cell.y + "), cell = (" + cell.x + "," + cell.y + ")");
    var cells = [];
    if(cell.x - prev_cell.x == 0 && cell.y - prev_cell.y == 0)  //if no line
    {
        console.log("if1");
        createCell(cell);
        return;
    }
    else if(cell.y - prev_cell.y == 0)  //if horizontal line
    {
        console.log("if3");
        var bottom, top;
        if(prev_cell.x > cell.x)
        {
            bottom = cell.x;
            top = prev_cell.x;
        }
        else
        {
            top = cell.x;
            bottom = prev_cell.x;
        }
        for(x = bottom; x <= top; x++)
        {
            cells.push({x:x,y:cell.y});
        }
    }
    else if(cell.x - prev_cell.x == 0)  //if vertical line
    {
        console.log("if2");
        var left, right;
        if(prev_cell.y > cell.y)
        {
            left = cell.y;
            right = prev_cell.y;
        }
        else
        {
            right = cell.y;
            left = prev_cell.y;
        }
        for(y = left; y <= right; y++)
        {
            cells.push({x:cell.x,y:y});
        }
    }
    else if(Math.abs(cell.x - prev_cell.x) > Math.abs(cell.y - prev_cell.y)) // if angle is below 45 degrees
    {
        console.log("if4");
        var a = (cell.y - prev_cell.y)/(cell.x - prev_cell.x);
        var b = cell.y-(a*cell.x);
        console.log("a="+a+",b="+b);
        var bottom, top;
        if(prev_cell.x > cell.x)
        {
            bottom = cell.x;
            top = prev_cell.x;
        }
        else
        {
            top = cell.x;
            bottom = prev_cell.x;
        }
        for(x = bottom; x <= top ; x++)
        {
            y = a * x + b;
            cells.push({x:parseInt(x+0),y:parseInt(y+0)});
        }
    }
    else if(Math.abs(cell.x - prev_cell.x) <= Math.abs(cell.y - prev_cell.y)) // if angle is above or equal 45 degrees
    {
        console.log("if5");
        var a = (cell.y - prev_cell.y)/(cell.x - prev_cell.x);
        var b = cell.y-(a*cell.x);
        console.log("a="+a+",b="+b);
        var left, right;
        if(prev_cell.y > cell.y)
        {
            left = cell.y;
            right = prev_cell.y;
        }
        else
        {
            right = cell.y;
            left = prev_cell.y;
        }
        for(y = left; y <= right; y++)
        {
            x = (y - b)/a;
            cells.push({x:parseInt(x+0),y:parseInt(y+0)});
        }
    }
    else
        throw "This exception shouldn't happen: no reachable code ... for sure???";
    console.log(cells);
    for(i = 0; i < cells.length; i++)
        createCell(cells[i]);
}
function killCells(prev_cell,cell)
{

    ctx.fillStyle="black";
    ctx.fillRect(cell.x*10, cell.y*10, cell_dimension-cell_margin, cell_dimension-cell_margin);
}
function createCell(cell)
{
    ctx.fillStyle="white";
    ctx.fillRect(cell.x*10, cell.y*10, cell_dimension-cell_margin, cell_dimension-cell_margin);
}
function killCell(cell)
{
    ctx.fillStyle="black";
    ctx.fillRect(cell.x*10, cell.y*10, cell_dimension-cell_margin, cell_dimension-cell_margin);
}
function mouseMove(evt)
{
    console.log("mouseMove();");
    if(pushed == true)
        mouseMoveOrDown(evt);
}
function mouseDown(evt)
{
    console.log("mouseDown();");
    pushed = true;
    mouseMoveOrDown(evt);
}
function mouseUp(evt)
{
    console.log("mouseUp();");
    pushed = false;
    last_mouse_cell_position = null;
}











/*document.onkeydown = keyboardDown;
document.onkeyup = keyboardUp;
function keyboardDown(e)
{
    //
}
function keyboardUp(e)
{
    //
}*/