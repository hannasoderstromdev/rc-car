class MonsterTruck {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    }
    this.heading = 'n'
    this.roomDimensions = {
      width: 0,
      height: 0,
    }
    this.hasCrashed = false
  }

  setDimensions({ width, height }) {
    this.roomDimensions = { width, height }
  }

  setPosition(x, y) {
    if (!this.isPositionOutOfBounds(x, y)) {
      this.position = { x, y }
    } else {
      throw Error('Position out of bounds')
    }
  }

  setHeading(heading) {
    this.heading = heading
  }

  setCrashed() {
    this.hasCrashed = true
  }

  isPositionOutOfBounds(x, y) {
    const { width, height } = this.roomDimensions

    return x < 0 || x >= width || y < 0 || y >= height
  }

  turnRight() {
    const { heading } = this
    if (heading === 'n') this.setHeading('e')
    if (heading === 'e') this.setHeading('s')
    if (heading === 's') this.setHeading('w')
    if (heading === 'w') this.setHeading('n')
  }

  turnLeft() {
    const { heading } = this
    if (heading === 'n') this.setHeading('w')
    if (heading === 'w') this.setHeading('s')
    if (heading === 's') this.setHeading('e')
    if (heading === 'e') this.setHeading('n')
  }

  goForward() {
    const { heading } = this
    const { x, y } = this.position
    if (heading === 'n' && !this.isPositionOutOfBounds(x, y + 1)) {
      this.setPosition(x, y + 1)
    } else if (heading === 'e' && !this.isPositionOutOfBounds(x + 1, y)) {
      this.setPosition(x + 1, y)
    } else if (heading === 's' && !this.isPositionOutOfBounds(x, y - 1)) {
      this.setPosition(x, y - 1)
    } else if (heading === 'w' && !this.isPositionOutOfBounds(x - 1, y)) {
      this.setPosition(x - 1, y)
    } else {
      this.setCrashed()
    }
  }

  goBackward() {
    const { heading } = this
    const { x, y } = this.position
    if (heading === 'n' && !this.isPositionOutOfBounds(x, y - 1)) {
      this.setPosition(x, y - 1)
    } else if (heading === 'e' && !this.isPositionOutOfBounds(x - 1, y)) {
      this.setPosition(x - 1, y)
    } else if (heading === 's' && !this.isPositionOutOfBounds(x, y + 1)) {
      this.setPosition(x, y + 1)
    } else if (heading === 'w' && !this.isPositionOutOfBounds(x + 1, y)) {
      this.setPosition(x + 1, y)
    } else {
      this.setCrashed()
    }
  }
}

module.exports = MonsterTruck
