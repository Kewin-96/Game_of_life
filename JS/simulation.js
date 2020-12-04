// ****************************************************
// ******************** SIMULATION ********************
// ****************************************************

function drawingGeneration()
{
	//filling canvas with gridcell
	ctx.fillStyle="black";
	for(i = 0; i < cell_x_count; i++)
	{
		for(j = 0; j < cell_y_count; j++)
		{
			ctx.fillRect(i*cell_dimension,j*cell_dimension,cell_dimension-CELL_MARGIN,cell_dimension-CELL_MARGIN);
		}
	}

	//drawing cells
	for(i = 0; i < living_cells.length; i++)
		for(j = 0; j < living_cells.length; j++)
			if(living_cells[i][j] == true)
				drawCell({x:i,y:j},"white");
}

function simulation()
{
	if(started == false)
		return;
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
	living_neighborhood = 0;
	for(x = 0; x < cell_x_count; x++)
	{
		for(y = 0; y < cell_y_count; y++)
		{
			living_neighborhood = 0;
			for(i = x - 1; i <= x + 1; i++)     //calculating living neightbors
			{
				//if(i >= 0 && i < cell_x_count)
					for(j = y - 1; j <= y + 1; j++)
					{
						if(/*j >= 0 && j < cell_y_count && */!(i == x && j == y))
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
	drawingGeneration();
}