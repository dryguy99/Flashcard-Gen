

$('#basic').css("display", "block");
$('#cloze').css("display", "none");
$('#game').css("display", "none");

function postItem(front, back) {
        $.ajax({
            type: "POST",
            url: "http://users/dryguy/git-work/server/Flashcard-Gen/app.js",
            timeout: 2000,
            data: { front: front, back: back },
            success: function(data) {
                //show content
                console.log('Success!')
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                console.log('text status '+textStatus+', err '+err)
            }
        });
    }//postItem()


$(document).on('click', '.mybtn', function () {
	event.preventDefault();

	var myid = "#" + $(this).attr("value");
	var isSelected = $(this).attr("data-selected");
	
	if (isSelected === "false") {
		
		$(this).attr("data-selected", "true");
		$(myid).css("display", "block");
		$(this).siblings(".mybtn").attr("data-selected", "false");
		$(myid).siblings().css("display", "none");
		$("#mybutton").css("display", "block");
	}
});

$(document).on('click', '#submitbtn', function () {
	console.log("click");
	event.preventDefault();
	var front = $("#front").val();
	var back = $("#back").val();
	$("#front").val("");
	$("#back").val("");
	console.log("front: " + front + "\n back: " + back);

	postItem(front, back);
    
});




