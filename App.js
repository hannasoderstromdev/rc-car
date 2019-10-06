const ErrorHandler = require('./ErrorHandler')
const MonsterTruck = require('./MonsterTruck')
const query = require('./query')

class App {
  constructor() {
    this.parseForDimensions = this.parseForDimensions.bind(this)
    this.parseForStartingPosition = this.parseForStartingPosition.bind(this)
    this.parseForMovement = this.parseForMovement.bind(this)

    this.errorHandler = new ErrorHandler()
    this.monsterTruck = new MonsterTruck()
  }

  parseForDimensions(text) {
    const parsedText = text.split(' ').map(number => parseInt(number))

    if (parsedText.length === 2 && !parsedText.includes(NaN)) {
      this.monsterTruck.setDimensions({ width: parsedText[0], height: parsedText[1] })
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

    if (this.monsterTruck.isPositionOutOfBounds(x, y)) {
      return this.errorHandler.setError('Starting position is out of bounds')
    }

    const heading = parsedText[2].toLowerCase()

    if (heading !== 'n' && heading !== 'e' && heading !== 's' && heading !== 'w') {
      return this.errorHandler.setError('Invalid heading, must be North(N), East(E), South(S) or West(W)')
    }

    this.monsterTruck.setPosition(x, y)
    this.monsterTruck.setHeading(heading)
  }

  parseForMovement(text) {
    const lowerCased = text.toLowerCase()
    if (lowerCased !== 'f' && lowerCased !== 'b' && lowerCased !== 'r' && lowerCased !== 'l') {
      return this.errorHandler.setError('Invalid movement, must be Forward(F), Backward(B), Turn Right(R) or Turn Left(L)')
    }

    const { monsterTruck } = this

    if (lowerCased === 'f') monsterTruck.goForward()
    if (lowerCased === 'b') monsterTruck.goBackward()
    if (lowerCased === 'r') monsterTruck.turnRight()
    if (lowerCased === 'l') monsterTruck.turnLeft()
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

    const {  hasCrashed, heading, position: { x, y } } = this.monsterTruck

    // Drive until crash
    while(!hasCrashed) {
      await query(questions[2].text)
    }

    console.log(`You have crashed into the wall! Position x:${x}, y:${y}, heading: ${heading}.`)
    this.quit()
  }
}

module.exports = App
