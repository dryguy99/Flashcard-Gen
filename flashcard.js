var fs = require("fs");


exports.basicCard = function (front, back){

	if (this instanceof Object){
	    this.front = front;
	    this.back = back;
	    this.deck = function () {
			fs.readFile("basic-card.txt", "utf8", function(error, data){
				if(error){
					console.log("error reading file");
				}
				console.log("flashcard: " + data);
			});	
    	}
	} else {
    	return new basicCard(front, back);  
	}
	if (this.front != '' && this.back != '') {
		fs.appendFile("basic-card.txt", JSON.stringify({
			front: this.front,
			back: this.back
			}) + "\n", function(error){
				if(error){ 
					console.log("error appending");
					console.log(error);}
		});
	}
}// end basicCard function
