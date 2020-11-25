pushed = false;     // if any mouse button is pressed
last_mouse_cell_position = null;
const canvas_margin = 8;
const canvas_width = 800;
const canvas_height = 800;
const cell_dimension = 10;
const cell_x_count = canvas_width / cell_dimension;
const cell_y_count = canvas_height / cell_dimension;
const cell_margin = 1;
living_cells = [];
new_generation = [];

generation = 1;

// window.onload=function() - executes when loading site
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
    for(i = 0; i < cell_x_count; i++)
    {
        for(j = 0; j < cell_x_count; j++)
        {
            ctx.fillRect(i*10,j*10,cell_dimension-cell_margin,cell_dimension-cell_margin);
        }
    }

    //initializing array
    for(i = 0; i < cell_x_count; i++)
    {
        living_cells.push([]);
        new_generation.push([]);
        for(j = 0; j < cell_y_count; j++)
        {
            living_cells[i].push(false);
            new_generation[i].push(false);
        }
    }

    //DEBUG event
    document.addEventListener("keydown",keyDown);

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
}

// function whichCell(x,y) - checks if cursor is on canvas and if is(not) on gridcell
// x,y - location of cursor
// canBeOnGridcell - boolen value - if cursor can be on gridcell
function whichCell(x,y,canBeOnGridcell)
{
    if( ((x % cell_dimension >= cell_dimension - cell_margin || y % cell_dimension >= cell_dimension - cell_margin) && !canBeOnGridcell) ||
        x < 0 || x >= canvas_width || y < 0 || y >= canvas_height)    // if cursor is(not) on gridcell or outside of canvas
        return null;
    cell_x = Math.floor(x / cell_dimension);
    cell_y = Math.floor(y / cell_dimension);
    if(!(x >= 0 && x < canvas_width && y >= 0 && y < canvas_height))    // if cursor is outside canvas
        return null;
    return {x:cell_x, y:cell_y};
}

// function whichCell(x,y) - when user clicks mouse or moves mouse whet it is pressed
function mouseMoveOrDown(evt)
{
    // Getting posotion of curson on canvas
    x = parseInt(evt.pageX)-canvas_margin;
    y = parseInt(evt.pageY)-canvas_margin;

    // Getting cell position on canvas
    if(last_mouse_cell_position != null) // if there is previous cell
        cell = whichCell(x,y,true);
    else
        cell = whichCell(x,y,false);

    // DEBUG: displaying position of cursor, pressed mouse button
    document.getElementById("test").innerHTML = "x = " + x + ", y = " + y + ", button = " + evt.buttons;

    // Drawing cells
    if(cell == null && last_mouse_cell_position == null)    // if there is no cell and there is no previous cell: do not draw
    {
        return;
    }
    else if(cell!=null)     // if there is cell
    {
        if(last_mouse_cell_position != null)    //if there is previous cell
        {
            if(evt.buttons === 1)
            {
                cells = makeCellsLine(last_mouse_cell_position,cell,"white");
                createAndDrawCells(cells);
            }
            if(evt.buttons === 2)
            {
                cells = makeCellsLine(last_mouse_cell_position,cell,"black");
                killAndDrawCells(cells);
            }
        }
        else
        {
            if(evt.buttons === 1)
                createAndDrawCells([cell]);
            if(evt.buttons === 2)
                killAndDrawCells([cell]);
        }
        // DEBUG: displaying cell position
        document.getElementById("test").innerHTML += ", cell_x = " + cell.x + ", cell_y = " + cell.y;
    }
    last_mouse_cell_position = cell;    //saving previous cell
}

