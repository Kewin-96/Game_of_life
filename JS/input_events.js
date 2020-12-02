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
			ctx.fillRect(i*cell_dimension,j*cell_dimension,cell_dimension-cell_margin,cell_dimension-cell_margin);
		}
	}

	for(i = 0; i < living_cells.length; i++)
		for(j = 0; j < living_cells.length; j++)
			if(living_cells[i][j] == true)
				drawCell({x:i,y:j},"lime");

	console.log("poof!");*/


	//setting interval -> simulation 10Hz
	setInterval(simulation,1000/3);
}