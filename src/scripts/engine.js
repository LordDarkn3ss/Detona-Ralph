const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifeLeft: document.querySelector("#life"),
    },
    values: {
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        life: 3,
        curretLife: 3,
        time: 10,
        curretTime: 10,

    },
    actions: {
        timerId: setInterval(sortEnemy, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

// Funções ---------------------------------------------------------------------------
function reset(){
    location.reload()
}

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        alert("Game Over! Acabou o tempo, SCORE: " + state.values.result);

        reset();
    }
}

function playSound(){
    let audio = new Audio("./src/sounds/hit.m4a")
    audio.volume = 0.1;
    audio.play();
}

function sortEnemy(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
            else if(square.id != state.values.hitPosition){
                if(state.values.curretLife > 0){
                    state.values.curretLife--;
                    state.view.lifeLeft.textContent = "x" + state.values.curretLife;
                    state.values.hitPosition = null;
                }
                else{
                    alert("Game Over! Acabaram suas vidas, SCORE: " + state.values.result);
                    reset();
                }
                
            }
        });
    });
}

function main(){

    addListenerHitBox();
}

// Main ------------------------------------------------------------------------------

main();