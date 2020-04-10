
function cScena(arr){
	createCanvas(400,600);
	background(51);

	this.test = true;

	this.w = 40;
	cols = floor(width/this.w); 
 	rows = floor(height/this.w);
	this.shapesContainer = [];
	this.activeShape = -1;
	this.frameCounter = frameCount;
	this.speed = 30;

	this.grid = arr;
	
 	this.frameUpdate = function(){
 		//console.log(this.frameCounter);
 		if(frameCount - this.frameCounter >= this.speed){
 			this.frameCounter = frameCount;
 			for (var i = 0; i < this.shapesContainer.length; i++)
 				this.shapesContainer[i].update();
 		}
 		//this.speed = 30;
 	}
 	

 	this.draw = function(){
 		if(this.test){
 			this.addNewShape();
 			console.log("dodałem");
 			this.test = false;
 		}

 		background(51);
 		this.printGrid();
 		
 		
 		this.checkIfCanGoLower(this.activeShape);
 		

 		this.drawShapes();
 		this.frameUpdate();
 		this.checkRows();
 		
 	}


	this.checkIfCanGoLower = function(activeOne){
		if(activeOne.checkTheLowest() == rows-1){
			this.addNewShape();
			console.log("dodałem");
		}
		else if(true){
			for (var i = 0; i < activeOne.getPosition().length; i++) {
				if(i % 2 == 0){
					if(this.grid[activeOne.getPosition()[i]][activeOne.getPosition()[i+1]+1] == 1){
						this.addNewShape();
						console.log("dodałem");
					}
				}
			};
		}
 	}

 	this.drawShapes = function(){
 		for (var i = 0; i < this.shapesContainer.length; i++) {
 			for(var j = 0; j < this.shapesContainer[i].getPosition().length/2; j++){
 				fill(255,204,0);
 				square(this.shapesContainer[i].getPosition()[j*2]*this.w, 
 					this.shapesContainer[i].getPosition()[(j*2)+1]*this.w ,this.w);
 			}
 		};
 	}

 


 	this.getW = function(){
 		return this.w;
	}

	this.getCols = function(){
 		return cols;
	}

	this.getRows = function(){
 		return rows;
	}
 	 
 	this.printGrid = function(){
 		for(var i=0; i<rows; i++){
			line(0, i*this.w, width, i*this.w);
		}

		for(var j=0; j<cols; j++){
			line(j*this.w, 0, j*this.w, height);
		}
 	}

 	this.addNewShape = function(){
 		shape = new cBlok();
 			//console.log(shape)
 		this.shapesContainer.push(shape);
 		this.activeShape = this.shapesContainer[this.shapesContainer.length -1];
 		if(this.shapesContainer.length >= 2){
 			this.shapesContainer[this.shapesContainer.length -2].setDisactive();
 			this.gridUpdate(this.shapesContainer[this.shapesContainer.length -2].getPosition());
 			//console.log(this.shapesContainer[this.shapesContainer.length -2].getPosition());
 		}
 		//console.log(this.grid);
 	}


 	this.gridUpdate = function(disactive){
 		//this.grid[0][0] = 1;
 		for (var i = 0; i < disactive.length; i++) {
 			if(i % 2 == 0){
 				this.grid[disactive[i]][disactive[i+1]] = 1;
 				this.grid[0][0] = 1;
 				//console.log(this.grid[disactive[i]][disactive[i+1]]);
 			}
 		};
 	}

 

	this.setSpeed = function(speed){
 		this.speed = speed;
 	}

 	this.checkRows = function(){
 		for(var i = 0; i < rows; i++){
 			var n = 0;
 			for(var j = 0; j < cols; j++){
 				if(this.grid[j][i]==undefined){
 					break;
 				}
 				else{
 					n++;
 				}

 				if(n == 9){
 					console.log(i);
 					// return i;
 					this.deleteRow(i);
 				}
 			}
 		}
 		//return -1;
 	}

 	this.deleteRow = function(j){
 		for (var i = 0; i < cols; i++) {
 			this.grid[i].splice(j,1);
 			this.grid[i].unshift(undefined);
 			console.log("deleted");
 		};

 		for(var i = 0; i < this.shapesContainer.length; i++){
 			var x = this.shapesContainer[i].getPosition();
 			for(var n = 0; n < x.length ; n++){
 				if(n % 2 == 1){
 					if(x[n] == j){
 						this.shapesContainer[i].getPosition().splice(n-1,2);
 						n-=2;
 					}
 					else if(x[n]<j){
 						this.shapesContainer[i].moveDown();
 					}
 				}
 			}
 		}
 		console.log(this.grid);
 	}

}