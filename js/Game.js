class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    girl1 = createSprite(100,200);
    girl1.addImage("1", girl1Image);
    girl1.scale= 0.6
    boy2 = createSprite(300,200);
    boy2.addImage("2", boy2Image);
    boy2.scale= 0.6
    girl3 = createSprite(500,200);
    girl3.addImage("3", girl3Image);
    girl3.scale= 0.5
    girl4 = createSprite(700,200);
    girl4.addImage("4", girl4Image);
    girl4.scale= 0.5
    girls = [girl1, boy2, girl3, girl4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(198, 135, 103));
      image(trackImage, 0, -displayHeight*4, displayWidth, displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175  ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        girls[index-1].x = x;
        girls[index-1].y = y;

        if (index === player.index){
          girls[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = girls[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance> 3860){
      gameState = 2;
      console.log(player.distance);
    }

    drawSprites();
  }
  end() {
    console.log("Game over");
  }
}
