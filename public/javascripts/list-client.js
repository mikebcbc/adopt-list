function getPetData(pet) {
	const petInfo = {
		name: $(pet).find(".name").text(),
		description: $(pet).find(".description").text(),
		contactInfo: {
			phone: $(pet).find(".phone").text(),
			email: $(pet).find(".email").text()
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
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('authToken');
			}
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