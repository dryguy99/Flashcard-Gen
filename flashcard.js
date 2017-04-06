var fs = require("fs");


exports.basicCard = function (front, back){

  if (this instanceof Object){
  	var file = "basic-card.txt";
    this.front = front;
    this.back = back;
  } else {
    return new basicCard(front, back);  
  }
  fs.appendFile(file, JSON.stringify({
			front: this.front,
			back: this.back
		}) + "\n", function(error){
			if(error){ 	console.log("error appending");
						console.log(error);}
		});
}// end basicCard function
