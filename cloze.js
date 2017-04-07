
var fs = require("fs");

exports.clozeCard = function (front, back, mycloze){

  if (this instanceof Object){
  	this.file = "cloze-card.txt";
    this.front = front;
    this.back = back;
    this.partial = mycloze;
  } else {
    return new clozeCard(front, back, partial);  
  }
  fs.appendFile(this.file, JSON.stringify({
			front: this.front,
			back: this.back,
			partial: this.partial
		}) + "\n", function(error){
			if(error){ 	console.log("error appending");
						console.log(error);}
		});
}// end basicCard function

// module.exports = clozeCard;
