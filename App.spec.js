const App = require('./App')

describe('App', () => {
  let app

  beforeEach(() => {
    app = new App()
  })

  afterEach(() => {
    app = null
  })

  describe('setDimensions', () => {
    it('sets dimensions', () => {
      app.setDimensions({ width: 1, height: 2}) 
      expect(app.dimensions).toEqual({ width: 1, height: 2 })
    })
  })

  describe('isPositionInvalid', () => {
    it('handles valid coordinations', () => {
      app.setDimensions({ width: 2, height: 2 })
      expect(app.isPositionInvalid(1, 2)).toEqual(false)
    })

    it('handles invalid coordinations', () => {
      app.setDimensions({ width: 2, height: 2 })
      expect(app.isPositionInvalid(-1, 2)).toEqual(true)
      expect(app.isPositionInvalid(1, 3)).toEqual(true)
    })
  })

  describe('parseForDimensions', () => {
    it('handles valid input', () => {
      app.parseForDimensions('1 1')
      expect(app.dimensions).toEqual({ width: 1, height: 1 })
    })

    it('handles missing input', () => {
      app.parseForDimensions('')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual('Invalid command')
    })

    it('handles invalid input', () => {
      app.parseForDimensions('1 f')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual('Invalid command')
    })
  })

  it('setHeading sets heading', () => {
    app.setHeading('s')
    expect(app.heading).toEqual('s')
  })

  describe('parseForStartingPosition', () => {
    it('handles valid input', () => {
      app.parseForStartingPosition('0 0 E')
      expect(app.position).toEqual({ x: 0, y: 0 })
      expect(app.heading).toEqual('e')
    })

    it('handles missing input', () => {
      app.parseForStartingPosition('')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual(
        'Invalid number of parameters given',
      )
    })

    it('handles coordinates not being numbers', () => {
      app.parseForStartingPosition('a a a')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual(
        'Coordinates must be numbers',
      )
    })

    it('handles coordinates being out of bounds', () => {
      app.parseForDimensions('1 1')
      app.parseForStartingPosition('-1 -1 n')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual(
        'Starting position is out of bounds',
      )
    })

    it('handles invalid heading', () => {
      app.parseForDimensions('1 1')
      app.parseForStartingPosition('0 0 a')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual(
        'Invalid heading, must be North(N), East(E), South(S) or West(W)',
      )
    })
  })

  describe('goForward', () => {
    it('moves vehicle north if headed north', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 n')
      app.goForward()
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(1)
      expect(app.heading).toEqual('n')
    })
    
    it('moves vehicle east if headed east', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 e')
      app.goForward()
      expect(app.position.x).toEqual(1)
      expect(app.position.y).toEqual(0)
      expect(app.heading).toEqual('e')
    })
    
    it('moves vehicle south if headed south', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 s')
      app.goForward()
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(0)
      expect(app.heading).toEqual('s')
    })
    
    it('moves vehicle west if headed west', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('1 0 w')
      app.goForward()
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(0)
      expect(app.heading).toEqual('w')
    })
  })

  describe('goBackward', () => {
    it('moves vehicle south if headed north', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.goBackward()
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(0)
      expect(app.heading).toEqual('n')
    })
    
    it('moves vehicle west if headed east', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('1 0 e')
      app.goBackward()
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(0)
      expect(app.heading).toEqual('e')
    })
    
    it('moves vehicle north if headed south', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 s')
      app.goBackward()
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(1)
      expect(app.heading).toEqual('s')
    })
    
    it('moves vehicle east if headed west', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 w')
      app.goBackward()
      expect(app.position.x).toEqual(1)
      expect(app.position.y).toEqual(0)
      expect(app.heading).toEqual('w')
    })
  })

  describe('turnRight', () => {
    it('turns east if headed north', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 n')
      app.turnRight()
      expect(app.heading).toEqual('e')
    })
    it('turns south if headed east', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 e')
      app.turnRight()
      expect(app.heading).toEqual('s')
    })
    it('turns west if headed south', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 s')
      app.turnRight()
      expect(app.heading).toEqual('w')
    })
    it('turns north if headed west', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 w')
      app.turnRight()
      expect(app.heading).toEqual('n')
    })
  })

  describe('turnLeft', () => {
    it('turns west if headed north', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 n')
      app.turnLeft()
      expect(app.heading).toEqual('w')
    })
    it('turns south if headed west', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 w')
      app.turnLeft()
      expect(app.heading).toEqual('s')
    })
    it('turns east if headed south', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 s')
      app.turnLeft()
      expect(app.heading).toEqual('e')
    })
    it('turns north if headed east', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 e')
      app.turnLeft()
      expect(app.heading).toEqual('n')
    })
  })

  describe('parseForMovement', () => {
    it('handles valid input "f"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 e')
      app.parseForMovement('f')
      expect(app.heading).toEqual('e')
      expect(app.position.x).toEqual(1)
      expect(app.position.y).toEqual(0)
    })

    it('handles valid input "b"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.parseForMovement('b')
      expect(app.heading).toEqual('n')
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(0)
    })

    it('handles valid input "r"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.parseForMovement('r')
      expect(app.heading).toEqual('e')
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(1)
    })

    it('handles valid input "l"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.parseForMovement('l')
      expect(app.heading).toEqual('w')
      expect(app.position.x).toEqual(0)
      expect(app.position.y).toEqual(1)
    })

    it('handles invalid input', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 e')
      app.parseForMovement('q')
      expect(app.errorHandler.error).toEqual(true)
      expect(app.errorHandler.message).toEqual(
        'Invalid movement, must be Forward(F), Backward(B), Turn Right(R) or Turn Left(L)',
      )
    })
  })
})
