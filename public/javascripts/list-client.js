var RESULT_TEMPLATE = (
	'<div class="pet">' +
		'<div class="photo">' +
			'<img src="" alt="" />' +
		'</div>' +
		'<div class="name"></div>' +
		'<div class="description"><p></p></div>' +
		'<div class="action">' +
			'<a href class="remove-from-list">REMOVE FROM LIST</a>' +
			'<a href class="contact-shelter">CONTACT SHELTER</a>' +
		'</div>' +
	'</div>'
);

function renderPet(pet) {
	var template = $(RESULT_TEMPLATE);
	template.attr("data-id", pet._id);
	template.find(".photo img").attr('src', pet.image);
	template.find(".name").text(pet.name);
	template.find(".description p").text(pet.description);
	$('.adoptable-pets').append(template);
}

function appendPets(pets) {
	var results = pets.forEach(function(item) {
		return renderPet(item);
	});
}

function getListedPets() {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/list",
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('authToken')
		}
	})
	.done(function(pets) {
		console.log(pets);
		appendPets(pets);
	})
	.fail(function(err) {
		console.log(e);
	})
}

function removeFromList() {
	$('.adoptable-pets').on("click", ".remove-from-list", function(e) {
		e.preventDefault();
		const pet = $(this).closest(".pet").attr('data-id');
		$.ajax({
			type: "DELETE",
			url: "http://localhost:3000/list/" + pet,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('authToken')
			},
			contentType: "application/json"
		})
		.done(function(e) {
			console.log(e);
		})
		.fail(function(err) {
			console.log(err);
		});
	});
}


$(function() {
	getListedPets();
	removeFromList();
})