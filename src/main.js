'use strict'
import { Ball, balls, changeColour, changeModel } from './bounce-balls.js'

let canvas
let context
let canvasWidth = 500
let canvasHeight = 375

// A timer so we have apause in between cycles
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//
// The 'main' function.
//
async function bounceBalls() {
    // Get the canvas and context
    canvas = document.getElementById('bounceBallsCanvas')
    canvas.setAttribute('width', canvasWidth)
    canvas.setAttribute('height', canvasHeight)
    context = canvas.getContext('2d')

    // Add an event to our 'Change Colour' button so we can change the colour of the balls
    canvas.addEventListener(
        'mousedown',
        e => {
            balls.push(
                new Ball(
                    event.pageX,
                    event.pageY,
                    context,
                    canvasWidth,
                    canvasHeight
                )
            )
        },
        false
    )

    // Add an event to the 'Change Colour' button so we can cycle through the defined models
    let button = document.getElementById('changeColourButton')
    button.addEventListener(
        'mousedown',
        e => {
            changeColour()
        },
        false
    )

    // Add an event to the 'Change Model' button so we can cycle through the defined models
    button = document.getElementById('changeModelButton')
    button.addEventListener(
        'mousedown',
        e => {
            console.log(JSON.stringify(e))
            changeModel()
        },
        false
    )

    // Add an event to speed slider control so we can control the maximum initial speed
    let slider = document.getElementById('speedRange')
    slider.value = Ball.initialSpeed
    slider.addEventListener(
        'change',
        e => {
            Ball.initialSpeed = e.srcElement.value
        },
        false
    )

    // Main loop
    while (true) {
        redraw()
        await sleep(100)
    }
}

// Clear the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight)
}

// This draws the current state
// I am exposing the balls and rendering them and controlling them
// here so our app has more control over them - we could change the
// deleteion of the balls, ... or whatever. I could not export them
// and have them handled purely in the bounce-balls module. What we
// do depends on exactly what is required.
function redraw() {
    clearCanvas()

    // Draw the box
    context.beginPath()
    context.rect(1, 1, canvasWidth - 1, canvasHeight - 1)
    context.strokeStyle = '#000'
    context.stroke()

    // Draw the grid
    context.beginPath()
    for (let x = 10; x < canvasWidth; x += 10) {
        context.moveTo(x, 0)
        context.lineTo(x, 375)
    }
    for (let y = 10; y < canvasHeight; y += 10) {
        context.moveTo(0, y)
        context.lineTo(500, y)
    }
    context.strokeStyle = '#EEE'
    context.stroke()

    // Draw each ball
    balls.forEach(ball => {
        // This draws the current state and updates the ball to the next state
        ball.draw(context)
    })

    // Remove 'dead' balls in place
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].energy <= 0) {
            balls.splice(i, 1)
        }
    }
}

export { bounceBalls }
