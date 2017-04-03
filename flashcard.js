var fs = require("fs");


function basicCard(front, back){

  if (this instanceof basicCard){
  	this.file = "basic-card.txt";
    this.front = front;
    this.back = back;
  } else {
    return new basicCard(front, back);  
  }
  fs.appendFile(this.file, JSON.stringify({
			front: this.front,
			back: this.back
		}) + "\n", function(error){
			if(error){ 	console.log("error appending");
						console.log(error);}
		});
}// end basicCard function
module.exports = basicCard(front, back);