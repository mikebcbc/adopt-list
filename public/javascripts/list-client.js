function getPetData() {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/list",
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('authToken')
		}
	})
	.done(function(e) {
		console.log(e);
	})
	.fail(function(e) {
		console.log(e);
	})
}


$(function() {
	getPetData();
})