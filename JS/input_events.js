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
	
}