$(document).ready(function(){

	$count = $enemyFireCount = 1;
	$c = $score = $rows = $columns = $enemyOffset = 0;
	$level = 1;
	$callback = true;

	$(".btn").click(function(event){
		$(".startGame").fadeOut();
		checkLevel();
	});
/*
	$(".reset").click(function(event){
		$(".enemyContainer").html("");
		$(".enemyContainer").css("top",0);
		checkLevel();
	});
	*/
	var bulletNumber = 0;
	//Fire Bullets
	$(document).click(function(event){
		$(".hero").css("left",event.clientX+"px");
		$("body").append("<div id='hero_bullet"+ bulletNumber +"'class='hero_bullet'></div>");
		$("#hero_bullet"+bulletNumber).moveTo(0);
		$("#hero_bullet"+bulletNumber).speed(0.5);
		$("#hero_bullet"+bulletNumber).css("left",(event.clientX+15)+"px");
		bulletNumber++;
	});
	
	$(".frog").onCollision(function(otherObject){
		if(otherObject.hasClass("hero_bullet"))
			{
				this.remove();
				otherObject.remove();
				$score+=15;
				$(".coinContainer").html($score+" Pts");
			}
	});
});

function checkLevel(){
	$(".hero").remove();
	$("body").append("<div class='hero'></div>");
	if($level < 4){
		if($level == 1){
			$rows = 5;
			$columns = 3;
			$enemyOffset = 4;
			$speed = 0.05;
		}
		if($level == 2){
			$('body').css('background', '#000 url(images/bg2.jpg) no-repeat');
			$rows = 5;
			$columns = 5;
			$enemyOffset = 8;
			$speed = 0.09;
		}
		if($level == 3){
			$rows = 8;
			$columns = 4;
			$enemyOffset = 8;
			$speed = 0.15;
		}
		setLevel();
		hideEnemies();
		moveEnemies();
		enemyFire();
	}
	else{
		$("body").html("");
		$msg = "Game Over";
		endOfLevel();
	}
}



function setLevel(){
	$count = 0;	
	$(".enemyContainer").css("top",0);
	for(var i = 0;i < $columns ; i++)
	{
		var x=i*40;
		for (var j=0; j<$rows; j++){
			var y = j*50;
			$(".enemyContainer").append("<div id='enemy"+$count+"' class='frog' style='top:"+x+"px;left:"+y+"px'></div>");
			$count++;
		}
	}

	 $(".frog").onCollision(function(otherObject){
		if(otherObject.hasClass("hero_bullet"))
			{
				this.remove();
				otherObject.remove();
				$score+=15;
				$(".coinContainer").html($score+" Pts");
			}
	});

	 /* Moving a frog left and right.*/
	$(".frog").moveTo(90);
	$(".frog").speed($speed);
	$(".frog").autoBounceOff(true);	

}

function hideEnemies(){
	var arr = [];
	while(arr.length < $enemyOffset){
		var randomnumber = Math.ceil(Math.random()*($rows*$columns));
		if(arr.indexOf(randomnumber) > -1) continue;
		arr[arr.length] = randomnumber;
	}
	$.each( arr, function( i, val ) {
		$("#enemy"+val).remove();
	})
}

function moveEnemies(){
	 var div = $(".enemyContainer");
	 div.animate({top:'+=10px'},500);
	 $('.frog').bind('inview', function (event, visible) {
      if (visible == true) {
      } else {
        // element has gone out of viewport
         $(this).remove();
      }
    });
	 setTimeout(moveEnemies, 10000);
}

function enemyFire(){
	var n = Math.floor(Math.random() * 25) + 1;
	if ($('#enemy'+n).length > 0) {
		var position = $('#enemy'+n).position();
		var offset = $('#enemy'+n).parent().position();
		//var offsetTop = offset.top;
		var top = position.top+offset.top;
		var left = position.left;
		$("body").append("<div class='enemyFire' id='enemyFire"+$enemyFireCount+"'style='position:absolute'><img class='meteor' src='images/meteor.png'/></div>");
		$("#enemyFire"+$enemyFireCount).css("left",left);
		$("#enemyFire"+$enemyFireCount).css("top",top);
		$enemyFireCount++;

		var div = $(".enemyFire");
		div.animate({top: "105%"}, 4000,"linear",function()
                    {
                        $(this).remove();
                    }
                )
		setTimeout(enemyFire, 3000);
	}
	else{
		var numItems = $('.frog').length;
		if (numItems > 0) {
			enemyFire();
		}
		else{
			$msg ="Next Level";
			endOfLevel();
		}
	}
}

function endOfLevel(){
	$level++;
	if($level > 3)
		$msg = "Game Over";
	$(".btn span").html($msg);
	$(".startGame").fadeIn();
	//alert($level+"Ended");
}