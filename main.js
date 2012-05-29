/*
file: main.js
contributers: Austin Packer

main() goes here at the bottom of the file.
As well as all the functions used in main()

*/

"use strict";

function drawPoint(ctx, px, py, radius)
{
    ctx.beginPath();
    ctx.arc((px), py, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#8ED6FF";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
}


// Main part of program
function runSystem(ctx, state, r, numberOfPoints, dx, radius, ctxHeight, border, scale)
{
    drawPoint(ctx, border, (ctxHeight - border - (state*scale)), radius);
    for (var i = 1; i < numberOfPoints; i++)
    {
        state = r * (1 - state) * state; // quadratic map
        drawPoint(ctx, ((i*dx) + border), (ctxHeight - border - (state*scale)), radius);
    }
}


function drawLine(px1, py1, px2, py2, ctx)
{
    ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(px1, py1);
	ctx.lineTo(px2, py2);
	ctx.closePath();
	ctx.stroke();
}


function drawAxes(ctx, ctxWidth, ctxHeight, border)
{
    drawLine(border, border, border, (ctxHeight - border), ctx); // vertical axis
    drawLine(border, (ctxHeight - border), (ctxWidth - border), (ctxHeight - border), ctx); // horizontal axis
}


function drawLabel(label, px, py, ctx)
{
	ctx.fillStyle = "#000000";	
	ctx.strokeStyle = "#000000";
    ctx.font="20px Arial";
	ctx.fillText(label, px, py);
}


function drawLabels(ctx, ctxHeight, border, scale)
{
    drawLabel("0", (border-20), (ctxHeight-border),ctx);
    drawLabel("1", (border-20), (ctxHeight-border-scale),ctx);
}


function main()
{

	// get the canvas element using the DOM
	var canvas = document.getElementById('myCanvas');

	// Make sure we don't execute when canvas isn't supported
	if (canvas.getContext)
	{
        /// INITIALIZE ALL VARIABLES HERE ///
        
		var numberOfPoints = document.getElementById('iterations').value - 0;
		var ctx = canvas.getContext('2d');
        var ctxWidth = canvas.width;
		var ctxHeight = canvas.height;
        var state = document.getElementById('initialState').value - 0;
        var r = document.getElementById('R').value - 0; // TODO add some presets

        var scale = 400;

        var radius = document.getElementById('radius').value - 0;
        var border = 80; // number of pixels around the graph.

        var graphWidth = ctxWidth - (2 * border); // make room for axes and labels.
        var graphHeight = ctxHeight - (2 * border); // TODO: use this to get scale
        var dx = (graphWidth / numberOfPoints);

		// Draw stuff
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);
        drawAxes(ctx, ctxWidth, ctxHeight, border);
        drawLabels(ctx, ctxHeight, border, scale);
        runSystem(ctx, state, r, numberOfPoints, dx, radius, ctxHeight, border, scale);
        
    } 
	else 
	{
        alert('You need google chrome.');
    }
}


