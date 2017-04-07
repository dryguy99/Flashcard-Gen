var fs = require("fs");


exports.basicCard = function (front, back){

	if (this instanceof Object){
		this.file = "basic-card.txt";
	    this.front = front;
	    this.back = back;
	    this.deck = function (input, data) {
			fs.readFile(this.file, "utf8", function(error, data){
				if(error){
					console.log("error reading file");
				}
				console.log("Basic card: " + data);
				return data;
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
