# Flashcard-Gen
This app helps Create & Generate Flashcards using node.js using constructors, callbacks and recursion.

The app has 3 node.js modules I created called:

	server.js
	flashcard.js
	cloze.js

I also used the following NPM modules:

	express
	body-parser
	mysql
	node-sqlparser

The required modules are in the package.json file for easy loading with npm install

The flashcard.js  and cloze.js files conatins constructors that makes Basic & Cloze Flashcards.  They each create a text file for flashcards and log the card to the file.  They also read back the file so the data may be examined.  Please note the read portion currently does nothing with the file since the addition of the MySQL database to the project.

The server.js app creates a server for use as an API with my clientside app flashcard-dryguy.herokuapp.com .  The client side app is needed to create new flashcards and play with them. (Or generally test out server.js)  After creating the server it connects to JawsDB where MYSQL is located.  The server is designed to handle all requests on 3 branches, /api , /basic and /cloze.  

The /api directors handles all get requests and sends back the requested data. Currently, the data retrieved is either the MySQL table cloze or basic.  These 2 tables contain cloze or basic flashcards for the user game.

The /basic directory is used to create new Basic Flashcards.  Requests arriving here are broken down to the Front and Back of the card.  Then a card is created using a constructor function and the data is saved to MySql basic table for later use.  The data is also logged to a text file so I have a record of the request.

The /cloze directory is used to create new Cloze Flashcards.  Requests arriving here are broken down to the Front, Back and Cloze sections of the card.  The cloze section is created here by removing the Back section from the front statement and replacing it wiht a "..." .  Then a card is created using a constructor function and the data is saved to MySql cloze table for later use.  The data is also logged to a text file so I have a record of the request.

In the future I would like to update this app to create new tables on additional topics for which the user may then create and play with the new flashcards.  I would also like to create a way for users to contact me with requests or corrections for incorrect data.
