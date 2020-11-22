LMBpushed = false;
thickness = 10;
const margin = 8;

window.onload=function()
{
    canv=document.getElementById("gc");		// uzyskiwanie w zmiennej (w JS) odniesienia do elementu z HTML po id
    ctx=canv.getContext("2d");				// uzyskanie kontekstu, który w tym przypadku pozwala na operacje na płutnie (canvas)
    document.addEventListener("mousemove",mouseMove);
    document.addEventListener("mousedown",mousePush);
    document.addEventListener("mouseup",mouseUnpush);
    ctx.fillStyle="black";						// w pewnym sensie ustawienie koloru pędzla na czarny
    ctx.fillRect(0,0,canv.width,canv.height);	// wypełnienie kolorem pędzla prostokątu o podanym położeniu i wymiarach (x,y,width,height)
}

function draw(x,y)
{
    ctx.fillStyle="#FF0000FF";
    ctx.fillRect(parseInt(x)-margin-thickness/2,parseInt(y)-margin-thickness/2,thickness,thickness);
}
function mouseMove(evt)
{
    if(LMBpushed == true)
    {
        x = evt.clientX;
        y = evt.clientY;
        coords = `X coords:  + ${x} + , Y coords:  + ${y}`;
        document.getElementById("test").innerHTML = coords;
        draw(x,y);
    }
}
function mousePush(evt)
{
    LMBpushed = true;
    x = evt.clientX;
    y = evt.clientY;
    coords = `X coords:  + ${x} + , Y coords:  + ${y}`;
    document.getElementById("test").innerHTML = coords;
    draw(x,y);
}
function mouseUnpush(evt)
{
    LMBpushed = false;
}