// ****************************************************
// ****************** INPUT INTERFACE *****************
// ****************************************************

function button_undo()
{
    if(buffor_cells_pointer > 0)
    {
        buffor_cells_pointer--;
        living_cells = [];
        for(i = 0; i < buffor_cells[buffor_cells_pointer].length; i++)
        {
            living_cells.push([]);
            for(j = 0; j < buffor_cells[buffor_cells_pointer][i].length; j++)
            {
                living_cells[i].push(buffor_cells[buffor_cells_pointer][i][j]);
            }
        }
        drawingGeneration();
    }
}
function button_redo()
{
    if(buffor_cells_pointer < buffor_cells.length - 1)
    {
        buffor_cells_pointer++;
        living_cells = [];
        for(i = 0; i < buffor_cells[buffor_cells_pointer].length; i++)
        {
            living_cells.push([]);
            for(j = 0; j < buffor_cells[buffor_cells_pointer][i].length; j++)
            {
                living_cells[i].push(buffor_cells[buffor_cells_pointer][i][j]);
            }
        }
        drawingGeneration();
    }
}
function button_start()
{
    started = true;

    //transforming start button into stop button
    document.getElementById("image_start_stop").src = "img/icon_stop.png";
    document.getElementById("image_start_stop").title = "stop";
    document.getElementById("button_start_stop").href = "javascript:button_stop();"

    //updating information
    document.getElementById("p_start_status").innerHTML = "Simulation started";
}
function button_stop()
{
    started = false;

    //transforming stop button into start button
    document.getElementById("image_start_stop").src = "img/icon_start.png";
    document.getElementById("image_start_stop").title = "start";
    document.getElementById("button_start_stop").href = "javascript:button_start();"

    //updating information
    document.getElementById("p_start_status").innerHTML = "Simulation stopped";
}
function button_speedDown()
{
    //decreasing frequency of calculating new generations
    clearInterval(interval);
    if(interval_timeout < 16000)
        interval_timeout *= 2;
    interval = setInterval(simulation,interval_timeout);

    //updating information
	document.getElementById("p_speed").innerHTML = "Speed = " + 1000/interval_timeout + " generations per sec"
}
function button_speedUp()
{
    //increasing frequency of calculating new generations
    clearInterval(interval);
    if(interval_timeout > 16)
        interval_timeout /= 2;
    interval = setInterval(simulation,interval_timeout);

    //updating information
	document.getElementById("p_speed").innerHTML = "Speed = " + 1000/interval_timeout + " generations per sec"
}

function button_backTo1Gen()
{
    button_stop();
    if(generation > 1)
    {
        living_cells = [];
        for(i = 0; i < first_generation.length; i++)
		{
			living_cells.push([]);
			for(j = 0; j < first_generation[i].length; j++)
			{
				living_cells[i].push(first_generation[i][j]);
			}
        }
        drawingGeneration();
        generation = 1;
        enableDisable(true);
    }
}

function button_clear()
{
	button_backTo1Gen();
    init_canvas();
    init_simulation();
}

function enableDisable(enable)
{
    if(enable == true)
    {
        document.getElementById("button_undo").style = "pointer-events: all; opacity: 1;";
        document.getElementById("button_redo").style = "pointer-events: all; opacity: 1;";
    }
    else
    {
        document.getElementById("button_undo").style = "pointer-events: none; opacity: 0.6;";
        document.getElementById("button_redo").style = "pointer-events: none; opacity: 0.6;";
    }
}