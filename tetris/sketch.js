function setup(){
	var arr = make2Darray(10,15);
	scena = new cScena(arr);
}

function draw(){
	frameRate(60);
	scena.draw();
	//console.log(scena.shapesContainer.length);
	if(keyIsDown(DOWN_ARROW))
		scena.setSpeed(10);
	else
		scena.setSpeed(30);
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		for (var i = 0; i < scena.shapesContainer.length; i++){
	   		scena.shapesContainer[i].moveLeft(-1);
		}
	} else if (keyCode === RIGHT_ARROW) {
	    for (var i = 0; i < scena.shapesContainer.length; i++){
	   		scena.shapesContainer[i].moveRight(1);
		}
	} else if(keyCode === UP_ARROW){
		for (var i = 0; i < scena.shapesContainer.length; i++){
	   		scena.shapesContainer[i].rotate();
		}
	}
}



this.make2Darray = function(cols, rows){
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++)
		arr[i] = new Array(rows);
	return arr;
}		
	
