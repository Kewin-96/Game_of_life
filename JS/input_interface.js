// ****************************************************
// ****************** INPUT INTERFACE *****************
// ****************************************************

function button_undo()
{
    
}
function button_redo()
{
    
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

    //disabling redo and undo buttons
    document.getElementById("button_undo").style = "pointer-events: none; opacity: 0.6;";
    document.getElementById("button_redo").style = "pointer-events: none; opacity: 0.6;";
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

    //DEBUG, TEMP   - trzeba to dac w inne miejsce !!!
    document.getElementById("button_undo").style = "pointer-events: all; opacity: 1;";
    document.getElementById("button_redo").style = "pointer-events: all; opacity: 1;";
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
    //COFNIECIE DO PIERWSZEJ GENERACJI !!!
}

function button_clear()
{
	button_backTo1Gen();
    init_canvas();
    init_simulation();
}