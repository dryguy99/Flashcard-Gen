
var fs = require("fs");

exports.clozeCard = function (front, back){

  if (this instanceof Object){
  	var file = "cloze-card.txt";
    this.front = front;
    this.back = back;
  } else {
    return new clozeCard(front, back);  
  }
  fs.appendFile(file, JSON.stringify({
			front: this.front,
			back: this.back
		}) + "\n", function(error){
			if(error){ 	console.log("error appending");
						console.log(error);}
		});
}// end basicCard function
