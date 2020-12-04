// ****************************************************
// ******************** INPUT EVENTS ******************
// ****************************************************

// function mouseMove(evt) - moving mouse (on canvas)
// evt - event (used to get mouse button)
function mouseMove(evt)
{
	if(pushed == true)
		pencilErase(evt);
}

// function mouseDown(evt) - pressing mouse button (on canvas)
// evt - event (used to get mouse button)
function mouseDown(evt)
{
	pushed = true;
	pencilErase(evt);
}

// function mouseDown() - leaving mouse button (on canvas)
function mouseUp()
{
	pushed = false;
	last_mouse_cell_position = null;
	
	//copying set of cells to buffor_cells for "undo", "redo" operations
	if (buffor_cells_pointer >= buffor_cells.length)
		throw 'buffor_cells_pointer < buffor_cells.length';
	if(buffor_cells_pointer < buffor_cells.length - 1)
	{
		var buf = buffor_cells.length - 1 - buffor_cells_pointer;
		for(i = 0; i < buf; i++)
		{
			buffor_cells.pop();
		}
	}
	if (buffor_cells_pointer != buffor_cells.length-1)
		throw 'buffor_cells_pointer == buffor_cells.length-1';
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

// function keyDown(evt) - pressing key
// evt - event (used to get key)
function keyDown(evt)
{
	if(evt.ctrlKey == true)
	{
		if(evt.key == 'z')
			button_undo();
		else if(evt.key == 'y')
			button_redo();
	}
	else if(evt.key == 's')
	{
		if(document.getElementById("p_start_status").innerHTML == "Simulation started")
			button_stop();
		else if(document.getElementById("p_start_status").innerHTML == "Simulation stopped")
			button_start();
	}
	else if(evt.key == 'q')
		button_speedDown();
	else if(evt.key == 'e')
		button_speedUp();
	else if(evt.key == 'r')
		button_backTo1Gen();
	else if(evt.key == 'c')
		button_clear();
}