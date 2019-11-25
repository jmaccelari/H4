import {
    Ball,
    Models,
    balls,
    changeColour,
    changeModel,
} from '../src/bounce-balls.js'

// I could use jest's mocking, but since this is such a simple mock,
// I'll do it here...
class MockContext {
    constructor() {
        this.fillStyle = '#F00'
    }

    fillRect(x, y, w, h) {}
}

// This test checks the constructor correclty constructs a ball
test('test constructor', () => {
    // GIVEN the following parameters for the Ball constructor
    let x = 100
    let y = 50
    let cwidth = 300
    let cheight = 200
    let eLoss = 50
    let g = 1

    // WHEN we construct the ball
    let mockContext = new MockContext()
    let ball = new Ball(x, y, mockContext, cwidth, cheight)

    // THEN we expect the ball to be correctly constructed
    expect(ball.x).toBe(x)
    expect(ball.y).toBe(y)
    expect(ball.cwidth).toBe(cwidth)
    expect(ball.cheight).toBe(cheight)
    expect(ball.model).toBe(Models.GRAVITY)
    expect(ball.speed).toBeGreaterThan(0.0)
    expect(ball.angle).toBeGreaterThanOrEqual(0.0)
    expect(ball.angle).toBeLessThanOrEqual(2.0 * Math.PI)
    expect(ball.vx).not.toBeUndefined()
    expect(ball.vy).not.toBeUndefined()
    expect(ball.nextStep).not.toBeUndefined()
    expect(ball.energyLossOnBounce).toBe(eLoss)
    expect(ball.g).toBe(g)
    expect(ball.energy).toBeGreaterThan(0.0)
})

// This test checks that the Ball.draw() method calls the context.fillRect()
// method once and only after draw() is called.
test('test draw', () => {
    // GIVEN the following parameters for the Ball constructor
    let x = 100
    let y = 50
    let cwidth = 300
    let cheight = 200
    let eLoss = 50
    let g = 1

    jest.spyOn(MockContext.prototype, 'fillRect')

    // WHEN we construct the ball
    let mockContext = new MockContext()
    let ball = new Ball(x, y, mockContext, cwidth, cheight)

    // THEN we can check our method calls...
    expect(MockContext.prototype.fillRect).toHaveBeenCalledTimes(0)

    // WHEN we draw the ball
    ball.draw()

    // THEN we expect our mock to have been called
    expect(MockContext.prototype.fillRect).toHaveBeenCalledTimes(1)
})
