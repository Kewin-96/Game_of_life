function init_canvas()
{
    //setting canvas dimensions
	canv=document.getElementById("canv");
	canv.width = cell_x_count * cell_dimension;
	canv.height = cell_y_count * cell_dimension;

	//filling canvas with gridcell
	ctx=canv.getContext("2d");
	ctx.fillStyle="#404040";
	ctx.fillRect(0,0,canv.width,canv.height);
	ctx.fillStyle="black";
	for(i = 0; i < cell_x_count; i++)
		for(j = 0; j < cell_y_count; j++)
			ctx.fillRect(i*cell_dimension,j*cell_dimension,cell_dimension-CELL_MARGIN,cell_dimension-CELL_MARGIN);
}

function init_simulation()
{
	//initializing array
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