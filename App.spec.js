const App = require('./App')

const mockSetDimensions = jest.fn()
const mockIsPositionOutOfBounds = jest.fn()
const mockSetPosition = jest.fn()
const mockSetHeading = jest.fn()
const mockGoForward = jest.fn()
const mockGoBackward = jest.fn()
const mockTurnRight = jest.fn()
const mockTurnLeft = jest.fn()

jest.mock('./MonsterTruck', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setDimensions: mockSetDimensions,
      setPosition: mockSetPosition,
      setHeading: mockSetHeading,
      goForward: mockGoForward,
      goBackward: mockGoBackward,
      turnRight: mockTurnRight,
      turnLeft: mockTurnLeft,
    }
  })
})

describe('App', () => {
  let app

  beforeEach(() => {
    app = new App()
  })

  afterEach(() => {
    app = null
  })

  describe('parseForDimensions', () => {
    it('handles valid input', () => {
      app.parseForDimensions('1 1')
      expect(mockSetDimensions).toHaveBeenCalledWith({ width: 1, height: 1 })
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

  describe('parseForStartingPosition', () => {
    it('handles valid input', () => {
      app.parseForStartingPosition('0 0 E')
      expect(mockSetPosition).toHaveBeenCalledWith(0, 0)
      expect(mockSetHeading).toHaveBeenCalledWith('e')
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
  })

  describe('parseForMovement', () => {
    it('handles valid input "f"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 0 e')
      app.parseForMovement('f')
      expect(mockGoForward).toHaveBeenCalledTimes(1)
    })

    it('handles valid input "b"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.parseForMovement('b')
      expect(mockGoBackward).toHaveBeenCalledTimes(1)

    })

    it('handles valid input "r"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.parseForMovement('r')
      expect(mockTurnRight).toHaveBeenCalledTimes(1)
    })

    it('handles valid input "l"', () => {
      app.parseForDimensions('4 4')
      app.parseForStartingPosition('0 1 n')
      app.parseForMovement('l')
      expect(mockTurnLeft).toHaveBeenCalledTimes(1)
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
