function getPetData(pet) {
	const petInfo = {
		name: $(pet).find(".name").text(),
		description: $(pet).find(".description").text(),
		contactInfo: {
			// phone: $(pet).find(".phone").text(),
			// email: $(pet).find(".email").text()
			phone: '1231231231', //temporary
			email: '123@hotmail.com' //temporary
		}
	}
	return petInfo;
}

function addToList() {
	$('.pet').on("click", ".add-to-list", function(e) {
		e.preventDefault();
		const pet = getPetData($(this).closest(".pet"));
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/list",
			data: JSON.stringify(pet),
			dataType: "json",
			contentType: "application/json"
		})
		.done(function(e) {
			console.log(e);
		});
	});
}


$(function() {
	addToList();
})