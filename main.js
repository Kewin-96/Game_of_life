//board dimensions
cell_width = 10;					//cell width
cell_x_count = 80;					//width of board
cell_y_count = 80;					//height of board
const CELL_MARGIN = 1;				//thickness of gridcell lines

//interval variables
var interval;						//id of created interval
interval_timeout = 125;				//interval timeout (1/interval_timeout = frequency of calculating generations)

//cells data
living_cells = [];					//2D arrays of cells {x,y}:				current displayed generation
first_generation = [];				//2D arrays of cells {x,y}:				first generation
new_generation = [];				//2D arrays of cells {x,y}:				used for calculate new generation
buffor_cells = [];					//array of 2D arrays of cells {x,y}:	for "redo", "undo" operations
buffor_cells_pointer = 0;			//pointer of "undo", "redo" operations. Pointer indicate place in buffor_cells array which is now displayed.
const MAX_BUFFOR_CELLS_LENGTH = 30;	//max length of buffor_cells (maximum number of "undo" operations)

//miscellaneous
pushed = false;						//is any mouse button is pressed?
last_mouse_cell_position = null;	//last cell position pointed with cursor
started = false;					//is simulation is started?
generation = 1;						//generation iterator

//window.onload=function() - executes when loading site
window.onload=function()
{
	if(cell_x_count != this.parseInt(cell_x_count) || cell_y_count != this.parseInt(cell_y_count))
		throw 'cell_x_count or cell_y_count is not integer !!!';

	//initializing canvas and simulation
	init_canvas();
	init_simulation();

	//adding event listeners
	canv.addEventListener("mousemove",mouseMove);
	canv.addEventListener("mousedown",mouseDown);
	canv.addEventListener("mouseup",mouseUp);
	document.addEventListener("keydown",keyDown);
	document.getElementById("inputText_x_cells").addEventListener("change",dimensionsFormChanged);
	document.getElementById("inputText_y_cells").addEventListener("change",dimensionsFormChanged);
	document.getElementById("inputText_cell_dim").addEventListener("change",dimensionsFormChanged);
	canv.oncontextmenu  = function(e)
	{
		var evt = new Object({keyCode:93});
		if(e.preventDefault != undefined)
			e.preventDefault();
		if(e.stopPropagation != undefined)
			e.stopPropagation();
	}
	interval = setInterval(simulation,interval_timeout);

	//displaying initial speed
	document.getElementById("p_speed").innerHTML = "Speed = " + 1000/interval_timeout + " generations per sec"

	//initial calculating canvas dimensions for user
	dimensionsFormChanged();
}