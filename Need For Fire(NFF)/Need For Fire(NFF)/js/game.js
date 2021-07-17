class Game{
    constructor(){ }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }

        player1 = createSprite(200,500);
        player1.addImage("player1",player1_img);
        player1.scale = 0.5;

        player1.setCollider("rectangle", 30, 20, 50, 90);
        //player1.debug = true;
        
        player2 = createSprite(800,500);
        player2.addImage("player2", player2_img);
        player2.scale = 0.5;
        
        player2.setCollider("rectangle", 30, 20, 50, 90);
        //player2.debug = true;

        players=[player1,player2];
    }

    play(){
        
        form.hide();

        Player.getPlayerInfo();

        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;

        drawSprites();
        
        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            
            if(index === player.index){
                
            //add code to display the player's name on the respective basket.
                text(allPlayers[plr].name ,x-25,y+25);
            }

            fill("white"); 
            text("Player 1 :" +allPlayers.player1.score,50,50);
            text("Player 2 :" +allPlayers.player2.score,50,100);
        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }
    
        if (frameCount % 100 === 0) {
            enemies = createSprite(random(100, 1000), 0, 100, 100);
            enemies.velocityY = 3;

            enemies.scale = 0.15

            var rand = Math.round(random(1,4));
            switch(rand){
                case 1: enemies.addImage("enemy1",enemy1_img);
                break;
                case 2: enemies.addImage("enemy1", enemy2_img);
                break;
                case 3: enemies.addImage("enemy1", enemy3_img);
                break;
                case 4: enemies.addImage("enemy1", enemy4_img);
                break;
            }
            enemyGroup.add(enemies);
        }
            
        if (keyIsDown(32)){

            console.log(x, y)

            bullets = createSprite(x, y);
            bullets.addImage("bulletImg",bulletImg);
            bullets.scale = 0.25;

            bullets.velocityX = 2.5;

            bulletGroup.add(bullets);
        }

        if (player.index !== null) {
            for (var i = 0; i < enemyGroup.length; i++) {
                if (enemyGroup.get(i).isTouching(players)) {
                    enemyGroup.get(i).destroy();
                    player.score+=1;
                    player.update();       
                }   
            }
            for (var j = 0; j < bulletGroup.length; j++) {
                if (bulletGroup.get(j).isTouching(enemyGroup)) {
                    bulletGroup.get(j).destroy();
                    player.score+=1;
                    player.update();       
                }   
            }
        }
    }

    end(){
      console.log("Game Ended");
    }
    
}
