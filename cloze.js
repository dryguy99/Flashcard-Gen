
var fs = require("fs");

exports.clozeCard = function (front, back){

  if (this instanceof Object){
  	this.file = "cloze-card.txt";
    this.front = front;
    this.back = back;
    this.partial = function () {
    	front.replace(back, " ... ");
    }
  } else {
    return new clozeCard(front, back);  
  }
  fs.appendFile(file, JSON.stringify({
			front: this.front,
			back: this.back,
			partial: this.partial
		}) + "\n", function(error){
			if(error){ 	console.log("error appending");
						console.log(error);}
		});
}// end basicCard function
