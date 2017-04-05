
var fs = require("fs");


function clozeCard(front, back){

  if (this instanceof clozeCard){
  	this.file = "cloze-card.txt";
    this.front = front;
    this.back = back;
  } else {
    return new clozeCard(front, back);  
  }
  fs.appendFile(this.file, JSON.stringify({
			front: this.front,
			back: this.back
		}) + "\n", function(error){
			if(error){ 	console.log("error appending");
						console.log(error);}
		});
}// end basicCard function
module.exports = clozeCard();