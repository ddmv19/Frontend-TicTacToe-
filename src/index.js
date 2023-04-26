import './styles.css';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

const spacesToPlay = document.querySelectorAll('.space-to-play');
const turnX = document.querySelector('#X');
const turnO = document.querySelector('#O');

const PLAYER_1 = '⭕';
const PLAYER_2 = '❌';

let turn = PLAYER_1;

let board = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
const winnerCombinations = ['012', '345', '678', '048', '246', '036', '147', '258'];
let winner = 'Empate';
let plays = 0;
let stop = false;

function isWin() {
  for(let i = 0; i < winnerCombinations.length; i++) {
    const first = winnerCombinations[i].charAt(0);
    const second = winnerCombinations[i].charAt(1);
    const third = winnerCombinations[i].charAt(2);
    if(board[first] != 'empty' && board[first] == board[second] && board[second] == board[third]) {
      winner = `Ganador: ${board[first]}`;
      stop = true;
      jsConfetti.addConfetti();
      spacesToPlay[first].classList.add('winner');
      spacesToPlay[second].classList.add('winner');
      spacesToPlay[third].classList.add('winner');
      alert(`Resultado ${winner}`)
      return true;
    }
  }
  return false;
}

spacesToPlay.forEach( element => {
  element.addEventListener('click', () => {
    const stateElement = element.getAttribute('data-id');
    if(stop || !stateElement.includes('empty')) return;
    const position = parseInt(stateElement.charAt(0));
    element.innerText = turn;
    board[position] = turn;
    plays++;
    element.setAttribute('data-id', `${position}-ocuped`);
    //Cambiamos de turno
    turn = turn === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    if(turn === PLAYER_1) {
      turnX.classList.add('turn');
      turnO.classList.remove('turn');
    } else {
      turnO.classList.add('turn');
      turnX.classList.remove('turn');
    }
    //Winner
    if(plays >= 5 || !board.includes('empty')) {
      stop = isWin();
    }
  })
})


