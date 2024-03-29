const MonsterTruck = require('./MonsterTruck')

describe('MonsterTruck', () => {
  let monsterTruck

  beforeEach(() => {
    monsterTruck = new MonsterTruck()
  })

  afterEach(() => {
    monsterTruck = null
  })

  describe('setDimensions', () => {
    it('sets dimensions', () => {
      monsterTruck.setDimensions({ width: 1, height: 2 })
      expect(monsterTruck.roomDimensions).toEqual({ width: 1, height: 2 })
    })
  })

  describe('setPosition', () => {
    it('sets position if inside of bounds', () => {
      monsterTruck.setDimensions({ width: 2, height: 2 })
      monsterTruck.setPosition(0, 1)
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(1)
    })

    it('does not set position if outside of bounds', () => {
      monsterTruck.setDimensions({ width: 2, height: 2 })
      try {
        monsterTruck.setPosition(3, 2)
      } catch (error) {
        expect(error).toEqual(Error('Position out of bounds, please try again?'))
      }
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(0)
    })
  })

  describe('setCrashed', () => {
    it('sets hasCrashed to true', () => {
      monsterTruck.setCrashed()
      expect(monsterTruck.hasCrashed).toEqual(true)
    })
  })

  describe('isPositionOutOfBounds', () => {
    it('handles valid coordinations', () => {
      monsterTruck.setDimensions({ width: 2, height: 2 })
      expect(monsterTruck.isPositionOutOfBounds(1, 1)).toEqual(false)
    })

    it('handles invalid coordinations', () => {
      monsterTruck.setDimensions({ width: 2, height: 2 })
      expect(monsterTruck.isPositionOutOfBounds(-1, 2)).toEqual(true)
      expect(monsterTruck.isPositionOutOfBounds(1, 3)).toEqual(true)
    })
  })

  describe('setHeading', () => {
    it('handles valid heading', () => {
      monsterTruck.setHeading('s')
      expect(monsterTruck.heading).toEqual('s')
    })
    
    it('handles invalid heading', () => {
      try {
        monsterTruck.setHeading('a')
      } catch (error) {
        expect(error).toEqual(
          Error(
            'Invalid heading, must be North(N), East(E), South(S) or West(W)',
          ),
        )
      }
      expect(monsterTruck.heading).toEqual('n')
    })
  })

  describe('goForward', () => {
    it('sets hasCrashed if out of bounds', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(3, 3)
      monsterTruck.setHeading('n')
      monsterTruck.goForward()
      expect(monsterTruck.hasCrashed).toEqual(true)
    })


    it('moves vehicle north if headed north', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('n')
      monsterTruck.goForward()
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(1)
      expect(monsterTruck.heading).toEqual('n')
    })

    it('moves vehicle east if headed east', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('e')
      monsterTruck.goForward()

      expect(monsterTruck.position.x).toEqual(1)
      expect(monsterTruck.position.y).toEqual(0)
      expect(monsterTruck.heading).toEqual('e')
    })

    it('moves vehicle south if headed south', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 1)
      monsterTruck.setHeading('s')
      monsterTruck.goForward()
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(0)
      expect(monsterTruck.heading).toEqual('s')
    })

    it('moves vehicle west if headed west', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(1, 0)
      monsterTruck.setHeading('w')
      monsterTruck.goForward()
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(0)
      expect(monsterTruck.heading).toEqual('w')
    })
  })

  describe('goBackward', () => {
    it('moves vehicle south if headed north', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 1)
      monsterTruck.setHeading('n')
      monsterTruck.goBackward()
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(0)
      expect(monsterTruck.heading).toEqual('n')
    })

    it('moves vehicle west if headed east', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(1, 0)
      monsterTruck.setHeading('e')
      monsterTruck.goBackward()
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(0)
      expect(monsterTruck.heading).toEqual('e')
    })

    it('moves vehicle north if headed south', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('s')
      monsterTruck.goBackward()
      expect(monsterTruck.position.x).toEqual(0)
      expect(monsterTruck.position.y).toEqual(1)
      expect(monsterTruck.heading).toEqual('s')
    })

    it('moves vehicle east if headed west', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('w')
      monsterTruck.goBackward()
      expect(monsterTruck.position.x).toEqual(1)
      expect(monsterTruck.position.y).toEqual(0)
      expect(monsterTruck.heading).toEqual('w')
    })
  })

  describe('turnRight', () => {
    it('turns east if headed north', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('n')
      monsterTruck.turnRight()
      expect(monsterTruck.heading).toEqual('e')
    })
    it('turns south if headed east', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('e')
      monsterTruck.turnRight()
      expect(monsterTruck.heading).toEqual('s')
    })
    it('turns west if headed south', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('s')
      monsterTruck.turnRight()
      expect(monsterTruck.heading).toEqual('w')
    })
    it('turns north if headed west', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('w')
      monsterTruck.turnRight()
      expect(monsterTruck.heading).toEqual('n')
    })
  })

  describe('turnLeft', () => {
    it('turns west if headed north', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('n')
      monsterTruck.turnLeft()
      expect(monsterTruck.heading).toEqual('w')
    })
    it('turns south if headed west', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('w')
      monsterTruck.turnLeft()
      expect(monsterTruck.heading).toEqual('s')
    })
    it('turns east if headed south', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('s')
      monsterTruck.turnLeft()
      expect(monsterTruck.heading).toEqual('e')
    })
    it('turns north if headed east', () => {
      monsterTruck.setDimensions({ width: 4, height: 4 })
      monsterTruck.setPosition(0, 0)
      monsterTruck.setHeading('e')
      monsterTruck.turnLeft()
      expect(monsterTruck.heading).toEqual('n')
    })
  })
})
