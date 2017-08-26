var RESULT_TEMPLATE = (
	'<div class="pet">' +
		'<div class="photo">' +
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
	var template = $(RESULT_TEMPLATE);
	template.attr("data-id", pet.id.$t);
	template.attr("data-phone", pet.contact.phone.$t);
	template.attr("data-email", pet.contact.email.$t);
	template.find(".photo").css('background-image', 'url("' + pet.media.photos.photo[0] + '")');
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

function getPetData(petID) {
	
	var foundPet = PETS_ARRAY.find(function(pet) {
		return pet.id.$t == petID;
	});

	var petInfo = {
		name: foundPet.name.$t,
		description: foundPet.description.$t,
		image: foundPet.media.photos.photo[0],
		contactInfo: {
			phone: foundPet.contact.phone.$t,
			email: foundPet.contact.email.$t
		}
	}

	return petInfo;
};

function addToList() {
	$('.adoptable-pets').on("click", ".add-to-list", function(e) {
		e.preventDefault();
		var pet = getPetData($(this).closest(".pet").attr('data-id'));
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

function expandPet() {
	$('.adoptable-pets').on('click', '.pet', function(e) {
		e.preventDefault();
		$(this).closest(".pet").addClass('clicked');
		$('.overlay').show().css('z-index', '998');
		$('body').css('overflow', 'hidden');
		$('.overlay').click(function() {
			$('.pet').removeClass('clicked');
			$('.overlay').hide().css('z-index', '-1');
			$('body').css('overflow', 'auto');
		})
	})
}


$(function() {
	fetchPets();
	addToList();
	expandPet();
})