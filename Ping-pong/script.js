const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        let gamePaused = false;

        canvas.width = 1000;
        canvas.height = 500;

        const cw = canvas.width;
        const ch = canvas.height;

        const ballSize = 20; //wielkosc naszsej piłki
        let ballX = cw / 2 + ballSize / 2;
        let ballY = ch / 2 + ballSize / 2;

        const paddleHeight = 100;
        const paddleWidth = 20;

        const playerX = 70;
        const aiX = 910;

        let playerY = 200;
        let aiY = 200;

        const lineWidth = 6;
        const lineHeight = 16;

        let ballSpeedX = 1;
        let ballSpeedY = 1;
        //let ballSpeed =0.5;

        let aiscore = 0;
        let playerscore = 0;

        function getRandomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        function AI() {
            ctx.fillStyle = '#cc2d72';
            ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
        }

        function player() {
            ctx.fillStyle = '#3ed618';
            ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
        }

        function ball() {
            var middleBallY = ballY + ballSize / 2;
            //var middleBallX=ballX+ballSize/2;

            ctx.fillStyle = 'orange';
            ctx.fillRect(ballX, ballY, ballSize, ballSize);

            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballY <= 0 || (ballY + ballSize) >= ch) {
                ballSpeedY = -ballSpeedY;
                speedUp();
            }
            if (ballX <= playerX + paddleWidth && ballX + ballSize >= playerX) {
                if (ballY + ballSize > playerY && ballY < paddleHeight + playerY) {
                    ballX = playerX + paddleWidth;
                    ballSpeedX = -ballSpeedX;
                    if(ballY+ballSize>=playerY && ballY+ballSize<=playerY+paddleHeight/2)       //player góra
                    {
                        console.log("player góra");
                        if(ballSpeedY>0)
                        {
                            ballSpeedY = -ballSpeedY;
                        }                           
                    }
                    else{
                        if(ballSpeedY<0)
                        {
                            ballSpeedY = -ballSpeedY;
                        }                                //player dól
                        console.log("player dół");        
                        } 
                }
            }
            if (ballY + ballSize == playerY || ballY == playerY + paddleHeight) {
                if (ballX + ballSize >= playerX && ballX <= playerX + paddleWidth) {
                    ballSpeedY = -ballSpeedY; 
                }
            }
            if (ballX + ballSize >= aiX && ballX <= aiX + paddleWidth) {
                if (ballY + ballSize > aiY && ballY < paddleHeight + aiY) {
                    ballX = aiX - paddleWidth;
                    ballSpeedX = -ballSpeedX;
                    if(ballY+ballSize>=aiY && ballY+ballSize<=aiY+paddleHeight/2) //ai góra
                    {
                        if(ballSpeedY>0)
                        {
                            ballSpeedY = -ballSpeedY;
                        }
                        console.log("ai góra");                           
                    }
                    else{
                        if(ballSpeedY<0)
                        {
                            ballSpeedY = -ballSpeedY;
                        }
                        console.log("ai dół");                       //ai dół                   
                        }
                }
            }
            if (ballY + ballSize == aiY || ballY == aiY + paddleHeight) {
                if (ballX + ballSize >= aiX && ballX <= aiX + paddleWidth) {
                    ballSpeedY = -ballSpeedY;
                }
            }
            score();
        }

        function table() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, cw, ch);

            for (let linePosition = 20; linePosition < ch; linePosition += 30) {
                ctx.fillStyle = '	#6A5ACD';
                ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
            }

        }
        topCanvas = canvas.offsetTop;
        //console.log(topCanvas);
        function playerPosition(e) {
            //console.log("pozycja myszy to "+(e.clientY-topCanvas));
            playerY = e.clientY - topCanvas - paddleHeight / 2;

            if (playerY >= ch - paddleHeight) {
                playerY = ch - paddleHeight;
            }

            if (playerY <= 0) {
                playerY = 0;
            }

            //aiY=playerY;
        }

        function speedUp() {
            if (ballSpeedX > 0 && ballSpeedX < 10) {
                ballSpeedX += .09;

            } else if (ballSpeedX < 0 && ballSpeedX > -10) {
                ballSpeedX -= .09;
            }

            if (ballSpeedY > 0 && ballSpeedY < 10) {
                ballSpeedY += .09;

            } else if (ballSpeedY < 0 && ballSpeedY > -10) {
                ballSpeedY -= .09;
            }

            //console.log(ballSpeedX + ", " + ballSpeedY)
        }

        function gameOver() {
            ballX = cw / 2 + ballSize / 2;
            ballY = ch / 2 + ballSize / 2;
            playerY = 200;
            aiY = 200;
            ballSpeedX = 2;
            ballSpeedY = -1;

        }

        function score() {

            if (ballX <= 0) {
                gameOver();
                console.log("Game Over");
                aiscore++;
                document.getElementById("text").innerHTML = '<font color=#6A5ACD>ty: ' + playerscore +
                    '</font>  <font color=#6A5ACD> przeciwnik: ' + aiscore + '</font>';
                console.log(" ai: " + aiscore + " player: " + playerscore);

            }

            if (ballX + ballSize >= cw) {
                gameOver();
                console.log("You win");
                playerscore++;
                document.getElementById("text").innerHTML = '<font color=#6A5ACD>ty: ' + playerscore +
                    '</font>  <font color=#6A5ACD> przeciwnik: ' + aiscore + '</font>';
                console.log(" ai: " + aiscore + " player: " + playerscore);
            }

        }

        //sztuczna inteligencja

        function aiPosition() {
            var middlePaddle = aiY + paddleHeight / 2;
            var middleBall = ballY + ballSize / 2;

            if (ballX > 500) {
                if (middlePaddle - middleBall > 200) {
                    //console.log(">+200");
                    aiY -= 2;
                } else if (middlePaddle - middleBall > 50) {
                    //console.log("+50-200");
                    aiY -= 3;
                }

                if (middlePaddle - middleBall < -200) {
                    //console.log("<-200");
                    aiY += 2;
                } else if (middlePaddle - middleBall < -50) {
                    //console.log("-50-(-200)");
                    aiY += 3;
                }
            }
        }
        canvas.addEventListener("mousemove", playerPosition);
        document.addEventListener("keydown", pressKey, true);

        function pressKey(e) {
            if (e.keyCode == 32) pauseGame();
        }

        function pauseGame() {
            if (!gamePaused) {
                game = clearInterval(game, 1);
                gamePaused = true;

                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.font = "50pt Margarine";
                ctx.fillText("PRZERWA", cw / 2 - 100, ch / 2); // narysowanie tekstu
                //ctx.strokeText("PAUSE",cw/2-75,ch/2); // wyświetlenie tekstu
            } else if (gamePaused) {
                game = setInterval(gameLoop, 1);
                gamePaused = false;
            }

        }

        function gameLoop() {
            table();
            ball();
            player();
            AI();
            aiPosition();
        }
        game = setInterval(gameLoop, 1);
        //setInterval(ball,1);