var RESULT_TEMPLATE = (
	'<div class="pet">' +
		'<div class="photo">' +
			'<img src="" alt="" />' +
		'</div>' +
		'<div class="name"></div>' +
		'<div class="description"><p></p></div>' +
		'<div class="action">' +
			'<a href="" class="add-to-list">ADD TO LIST</a>' +
			'<a href="" class="contact-shelter">CONTACT SHELTER</a>' +
		'</div>' +
	'</div>'
);

function renderPet(pet) {
	var template = $(RESULT_TEMPLATE);
	template.find(".photo img").attr('src', pet.media.photos.photo[0]);
	template.find(".name").text(pet.name.$t);
	template.find(".description p").text(pet.description.$t);
	$('.adoptable-pets').append(template);
}

function appendPets(pets) {
	var results = pets.forEach(function(item) {
		return renderPet(item);
	});
}

function fetchPets() {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/pets",
		dataType: "json",
		contentType: "application/json"
	})
	.done(function(pets) {
		appendPets(pets);
	})
}

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
};

function addToList() {
	$('.pet').on("click", ".add-to-list", function(e) {
		e.preventDefault();
		const pet = getPetData($(this).closest(".pet"));
		console.log(pet);
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/list",
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('authToken')
			},
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
	fetchPets();
	addToList();
})