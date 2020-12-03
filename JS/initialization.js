function init_canvas()
{
    //setting canvas dimensions
	canv=document.getElementById("canv");
	canv.width = canvas_width;
	canv.height = canvas_height;

	//filling canvas with gridcell
	ctx=canv.getContext("2d");
	ctx.fillStyle="#404040";
	ctx.fillRect(0,0,canv.width,canv.height);
	ctx.fillStyle="black";
	for(i = 0; i < cell_x_count; i++)
		for(j = 0; j < cell_x_count; j++)
			ctx.fillRect(i*cell_dimension,j*cell_dimension,cell_dimension-cell_margin,cell_dimension-cell_margin);
}

function init_simulation()
{
	//initializing array
	living_cells = [];
	new_generation = [];
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
	
}