// function drawCells(prev_cell,cell) - creating line of cells between 2 cells
function makeCellsLine(prev_cell,cell)
{
    var cells = [];
    if(cell.x - prev_cell.x == 0 && cell.y - prev_cell.y == 0)  //if there will be no line (just point)
    {
        return [cell];
    }
    else if(cell.y - prev_cell.y == 0)  //if there will be horizontal line
    {
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
    else if(cell.x - prev_cell.x == 0)  //if there will be vertical line
    {
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
    else if(Math.abs(cell.x - prev_cell.x) > Math.abs(cell.y - prev_cell.y)) // if angle of line will be below 45 degrees
    {
        var a = (cell.y - prev_cell.y)/(cell.x - prev_cell.x);
        var b = cell.y-(a*cell.x);
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
    else if(Math.abs(cell.x - prev_cell.x) <= Math.abs(cell.y - prev_cell.y)) // if angle of line will be above or equal 45 degrees
    {
        var a = (cell.y - prev_cell.y)/(cell.x - prev_cell.x);
        var b = cell.y-(a*cell.x);
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
    return cells;
}

// function createCells(cells) - creating cells (adding to array)
function createCells(cells)
{
    /*console.log("X1: " + cells);
    console.log(cells);*/
    for(i = 0; i < cells.length; i++)
        living_cells[cells[i].x][cells[i].y] = true;
}

// function killCells(cells) - destroying cells (removing from array)
function killCells(cells)
{
    for(i = 0; i < cells.length; i++)
        living_cells[cells[i].x][cells[i].y] = false;
}

// function createAndDrawCells(cells) - creating and drawing cells
function createAndDrawCells(cells)
{
    createCells(cells);
    for(i = 0; i < cells.length; i++)
        drawCell(cells[i],"white");
}

// function killAndDrawCells(cells) - destroying and drawing cells
function killAndDrawCells(cells)
{
    killCells(cells);
    for(i = 0; i < cells.length; i++)
        drawCell(cells[i],"black");
}

// function drawCell(cell,color) - drawing cell
function drawCell(cell,color)
{
    ctx.fillStyle=color;
    ctx.fillRect(cell.x*10, cell.y*10, cell_dimension-cell_margin, cell_dimension-cell_margin);
}

// function mouseMove(evt) - moving mouse (event)
function mouseMove(evt)
{
    if(pushed == true)
        mouseMoveOrDown(evt);
}

// function mouseDown(evt) - pressing mouse button (event)
function mouseDown(evt)
{
    pushed = true;
    mouseMoveOrDown(evt);
}

// function mouseDown(evt) - leaving mouse button (event)
function mouseUp(evt)
{
    pushed = false;
    last_mouse_cell_position = null;
}

function drawingGeneration()
{
    //filling canvas with gridcell
    ctx.fillStyle="black";
    for(i = 0; i < cell_x_count; i++)
    {
        for(j = 0; j < cell_y_count; j++)
        {
            ctx.fillRect(i*10,j*10,cell_dimension-cell_margin,cell_dimension-cell_margin);
        }
    }

    //drawing cells
    for(i = 0; i < living_cells.length; i++)
        for(j = 0; j < living_cells.length; j++)
            if(living_cells[i][j] == true)
                drawCell({x:i,y:j},"white");
}

//DEBUG func
function keyDown(evt)
{
    //filling canvas with gridcell
    /*ctx.fillStyle="black";
    for(i = 0; i < cell_x_count; i++)
    {
        for(j = 0; j < cell_y_count; j++)
        {
            ctx.fillRect(i*10,j*10,cell_dimension-cell_margin,cell_dimension-cell_margin);
        }
    }

    for(i = 0; i < living_cells.length; i++)
        for(j = 0; j < living_cells.length; j++)
            if(living_cells[i][j] == true)
                drawCell({x:i,y:j},"lime");

    console.log("poof!");*/


    //setting interval -> simulation 10Hz
    setInterval(simulation,1000/100);
}

function simulation()
{
    living_neighborhood = 0;
    for(x = 0; x < cell_x_count; x++)
    {
        for(y = 0; y < cell_y_count; y++)
        {
            living_neighborhood = 0;
            for(i = x - 1; i <= x + 1; i++)     //calculating living neightbors
            {
                if(i >= 0 && i < cell_x_count)
                    for(j = y - 1; j <= y + 1; j++)
                    {
                        if(j >= 0 && j < cell_y_count && !(i == x && j == y))
                        {
                            if(living_cells[i][j] == true)
                                living_neighborhood++;
                        }
                    }
            }
            if((living_cells[x][y] == false && living_neighborhood == 3 ) || ( living_cells[x][y] == true && (living_neighborhood == 2 || living_neighborhood == 3) ))
                new_generation[x][y]=true;
            else
                new_generation[x][y]=false;
        }
    }

    for(i = 0; i < cell_x_count; i++)
    {
        for(j = 0; j < cell_y_count; j++)
        {
            living_cells[i][j] = new_generation[i][j];
        }
    }

    generation++;
    drawingGeneration();
}