function start(){
    var lives = 2;
    const music = new Audio("ogmusic.wav");
    music.play();
    
    var play = document.getElementById("play");
    play.style.display= "none";
    
    document.addEventListener("keydown", event => {
        if(event.key==="ArrowLeft"){moveLeft();}
        if(event.key==="ArrowRight"){moveRight();}
    });
    
    var character = document.getElementById("character");
    
    function moveLeft(){
        let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        left -= 100;
        if(left>=0){
            character.style.left = left + "px";
        }
    }
    function moveRight(){
        let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        left += 100;
        if(left<300){
            character.style.left = left + "px";
        }
    }
    var block = document.getElementById("block");
    var counter = 0;
    var tracker = 0;
    var track = 0;
    var speed = 1;
    var animate = "";
    
    function faster() {
        if (speed > 1) {
            speed = speed - 0.01;
            animate = "slide " + speed + "s infinite linear";
            block.style.animation = animate;
        } else if (speed > 0.9) {
            speed = speed - 0.01;
            animate = "slide " + speed + "s infinite linear";
            block.style.animation = animate;
        } else if (speed > 0.8) {
            speed = speed - 0.01;
            animate = "slide " + speed + "s infinite linear";
            block.style.animation = animate;
        } else if (speed > 0.7) {
            animate = "slide 0.7s infinite linear";
            block.style.animation = animate;
        };
    }

    const spedup1 = new Audio("spedup1.mp3");
    const powerDown = new Audio("powerDown.mp3");
    const powerUp = new Audio("powerUp.mp3");
    const dies = new Audio("dies.mp3");
    const gameOver = new Audio("gameOver.mp3");

    block.addEventListener('animationiteration', () => {
        var random = Math.floor(Math.random() * 3);
        left = random * 100;
        while (left == track){
            var random = Math.floor(Math.random() * 3);
            left = random * 100;
        };
        block.style.left = left + "px";
        track = left;
        counter += 1;
        if  (counter == 20){
            restartAnimation();
        };
        if (counter == 22 && tracker == 0){
            counter = 21;
            tracker = 1;
        };
        if (counter == 30){
            music.pause();
            spedup1.play();
        }
        if (counter % 30 == 0) {
            character.style.height = "100px";
            count.style.paddingTop = "0px";
            character.style.paddingRight = "0px";
            character.style.width = "100px";
            character.style.top = "300px";
            character.style.backgroundImage = "url(superMario.png)";
            if (lives != 3){
                powerUp.volume = 0.3;
                powerUp.play();
            };
            lives = 3;
        spedup1.addEventListener('ended', function(){
            spedup1.play();
        });
        };
        
        faster();
        document.getElementById("count").innerHTML = counter;
    });
    var count = document.getElementById("count");
    function restartAnimation() {
        block.style.animation = "none";
        random = Math.floor(Math.random() * 3);
        left = random * 100;
        while (left == track) {
            var random = Math.floor(Math.random() * 3);
            left = random * 100;
        };
        block.style.left = left + "px";
        track = left;
        requestAnimationFrame(() => {
            setTimeout(() => {
                block.style.animation = animate;
            }, 0);
        });
    };
    setInterval(function() {
        var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
        var finalScore = document.getElementById("finalScore");
        
        if (lives==1){
            if(characterLeft==blockLeft && blockTop<500 && blockTop>350){
                block.style.animation = "none";
                if (counter <30){
                    music.pause();
                } else {
                    spedup1.pause();
                };
                game.style.display = "none";
                end.style.display = "block";
                finalScore.innerHTML += counter;
                dies.addEventListener('ended', function(){
                    gameOver.play();
                });
                dies.play();
            };
        };
        if (lives == 2){
            if(characterLeft==blockLeft && blockTop<500 && blockTop>300){  
                restartAnimation();
                lives = 1;
                character.style.width = "50px";
                character.style.height = "50px";
                character.style.top = "350px";
                character.style.backgroundImage = "url('miniMario.png')";
                character.style.paddingRight = "25px";
                count.style.paddingTop = "50px"
                powerDown.play();
            };
        };
        if (lives==3){
            if(characterLeft==blockLeft && blockTop<500 && blockTop>300){  
                restartAnimation();
                lives = 2;
                character.style.backgroundImage = "url('mario.png')";
                powerDown.play();
            };    
        };
    });
    
    document.getElementById("right").addEventListener("touchstart", moveRight);
    document.getElementById("left").addEventListener("touchstart", moveLeft);
};

var restart = document.getElementById("restart");
restart.addEventListener('click',() => {
    window.location.reload();
});

var startGame = document.getElementById("startGame");
startGame.addEventListener('click',() => {
    var game = document.getElementById("game");
    game.style.display = "block";
    start();
});
