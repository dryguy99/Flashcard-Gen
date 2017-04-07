
var fs = require("fs");

exports.clozeCard = function (front, back, mycloze){

  if (this instanceof Object){
  	this.file = "cloze-card.txt";
    this.front = front;
    this.back = back;
    this.partial = mycloze;
    this.deck = function (input, data) {
			fs.readFile(this.file, "utf8", function(error, data){
				if(error){
					console.log("error reading file");
				}
				console.log("Cloze card: " + data);
				return data;
			});	
    	}
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
