// ****************************************************
// ****************** INITIALIZATION ******************
// ****************************************************

// function init_canvas() - initializes canvas - sets canvas dimensions and draws gridcell
function init_canvas()
{
    //setting canvas dimensions
	canv=document.getElementById("canv");
	canv.width = cell_x_count * cell_width;
	canv.height = cell_y_count * cell_width;

	//filling canvas with gridcell
	ctx=canv.getContext("2d");
	ctx.fillStyle="#404040";
	ctx.fillRect(0,0,canv.width,canv.height);
	ctx.fillStyle="black";
	for(i = 0; i < cell_x_count; i++)
		for(j = 0; j < cell_y_count; j++)
			ctx.fillRect(i*cell_width,j*cell_width,cell_width-CELL_MARGIN,cell_width-CELL_MARGIN);
}

// function init_simulation() - initializes simulation - it's reseting arrays and pointer "buffor_cells_pointer"
function init_simulation()
{
	living_cells = [];
	new_generation = [];
	buffor_cells = [];
	buffor_cells_pointer = 0;
	buffor_cells.push([]);
	for(i = 0; i < cell_x_count; i++)
	{
		living_cells.push([]);
		new_generation.push([]);
		buffor_cells[0].push([]);
		for(j = 0; j < cell_y_count; j++)
		{
			living_cells[i].push(false);
			new_generation[i].push(false);
			buffor_cells[0][i].push(false);
		}
	}
}