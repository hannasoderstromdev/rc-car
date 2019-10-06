const ErrorHandler = require('./ErrorHandler')
const query = require('./query')

class App {
  constructor() {
    this.parseForDimensions = this.parseForDimensions.bind(this)
    this.setDimensions = this.setDimensions.bind(this)
    this.setHeading = this.setHeading.bind(this)
    this.parseForStartingPosition = this.parseForStartingPosition.bind(this)
    this.parseForMovement = this.parseForMovement.bind(this)

    this.dimensions = {
      width: 0,
      height: 0,
    }
    this.errorHandler = new ErrorHandler()
    this.position = {
      x: 0,
      y: 0,
    }
    this.heading = 'n'
    this.hasCrashed = false
  }

  setDimensions({ width, height }) {
    this.dimensions = { width, height }
  }

  setHeading(heading) {
    this.heading = heading
  }

  setPosition(x, y) {
    this.position.x = x
    this.position.y = y
  }

  setCrashed() {
    this.hasCrashed = true
  }

  parseForDimensions(text) {
    const parsedText = text.split(' ').map(number => parseInt(number))

    if (parsedText.length === 2 && !parsedText.includes(NaN)) {
      this.setDimensions({ width: parsedText[0], height: parsedText[1] })
    } else {
      this.errorHandler.setError('Invalid command')
    } 
  }

  parseForStartingPosition(text) {
    const parsedText = text.split(' ')

    if (parsedText.length !== 3) {
      return this.errorHandler.setError('Invalid number of parameters given')
    }

    const x = parseInt(parsedText[0])
    const y = parseInt(parsedText[1])

    if (isNaN(x) || isNaN(y)) {
      return this.errorHandler.setError('Coordinates must be numbers')
    }

    if (this.isPositionInvalid(x, y)) {
      return this.errorHandler.setError('Starting position is out of bounds')
    }

    this.setPosition(x, y)
        
    const heading = parsedText[2].toLowerCase()

    if (heading !== 'n' && heading !== 'e' && heading !== 's' && heading !== 'w') {
      return this.errorHandler.setError('Invalid heading, must be North(N), East(E), South(S) or West(W)')
    }

    this.setHeading(heading)
  }

  parseForMovement(text) {
    const lowerCased = text.toLowerCase()
    if (lowerCased !== 'f' && lowerCased !== 'b' && lowerCased !== 'r' && lowerCased !== 'l') {
      return this.errorHandler.setError('Invalid movement, must be Forward(F), Backward(B), Turn Right(R) or Turn Left(L)')
    }

    if (lowerCased === 'f') this.goForward()
    if (lowerCased === 'b') this.goBackward()
    if (lowerCased === 'r') this.turnRight()
    if (lowerCased === 'l') this.turnLeft()
  }

  turnRight() {
    const { heading, setHeading } = this
    if (heading === 'n') setHeading('e')
    if (heading === 'e') setHeading('s')
    if (heading === 's') setHeading('w')
    if (heading === 'w') setHeading('n')
  }

  turnLeft() {
    const { heading, setHeading } = this
    if (heading === 'n') setHeading('w')
    if (heading === 'w') setHeading('s')
    if (heading === 's') setHeading('e')
    if (heading === 'e') setHeading('n')
  }

  goForward() {
    const { heading } = this
    const { x, y } = this.position
    if (heading === 'n' && !this.isPositionInvalid(x, y + 1)) {
      this.setPosition(x, y + 1)
    }
    else if (heading === 'e' && !this.isPositionInvalid(x + 1, y)) {
      this.setPosition(x + 1, y)
    }
    else if (heading === 's' && !this.isPositionInvalid(x, y - 1)) {
      this.setPosition(x, y - 1)
    }
    else if (heading === 'w' && !this.isPositionInvalid(x - 1, y)) {
      this.setPosition(x - 1, y)
    }
    else {
      this.setCrashed()
    }
  }

  goBackward() {
    const { heading } = this
    const { x, y } = this.position
    if (heading === 'n' && !this.isPositionInvalid(x, y - 1)) {
      this.setPosition(x, y - 1)
    } else if (heading === 'e' && !this.isPositionInvalid(x - 1, y)) {
      this.setPosition(x - 1, y)
    } else if (heading === 's' && !this.isPositionInvalid(x, y + 1)) {
      this.setPosition(x, y + 1)
    } else if (heading === 'w' && !this.isPositionInvalid(x + 1, y)) {
      this.setPosition(x + 1, y)
    } else {
      this.setCrashed()
    }
  }

  isPositionInvalid(x, y) {
    const { width, height } = this.dimensions

    return (x < 0 || x > width || y < 0 || y > height) 
  }

  quit() {
    console.log('Goodbye')
    process.exit()
  }

  async start() {

    const questions = [
      {
        text:
          'What size would you like the room to be? Enter dimensions by two numbers separated by a space and press Enter.\n',
        callback: this.parseForDimensions,
      },
      {
        text:
          'Enter starting position in the room with X and Y coordinates and your heading, North(N), East(E), South(S) or West(W)\n',
        callback: this.parseForStartingPosition,
      },
      {
        text:
          'Where do you want to go? Forward(F), Backward(B), Turn Left(L) or Turn Right(R)?\n',
        callback: this.parseForMovement,
      },
    ]
    
    // Set up room size, starting position and heading
    for (const index in questions) {
      const question = questions[index]
      if (this.errorHandler.error) {
        const previousQuestion = questions[index -1]
        await query(this.errorHandler.message, previousQuestion.callback)
      }
      await query(question.text, question.callback)
    }

    // Drive until crash
    while(!this.hasCrashed) {
      await query(questions[2].text)
    }

    const { x, y } = this.position
    console.log(`You have crashed into the wall! Position x:${x}, y:${y}, heading: ${this.heading}.`)
    this.quit()
  }
}

module.exports = App
