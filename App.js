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

    const heading = parsedText[2].toLowerCase()

    try {
      this.monsterTruck.setHeading(heading)
    } catch (error) {
      return this.errorHandler.setError(error.message + '\n')
    }

    try {
      this.monsterTruck.setPosition(x, y)
    } catch (error) {
      return this.errorHandler.setError(error.message + '\n')
    }
  }

  parseForMovement(text) {
    const lowerCased = text.toLowerCase()
    if (lowerCased !== 'f' && lowerCased !== 'b' && lowerCased !== 'r' && lowerCased !== 'l') {
      return this.errorHandler.setError('Invalid movement, must be Forward(F), Backward(B), Turn Right(R) or Turn Left(L)')
    }

    try {
      if (lowerCased === 'f') this.monsterTruck.goForward()
      if (lowerCased === 'b') this.monsterTruck.goBackward()
      if (lowerCased === 'r') this.monsterTruck.turnRight()
      if (lowerCased === 'l') this.monsterTruck.turnLeft()
    } catch (error) {
      this.errorHandler.setError(error.message + '\n')
    }
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

    const {
      heading,
      position: { x, y },
    } = this.monsterTruck

    // Drive until crash
    while (!this.monsterTruck.hasCrashed) {
      await query(questions[2].text, questions[2].callback)
    }

    console.log(`You have crashed into the wall! Position x:${x}, y:${y}, heading: ${heading}.`)
    this.quit()
  }
}

module.exports = App
