// ****************************************************
// ****************** INPUT INTERFACE *****************
// ****************************************************

// function dimensionsFormChanged() - function executes when text will be change in one of 3 textbox on site
function dimensionsFormChanged()
{
    document.getElementById("a_w").innerHTML = parseInt(document.getElementById("inputText_x_cells").value * parseInt(document.getElementById("inputText_cell_dim").value));
    document.getElementById("a_h").innerHTML = parseInt(document.getElementById("inputText_y_cells").value * parseInt(document.getElementById("inputText_cell_dim").value));
}

// function button_submit() - function takes input parameters, checks if they are correct and applies them
function button_submit()
{
    cx = parseInt(document.getElementById("inputText_x_cells").value);
    cy = parseInt(document.getElementById("inputText_y_cells").value);
    cd = parseInt(document.getElementById("inputText_cell_dim").value);
    if(!(cx >= 5 && cx <= 250))
        alert("Error: width of board must be between 5 and 250");
    else if(!(cy >= 5 && cy <= 250))
        alert("Error: height of board must be between 5 and 250");
    else if(!(cd >= 3 && cd <= 25))
        alert("Error: cell width must be between 3 and 25");
    else
    {
        cell_x_count = cx;
        cell_y_count = cy;
        cell_width = cd;
        button_clear();
        if(cx*cy >= 20000)
            alert("Warning: you created " + (cx*cy) + " cells - it might be diffucult for your computer to calculate it !!!!!");
        document.getElementById("p_cx").innerHTML = cx;
        document.getElementById("p_cy").innerHTML = cy;
        document.getElementById("p_cd").innerHTML = cd;
    }
}

// function button_undo() - undo operation
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
        drawGeneration();
    }
}

// function button_redo() - redo operation
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
        drawGeneration();
    }
}

// function button_start() - start simulation
function button_start()
{
    //boolen - is simulation started
    started = true;

    //transforming start button into stop button
    document.getElementById("image_start_stop").src = "img/icon_stop.png";
    document.getElementById("image_start_stop").title = "stop [S]";
    document.getElementById("button_start_stop").href = "javascript:button_stop();"

    //updating information
    document.getElementById("p_start_status").innerHTML = "Simulation started";
}

// function button_stop() - stop simulation
function button_stop()
{
    started = false;

    //transforming stop button into start button
    document.getElementById("image_start_stop").src = "img/icon_start.png";
    document.getElementById("image_start_stop").title = "start [S]";
    document.getElementById("button_start_stop").href = "javascript:button_start();"

    //updating information
    document.getElementById("p_start_status").innerHTML = "Simulation stopped";
}

// function button_speedDown() - speed down simulation
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

// function button_speedUp() - speed up simulation
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

// function button_backTo1Gen() - go back to first generation
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
        drawGeneration();
        generation = 1;
        
        //update displaying generation number
        document.getElementById("p_generation").innerHTML = "Generation = " + generation;

        enableDisableUndoRedo(true);
    }
}

// function button_clear() - go back to first generation and clear board
function button_clear()
{
	button_backTo1Gen();
    init_canvas();
    init_simulation();
}

// function enableDisableUndoRedo(enable) - enables or disables "undo" and "redo" button
// enable - boolean: if true - enables buttons, if false - vice versa
function enableDisableUndoRedo(enable)
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