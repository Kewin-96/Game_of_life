// ****************************************************
// **************** DRAWING TOOLS *********************
// ****************************************************

// function whichCell(x,y,canBeOnGridcell) - checks if cursor is on canvas and if is(not) on gridcell and returns pointed cell
// x,y - location of cursor
// canBeOnGridcell - if cursor can be on gridcell (boolean)
// returns pointed cell
function whichCell(x,y,canBeOnGridcell)
{
	if( ((x % cell_width >= cell_width - CELL_MARGIN || y % cell_width >= cell_width - CELL_MARGIN) && !canBeOnGridcell) ||
		x < 0 || x >= canv.width || y < 0 || y >= canv.height)    // if cursor is(not) on gridcell or outside of canvas
		return null;
	cell_x = Math.floor(x / cell_width);
	cell_y = Math.floor(y / cell_width);
	if(!(x >= 0 && x < canv.width && y >= 0 && y < canv.height))    // if cursor is outside canvas
		return null;
	return {x:cell_x, y:cell_y};
}

// function pencilErase(evt) - pencil and erase tool - drawing or erasing cells on canvas
// evt - event (used to get position of cursor and pressed mouse button)
function pencilErase(evt)
{
	// Getting position of curson on canvas
	x = parseInt(evt.offsetX);
	y = parseInt(evt.offsetY);

	// Getting cell position on canvas
	if(last_mouse_cell_position != null) // if there is previous cell
		cell = whichCell(x,y,true);		// get pointed cell (even if cursor is on gridcell)
	else
		cell = whichCell(x,y,false);	// get pointed cell (if cursor is on cell)

	// Drawing cells
	if(cell == null && last_mouse_cell_position == null)    // if there is no cell and there is no previous cell: do not draw
	{
		return;
	}
	else if(cell!=null)		// if there is cell
	{
		if(last_mouse_cell_position != null)	//if there is previous cell - draw line between cells
		{
			if(evt.buttons === 1)		//left mouse button - draw
			{
				cells = makeCellsLine(last_mouse_cell_position,cell,"white");
				createAndDrawCells(cells);
			}
			if(evt.buttons === 2)		//left mouse button - erase
			{
				cells = makeCellsLine(last_mouse_cell_position,cell,"black");
				killAndDrawCells(cells);
			}
		}
		else	//if there is no previous cell - draw pointed cell
		{
			if(evt.buttons === 1)
				createAndDrawCells([cell]);
			if(evt.buttons === 2)
				killAndDrawCells([cell]);
		}
	}
	last_mouse_cell_position = cell;    //save previous cell
}