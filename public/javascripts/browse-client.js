var RESULT_TEMPLATE = (
	'<div class="pet">' +
		'<div class="photo">' +
			'<img src="" alt="" />' +
		'</div>' +
		'<div class="name"></div>' +
		'<div class="description"><p></p></div>' +
		'<div class="action">' +
			'<a href class="add-to-list">ADD TO LIST</a>' +
			'<a href class="contact-shelter">CONTACT SHELTER</a>' +
		'</div>' +
	'</div>'
);

var PETS_ARRAY;

function renderPet(pet) {
	console.log(pet);
	var template = $(RESULT_TEMPLATE);
	template.attr("data-id", pet.id.$t);
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
		PETS_ARRAY = pets;
		appendPets(PETS_ARRAY);
	})
}

function getPetData(pet) {
	const petInfo = {
		name: $(pet).find(".name").text(),
		description: $(pet).find(".description").text(),
		contactInfo: {
			// phone: $(pet).find(".phone").text(),
			// email: $(pet).find(".email").text()
			phone: '1231231231',
			email: '123@123.com'
		}
	}
	return petInfo;
};

function addToList() {
	$('.adoptable-pets').on("click", ".add-to-list", function(e) {
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