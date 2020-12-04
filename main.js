const canvas_width = 800;
const canvas_height = 800;
const cell_dimension = 10;
const cell_x_count = canvas_width / cell_dimension;
const cell_y_count = canvas_height / cell_dimension;
const cell_margin = 1;
var interval;
var interval_timeout = 125;
pushed = false;				// if any mouse button is pressed
last_mouse_cell_position = null;
started = false;			// if simulation is started
generation = 1;
living_cells = [];			//arrays of objects {x,y} (cell)
first_generation = [];		//arrays of objects {x,y} (cell)
new_generation = [];		//arrays of objects {x,y} (cell)
buffor_cells = [];			//array of 10 sets of (arrays of objects {x,y} (cell)) for "redo", "undo" operations
buffor_cells_pointer = 0;
const MAX_BUFFOR_CELLS_LENGTH = 10;

// window.onload=function() - executes when loading site
window.onload=function()
{
	if(cell_x_count != this.parseInt(cell_x_count) || cell_y_count != this.parseInt(cell_y_count))
		throw 'cell_x_count or cell_y_count is not integer !!!';

	//initializing canvas and simulation
	init_canvas();
	init_simulation();

	//DEBUG event
	document.addEventListener("keydown",keyDown);

	//adding event listeners
	canv.addEventListener("mousemove",mouseMove);
	canv.addEventListener("mousedown",mouseDown);
	canv.addEventListener("mouseup",mouseUp);
	canv.oncontextmenu  = function(e)
	{
		var evt = new Object({keyCode:93});
		if(e.preventDefault != undefined)
			e.preventDefault();
		if(e.stopPropagation != undefined)
			e.stopPropagation();
		mouseUp(evt);
	}
	interval = setInterval(simulation,interval_timeout);

	//displaying initial speed
	document.getElementById("p_speed").innerHTML = "Speed = " + 1000/interval_timeout + " generations per sec"
}