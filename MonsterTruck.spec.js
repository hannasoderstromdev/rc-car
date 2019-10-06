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
    it('sets position', () => {
      monsterTruck.setPosition(1, 2)
      expect(monsterTruck.position.x).toEqual(1)
      expect(monsterTruck.position.y).toEqual(2)
    })
  })

  describe('isPositionOutOfBounds', () => {
    it('handles valid coordinations', () => {
      monsterTruck.setDimensions({ width: 2, height: 2 })
      expect(monsterTruck.isPositionOutOfBounds(1, 2)).toEqual(false)
    })

    it('handles invalid coordinations', () => {
      monsterTruck.setDimensions({ width: 2, height: 2 })
      expect(monsterTruck.isPositionOutOfBounds(-1, 2)).toEqual(true)
      expect(monsterTruck.isPositionOutOfBounds(1, 3)).toEqual(true)
    })
  })

  describe('setHeading', () => {
    it('sets heading', () => {
      monsterTruck.setHeading('s')
      expect(monsterTruck.heading).toEqual('s')
    })
  })

  describe('goForward', () => {
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
