class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framsElapsed = 0
    this.framesHold = 6
  }
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,

      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }
  update() {
    this.draw()
    this.framsElapsed++

    if (this.framsElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
}

class Fighter {
  constructor({ position, velocity, color = 'red', offset }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBoxe = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50
    }
    this.color = color
    this.isAttacking
    this.health = 100
  }
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //attacBoxer
    if (this.isAttacking) {
      c.fillStyle = 'green'
      c.fillRect(
        this.attackBoxe.position.x,
        this.attackBoxe.position.y,
        this.attackBoxe.width,
        this.attackBoxe.height
      )
    }
  }
  update() {
    this.draw()
    this.attackBoxe.position.x = this.position.x + this.attackBoxe.offset.x
    this.attackBoxe.position.y = this.position.y

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0
    } else this.velocity.y += gravity
  }
  attack() {
    this.isAttacking = true
    setTimeout(() => {
      player.isAttacking = false
    }, 100)
    setTimeout(() => {
      enemy.isAttacking = false
    }, 100)
  }
}
