

$('#basic').css("display", "block");
$('#cloze').css("display", "none");
$('#game').css("display", "none");

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

});