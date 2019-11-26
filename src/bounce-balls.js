// Our dataset of balls
// I am exporting them so we can manage them in the app.
// The alternative is not to export them and handle them
// here...
export let balls = new Array()

// Colours we can cycle through
let colour = '#F00'
let colourMap = new Map()
colourMap.set('#F00', '#0F0')
colourMap.set('#0F0', '#00F')
colourMap.set('#00F', '#000')
colourMap.set('#000', '#F00')
export function changeColour() {
    colour = colourMap.get(colour)
}

// Models we can cycle through
// I have implemented two models:
// - LINEAR the one shown in the example
// - GRAVITY a more interesting one
// Mode models may be added by making this public
// The required methods are:
// - nextStep (draw and update model)
// - initModel (for constructor)
// - reinitModel (for changeModel)
export let Models = {
    LINEAR: 0,
    GRAVITY: 1,
}
let model = Models.LINEAR
let modelMap = new Map()
modelMap.set(Models.LINEAR, {
    nextStep: function() {
        if (isNaN(this.minY)) {
            this.minY = this.y
        }
        this.x += Math.abs(this.vx)
        this.y += this.vy
        if (this.y < this.minY) {
            this.y = this.minY + (this.minY - this.y)
            this.vy = Math.abs(this.vy)
        } else if (this.y > this.cheight) {
            this.y = this.cheight - (this.cheight - this.y)
            this.vy = -this.vy
        }
        this.minY += Math.max(Math.abs(this.vx), Math.abs(this.vy)) / 10
        this.energy = this.minY < this.cheight ? 1 : 0
    },
    initModel(ball) {
        ball.minY = ball.y
        ball.vy = Math.abs(ball.vy)
        ball.vx = Math.abs(ball.vx)
    },
    reinitModel: function() {
        balls.forEach(ball => {
            modelMap.get(Models.LINEAR).initModel(ball)
            ball.nextStep = modelMap.get(Models.LINEAR).nextStep
        })
    },
})
modelMap.set(Models.GRAVITY, {
    nextStep: function() {
        // Move to new point
        this.x = this.x + this.vx
        this.y = this.y + this.vy

        // Get energy at new point
        let k = this.energy - this.potential()

        // Get velocity at new point
        let v = this.velocityFromEnergy(k)
        let vy = Math.sqrt(v * v)
        if (this.vy >= 0) {
            this.vy = vy
        } else {
            this.vy = -vy
        }
        // Add 'gravity' - because it is a velocity and not an accelerations,
        // we need to perturb it around the maxima
        this.vy += this.g
        if (Math.abs(this.vy) < 0.0001) {
            this.vy += this.g
        }

        // Check interactions with the surrounding box
        if (this.x <= 0) {
            this.x = -this.x
            this.vx = -this.vx
        } else if (this.x >= this.cwidth) {
            this.x = this.cwidth - (this.cwidth - this.x)
            this.vx = -this.vx
        }
        if (this.y <= 0) {
            this.y = -this.y
            this.vy = -this.vy
        } else if (this.y >= this.cheight) {
            this.y = this.cheight - (this.cheight - this.y)
            this.vy = -this.vy
            this.energy -= this.energyLossOnBounce
        }
    },
    initModel(ball) {
        ball.height = modelMap.get(Models.GRAVITY).height
        ball.potential = modelMap.get(Models.GRAVITY).potential
        ball.kinetic = modelMap.get(Models.GRAVITY).kinetic
        ball.velocityFromEnergy = modelMap.get(
            Models.GRAVITY
        ).velocityFromEnergy
        ball.energyLossOnBounce = 50
        ball.g = 1.0
        ball.energy = ball.potential() + ball.kinetic()
    },
    reinitModel: function() {
        balls.forEach(ball => {
            modelMap.get(Models.GRAVITY).initModel(ball)
            ball.nextStep = modelMap.get(Models.GRAVITY).nextStep
        })
    },
    height: function() {
        return this.cheight - this.y
    },
    potential: function() {
        return this.g * this.height()
    },
    kinetic: function() {
        return 0.5 * this.vy * this.vy
    },
    velocityFromEnergy: function(k) {
        if (k <= 0) {
            return 0
        }
        return Math.sqrt(2.0 * k)
    },
})
export function changeModel() {
    if (model == Models.LINEAR) {
        model = Models.GRAVITY
    } else if (model == Models.GRAVITY) {
        model = Models.LINEAR
    }
    if (model === Models.LINEAR) {
        modelMap.get(Models.LINEAR).reinitModel()
    } else if (model === Models.GRAVITY) {
        modelMap.get(Models.GRAVITY).reinitModel()
    }
}

// Our ball class
// Initialise to random velocity
export class Ball {
    constructor(x, y, context, width, height) {
        this.x = x
        this.y = y
        this.context = context
        this.cwidth = width
        this.cheight = height
        this.model = model

        this.speed = Math.random() * Ball.initialSpeed + 1.0
        this.angle = Math.random() * 2.0 * Math.PI
        this.vx = this.speed * Math.cos(this.angle)
        this.vy = this.speed * Math.sin(this.angle)

        this.nextStep = modelMap.get(model).nextStep
        modelMap.get(model).initModel(this)
    }

    draw() {
        // Draw the ball at the current position
        this.context.fillStyle = colour
        this.context.fillRect(this.x - 1, this.y - 1, 3, 3)

        // Move the ball to the next position
        this.nextStep()
    }
}
Ball.initialSpeed = 10

export default { Ball, Models, balls, changeColour, changeModel }
