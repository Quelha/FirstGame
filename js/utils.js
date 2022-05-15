function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBoxe.position.x + rectangle1.attackBoxe.width >=
      rectangle2.position.x &&
    rectangle1.attackBoxe.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBoxe.position.y + rectangle1.attackBoxe.height >=
      rectangle2.position.y &&
    rectangle1.attackBoxe.position.y <=
      rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
  }
}

let timer = 60
let timerId
function decreseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}