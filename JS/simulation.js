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
            ctx.fillRect(i*10,j*10,cell_dimension-cell_margin,cell_dimension-cell_margin);
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
    living_neighborhood = 0;
    for(x = 0; x < cell_x_count; x++)
    {
        for(y = 0; y < cell_y_count; y++)
        {
            living_neighborhood = 0;
            for(i = x - 1; i <= x + 1; i++)     //calculating living neightbors
            {
                if(i >= 0 && i < cell_x_count)
                    for(j = y - 1; j <= y + 1; j++)
                    {
                        if(j >= 0 && j < cell_y_count && !(i == x && j == y))
                        {
                            if(living_cells[i][j] == true)
                                living_neighborhood++;
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