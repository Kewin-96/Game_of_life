// ****************************************************
// **************** DRAWING TOOLS *********************
// ****************************************************

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

// function pencilErase(x,y) - when user clicks mouse or moves mouse whet it is pressed (on canvas)
function pencilErase(evt)
{
    // Getting position of curson on canvas
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