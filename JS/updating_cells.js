// ****************************************************
// **************** UPDATING CELLS ********************
// ****************************************************

// function drawCells(prev_cell,cell) - creating line of cells between 2 cells
// prev_cell - previous cell
// cell - current cell
// returns 1D array of cells {x,y}
function makeCellsLine(prev_cell,cell)
{
	var cells = [];
	if(cell.x - prev_cell.x == 0 && cell.y - prev_cell.y == 0)  //if there will be no line (just point)
	{
		return [cell];
	}
	else if(cell.y - prev_cell.y == 0)  //if there will be horizontal line
	{
		var bottom, top;
		if(prev_cell.x > cell.x)
		{
			bottom = cell.x;
			top = prev_cell.x;
		}
		else
		{
			top = cell.x;
			bottom = prev_cell.x;
		}
		for(x = bottom; x <= top; x++)
		{
			cells.push({x:x,y:cell.y});
		}
	}
	else if(cell.x - prev_cell.x == 0)  //if there will be vertical line
	{
		var left, right;
		if(prev_cell.y > cell.y)
		{
			left = cell.y;
			right = prev_cell.y;
		}
		else
		{
			right = cell.y;
			left = prev_cell.y;
		}
		for(y = left; y <= right; y++)
		{
			cells.push({x:cell.x,y:y});
		}
	}
	else if(Math.abs(cell.x - prev_cell.x) > Math.abs(cell.y - prev_cell.y)) // if angle of line will be below 45 degrees
	{
		var a = (cell.y - prev_cell.y)/(cell.x - prev_cell.x);
		var b = cell.y-(a*cell.x);
		var bottom, top;
		if(prev_cell.x > cell.x)
		{
			bottom = cell.x;
			top = prev_cell.x;
		}
		else
		{
			top = cell.x;
			bottom = prev_cell.x;
		}
		for(x = bottom; x <= top ; x++)
		{
			y = a * x + b;
			cells.push({x:parseInt(x+0),y:parseInt(y+0)});
		}
	}
	else if(Math.abs(cell.x - prev_cell.x) <= Math.abs(cell.y - prev_cell.y)) // if angle of line will be above or equal 45 degrees
	{
		var a = (cell.y - prev_cell.y)/(cell.x - prev_cell.x);
		var b = cell.y-(a*cell.x);
		var left, right;
		if(prev_cell.y > cell.y)
		{
			left = cell.y;
			right = prev_cell.y;
		}
		else
		{
			right = cell.y;
			left = prev_cell.y;
		}
		for(y = left; y <= right; y++)
		{
			x = (y - b)/a;
			cells.push({x:parseInt(x+0),y:parseInt(y+0)});
		}
	}
	else
		throw "This exception shouldn't happen: no reachable code ... for sure???";
	return cells;
}

// function createCells(cells) - creating cells (adding to array)
// cells - 1D array of cells {x,y}
function createCells(cells)
{
	for(i = 0; i < cells.length; i++)
		living_cells[cells[i].x][cells[i].y] = true;
}

// function killCells(cells) - destroying cells (removing from array)
// cells - 1D array of cells {x,y}
function killCells(cells)
{
	for(i = 0; i < cells.length; i++)
		living_cells[cells[i].x][cells[i].y] = false;
}

// function createAndDrawCells(cells) - creating and drawing cells on canvas
// cells - 1D array of cells {x,y}
function createAndDrawCells(cells)
{
	createCells(cells);
	for(i = 0; i < cells.length; i++)
		drawCell(cells[i],"white");
}

// function killAndDrawCells(cells) - destroying and drawing cells on canvas
// cells - 1D array of cells {x,y}
function killAndDrawCells(cells)
{
	killCells(cells);
	for(i = 0; i < cells.length; i++)
		drawCell(cells[i],"black");
}

// function drawCell(cell,color) - drawing cell
// cell - cell {x,y}
function drawCell(cell,color)
{
	ctx.fillStyle=color;
	ctx.fillRect(cell.x*cell_width, cell.y*cell_width, cell_width-CELL_MARGIN, cell_width-CELL_MARGIN);
}