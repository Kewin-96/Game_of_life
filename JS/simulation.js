// ****************************************************
// ******************** SIMULATION ********************
// ****************************************************

// function drawGeneration() - draws generation
function drawGeneration()
{
	//filling canvas with gridcell
	ctx.fillStyle="black";
	for(i = 0; i < cell_x_count; i++)
	{
		for(j = 0; j < cell_y_count; j++)
		{
			ctx.fillRect(i*cell_width,j*cell_width,cell_width-CELL_MARGIN,cell_width-CELL_MARGIN);
		}
	}

	//drawing cells
	for(i = 0; i < living_cells.length; i++)
		for(j = 0; j < living_cells.length; j++)
			if(living_cells[i][j] == true)
				drawCell({x:i,y:j},"white");
}

// function simulation() - starts simulation Game of Life
function simulation()
{
	//checks if simulation is started
	if(started == false)
		return;

	//copying first generation to buffor
	if(generation == 1)
	{
		enableDisableUndoRedo(false);
        first_generation = [];
		for(i = 0; i < living_cells.length; i++)
		{
			first_generation.push([]);
			for(j = 0; j < living_cells[i].length; j++)
			{
				first_generation[i].push(living_cells[i][j]);
			}
		}
	}

	//calculating new generation
	living_neighborhood = 0;
	for(x = 0; x < cell_x_count; x++)
	{
		for(y = 0; y < cell_y_count; y++)
		{
			//calculating living neightbors for current cell {x,y}
			living_neighborhood = 0;
			for(i = x - 1; i <= x + 1; i++)
			{
					for(j = y - 1; j <= y + 1; j++)
					{
						if(!(i == x && j == y))
						{
							if(i >= 0 && i < cell_x_count && j >= 0 && j < cell_y_count )
							{
								if(living_cells[i][j] == true)
									living_neighborhood++;
							}
							else
							{
								var ii = i;
								var jj = j;
								if(i == -1)
									ii = cell_x_count-1;
								else if(i == cell_x_count)
									ii = 0;
								if(j == -1)
									jj = cell_y_count-1;
								else if(j == cell_y_count)
									jj = 0;
								if(living_cells[ii][jj] == true)
									living_neighborhood++;
							}
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

	//update displaying generation number
	document.getElementById("p_generation").innerHTML = "Generation = " + generation;

	//drawing new generation
	drawGeneration();
}