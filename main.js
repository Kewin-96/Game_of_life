/*import * as DrawingTools from "./JS/drawing_tools.js";
import * as InputEvents from "./JS/input_events.js";
import * as Simulation from "./JS/simulation.js";
import * as UpdatingCells from "./JS/updating_cells.js";*/

const canvas_margin = 8;
const canvas_width = 800;
const canvas_height = 800;
const cell_dimension = 10;
const cell_x_count = canvas_width / cell_dimension;
const cell_y_count = canvas_height / cell_dimension;
const cell_margin = 1;
pushed = false;             // if any mouse button is pressed
last_mouse_cell_position = null;
generation = 1;
living_cells = [];          //80x80 arrays of object {x,y} (cell)
new_generation = [];        //80x80 arrays of object {x,y} (cell)

// window.onload=function() - executes when loading site
window.onload=function()
{
    if(cell_x_count != this.parseInt(cell_x_count) || cell_y_count != this.parseInt(cell_y_count))
        throw 'cell_x_count or cell_y_count is not integer !!!';

    //setting canvas dimensions
    canv=document.getElementById("gc");
    canv.width = canvas_width;
    canv.height = canvas_height;

    //filling canvas with gridcell
    ctx=canv.getContext("2d");
    ctx.fillStyle="#404040";
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.fillStyle="black";
    for(i = 0; i < cell_x_count; i++)
        for(j = 0; j < cell_x_count; j++)
            ctx.fillRect(i*10,j*10,cell_dimension-cell_margin,cell_dimension-cell_margin);

    //initializing array
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
}