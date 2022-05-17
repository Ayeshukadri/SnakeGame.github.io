const canvas =document.getElementById("game");
const context =canvas.getContext('2d');


class SnakePart{
    constructor(x ,y)
    {
        this.x = x;
        this.y = y;
    }
}
let speed = 7;

let tileCount = 28;
let tileSize = canvas.width / tileCount -2;
headX =15;
headY =15;

const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

let appleX = 5;
let appleY = 5;

  const gulpSound = new Audio("eatingSound.mp3");
  const OutSound = new Audio("sad.wav");







function drawGame(){
   
    changeSnakePosition();

    let result = isGameOver();
    if(result)
    {
        return;
    }



    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if(score > 2 )
    {
        
        speed = 9;
    }
    if(score > 6 )
    {
    
        speed = 10;
    }

    if(score > 8 )
    {
        
        speed = 11;
    }

    if(score > 14)
    {
        
        speed = 12;
    }
    if(score > 20)
    {
        
        speed = 13;
    }

   

    setTimeout(drawGame,1000/speed);   
}



function isGameOver()
{
    let gameover = false;

    if(yVelocity ===0 && xVelocity ===0)
    {
        return false;
    }



    //walls//


      if(headX < 0)

      {
        gameover = true;
      }
      else if(headX === tileCount){
          gameover = true;
      }

       
      else if( headY < 0)
      {
          gameover = true;
      }
      else if(headY === tileCount)
      {
          gameover = true;
      }

      for( let i =0 ; i <snakeParts.length; i++)
      {
          let Part = snakeParts[i];
          if(Part.x === headX && Part.y === headY)
          {
              gameover = true;
              
              break;

          }
      }






       if(gameover)
       {
            if(gameover==true)
            {
                OutSound.play();
            }

          context.fillStyle = "white";

        context.font ="60px Verdena";

      
        context.fillText("Game Over " ,score ,canvas.width / 2.5, canvas.height / 1);

        
        }

        
        return gameover;



     
}

function drawScore()
{
    context.fillStyle = "white";
    context.font ="30px Verdena";
    context.fillText("Score "+ score ,canvas.width-120 ,30);
}
 

 function clearScreen()
{

    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);

}



function drawSnake()
{
    context.fillStyle = 'blue';
    context.fillRect(headX * tileCount , headY* tileCount ,tileSize ,tileSize);
    context.fillStyle = "green";
    for(let i =0 ; i < snakeParts.length ;i++)
    {
        let part =snakeParts[i];
        context.fillRect(part.x * tileCount , part.y * tileCount, tileSize ,tileSize);  
    } 

    snakeParts.push(new SnakePart(headX , headY));   //put the item at end next to the head

    while (snakeParts.length > tailLength)
    {
        snakeParts.shift(); //remove the furthur item from the snake part if we more than the tail size.
    }

}

function drawApple()
{
    context.fillStyle ="red";
    context.fillRect(appleX *tileCount,appleY *tileCount,tileSize ,tileSize);
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY)
    {
        appleX =Math.floor(Math.random() * tileCount);
        appleY =Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();

    }
}


function changeSnakePosition(){

    headX = headX + xVelocity;
    
    headY = headY + yVelocity;
}



document.body.addEventListener("keydown",keyDown);

function keyDown(event)
{
    //up

    if(event.keyCode == 38)
    {
        if(yVelocity == 1)
        return;
        yVelocity = -1;
        xVelocity = 0;
    }
    
    //down//

    if(event.keyCode == 40)
    {
        if(yVelocity ==-1)
        return;

        yVelocity = 1;
        xVelocity = 0;
    }

      //left
      
    if(event.keyCode == 37)
    {
        if(xVelocity == 1)
        return;
    
        yVelocity = 0;
        xVelocity = -1;
    }

    //right

    if(event.keyCode == 39)
    {
    
        if(xVelocity ==-1)
        return;

        yVelocity = 0;
        xVelocity = 1;
    }

}

drawGame();




//background .........................................................................................//

function rain()
            {
                let amount = 100;
                let body = document.querySelector('body');
                let i=0;
                while(i < amount)
                {
                    let drop = document.createElement('i'); 
                    let size = Math.random()* 5;
                    let posX = Math.floor(Math.random() * window.innerWidth);

                    let delay = Math.random()* -20;
                    let duration = Math.random() * 4;

                    

                    drop.style.width = 1 + size +'px';
                    drop.style.left= posX + 'px';
                    drop.style.animationDelay = delay +'s';
                    drop.style.animationDuration = 1+ duration+'s';

                    body.appendChild(drop);
                    i++;
                }
            }
            rain();
