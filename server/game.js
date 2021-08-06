import Deck from './deck.js';

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
}

function initGame() {
  const state = createGameState()
  randomFood(state);
  return state;
}

function createGameState() {
    newDeck = new Deck();
    newDeck.cards = newDeck.cards.concat((new Deck()).cards);
    newDeck = newDeck.shuffle();

    state = {
    handArrays: [[], []],
    deck: newDeck,
    pile: [],
    dealer: 2,
    };

    dealCards(state);
    return state;
}

function checkMove(state, move) {

}

function gameLoop(state) {
  if (!state) {
    return;
  }

  const hand1 = state.handArrays[0];
  const hand2 = state.handArrays[1];

  if (hand1.length === 0) {
    return 2;
  }

  if (hand2.length === 0) {
    return 1;
  }



  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood(state);
  }

  if (state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;
    randomFood(state);
  }

  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }

    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  if (playerTwo.vel.x || playerTwo.vel.y) {
    for (let cell of playerTwo.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }

    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.snake.shift();
  }

  return false;
}

function dealCards(state) {
    for (i = 0; i < 10; i++) {
        state.handArrays[(i + state.dealer) % 2].concat(state.deck.splice(-2, 2));
    }
    return state;
}

function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: { // left
      return { x: -1, y: 0 };
    }
    case 38: { // down
      return { x: 0, y: -1 };
    }
    case 39: { // right
      return { x: 1, y: 0 };
    }
    case 40: { // up
      return { x: 0, y: 1 };
    }
  }
}