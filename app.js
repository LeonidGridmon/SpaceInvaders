const grid =document.querySelector('.grid')
let currentShooterIndex=202;
let width=15;
let direction = 1;

var reloadTimer = 1;

let resultDisplay= document.getElementById('result')
let result =0;
var alienInvaders = [ ];
resultDisplay.innerText = result;
let gameOn=0
let invadersSpeed;
let bulletSpeed;
let  reloadId;

for(let i=0; i<255;i++){
    const square = document.createElement('div')
    square.setAttribute('id', i.toString())
    grid.appendChild(square)
}



function gameStart () {
 if (gameOn === 0) {
    alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ];
    draw ();
    squares[currentShooterIndex].classList.add('shooter')
     invadersSpeed=setInterval(moveInvader,750)
     bulletSpeed =setInterval(moveBullet,200)
     reloadId=setInterval(reload,1000)
     gameOn =1;
     result =0;
     resultDisplay.innerHTML = result;
     addEventListener('keydown',moveShooter)

 }
}

document.getElementById('start').addEventListener('mousedown',gameStart)

const squares = Array.from(document.querySelectorAll('.grid div'));


function draw () {
    for (let i=0;i<alienInvaders.length;i++) {

        squares[alienInvaders[i]].classList.add('invader')
    }
}

draw ();

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}
squares[currentShooterIndex].classList.add('shooter')

function moveShooter (e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.code) {
        case 'ArrowLeft' :
            if(currentShooterIndex % width !==0) currentShooterIndex-=1;
            break
        case 'ArrowRight':
            if(currentShooterIndex % width < width -1) currentShooterIndex+=1;
            break
        case 'Space':
            fireBullet()
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
    console.log(e.code)
}



function  moveInvader() {
    const lefEdge = alienInvaders[0] % width ===0;
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width-1
    remove()
    if (alienInvaders.length === 0){gameOver('0')}


    if( rightEdge && direction===1)
    {
        for(let i=0;i<alienInvaders.length;i++) {
            alienInvaders [i] +=width+1
            direction =-1
            }
    }
    if( lefEdge && direction===-1)
    {
        for(let i=0;i<alienInvaders.length;i++) {
            alienInvaders [i] +=width-1
            direction =1}
    }

    for (let i=0; i<alienInvaders.length;i++)
    {
        alienInvaders[i]+= direction
        if (alienInvaders[i]+width*2 > squares.length) { gameOver('1')}
       }
    draw()

    if(squares[currentShooterIndex].classList.contains('invader','shooter')) {
        gameOver('1')


    }
}
function gameOver(res) {

     clearInterval(invadersSpeed)
     clearInterval(bulletSpeed)
     clearInterval(reloadId)
    for (let i=0;i<squares.length;i++) {
     squares[i].classList.remove('invader','bullet')
        removeEventListener('keydown',moveShooter)
    }
    res > 0 ? alert('game over you lose :(') :  alert('You win! :)')
    gameOn =0;

}

function moveBullet() {
    for (let i=0;i<squares.length;i++)
    {
        if (squares[i].classList.contains('bullet'))
        {
            squares[i].classList.remove('bullet')
            i-width > 0?squares[i-width].classList.add('bullet'):console.log('bullet deleted')
            if ( squares[i-width].classList.contains('invader')) {
                squares[i-width].classList.remove('invader','bullet')
                alienInvaders.splice((alienInvaders.indexOf(i-width)),1)
                result ++
                resultDisplay.innerHTML = result;
            }
        }

    }



}



function reload (){ reloadTimer >0? reloadTimer-- : console.log('reloading')  }



function fireBullet (){
    if (reloadTimer === 0){
        squares[currentShooterIndex - width].classList.add('bullet');
        reloadTimer++
        }
}