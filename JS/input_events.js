// ****************************************************
// ******************** INPUT EVENTS ******************
// ****************************************************

// function mouseMove(evt) - moving mouse (event) (on canvas)
function mouseMove(evt)
{
	if(pushed == true)
		pencilErase(evt);
}

// function mouseDown(evt) - pressing mouse button (event) (on canvas)
function mouseDown(evt)
{
	pushed = true;
	pencilErase(evt);
}

// function mouseDown(evt) - leaving mouse button (event) (on canvas)
function mouseUp(evt)
{
	pushed = false;
	last_mouse_cell_position = null;
	
	//copying set of cells to buffor_cells for "undo", "redo" operations
	//DEBUG
	if (buffor_cells_pointer >= buffor_cells.length)
		throw 'VERY BAD 356835683 !!!';
	if(buffor_cells_pointer < buffor_cells.length - 1)
	{
		var buf = buffor_cells.length - 1 - buffor_cells_pointer;
		for(i = 0; i < buf; i++)
		{
			buffor_cells.pop();
			console.log("buffor_cells.length = " + buffor_cells.length);
		}
	}
	//DEBUG
	if (buffor_cells_pointer != buffor_cells.length-1)
		throw 'VERY BAD 038571823 !!!';
	if(buffor_cells.length == MAX_BUFFOR_CELLS_LENGTH)
	{
		buffor_cells.shift();
		buffor_cells_pointer--;
	}
	buffor_cells.push([]);
	for(i = 0; i < living_cells.length; i++)
	{
		buffor_cells[buffor_cells.length-1].push([]);
		for(j = 0; j < living_cells[i].length; j++)
		{
			buffor_cells[buffor_cells.length-1][i].push(living_cells[i][j]);
		}
	}
	buffor_cells_pointer++;
}

//DEBUG func
function keyDown(evt)
{
	console.log("buffor_cells.length = " + buffor_cells.length + ", buffor_cells_pointer = " + buffor_cells_pointer);	
}