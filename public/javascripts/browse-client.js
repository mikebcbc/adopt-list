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

var BASE_URL = "http://localhost:3000";

var PETS_ARRAY;

var PETS_IN_LIST;

// function checkPet(pet) {
// };

function renderPet(pet) {
	var template = $(RESULT_TEMPLATE);
	template.attr("data-id", pet.id.$t);
	template.attr("data-phone", pet.contact.phone.$t);
	template.attr("data-email", pet.contact.email.$t);
	template.find(".contact-shelter").attr('href', "mailto:" + pet.contact.email.$t);
	template.find(".photo").css('background-image', 'url("' + pet.media.photos.photo[0] + '")');
	template.find(".name").text(pet.name.$t);
	template.find(".description p").text(pet.description.$t);
	$('.adoptable-pets').append(template);
}

function appendPets(pets) {
	var results = pets.forEach(function(pet) {
			return renderPet(pet);
	});
}

function fetchPets() {
	return Promise.all([
		$.ajax({
			type: "GET",
			url: BASE_URL + "/pets",
			dataType: "json",
			contentType: "application/json"
		})
		.done(function(pets) {
			Promise.resolve(pets);
		}),
		$.ajax({
			type: "GET",
			url: BASE_URL + "/list",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('authToken')
			}
		})
		.done(function(list) {
			Promise.resolve(list);
		})
	])
	.then(function([pets, list]) {
		PETS_ARRAY = pets;
		PETS_IN_LIST = list;
		appendPets(PETS_ARRAY);
	})
};

function getPetData(petID) {
	
	var foundPet = PETS_ARRAY.find(function(pet) {
		return pet.id.$t == petID;
	});

	var petInfo = {
		petId: petID,
		name: foundPet.name.$t,
		description: foundPet.description.$t,
		image: foundPet.media.photos.photo[0],
		contactInfo: {
			phone: foundPet.contact.phone.$t,
			email: foundPet.contact.email.$t
		}
	};
	return petInfo;
};

function addToList() {
	$('.adoptable-pets').on("click", ".add-to-list", function(e) {
		e.preventDefault();
		e.stopImmediatePropagation(); // Why does this work as opposed to stopPropogation?
		var pet = getPetData($(this).closest(".pet").attr('data-id'));
		$.ajax({
			type: "POST",
			url: BASE_URL + "/list",
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('authToken')
			},
			data: JSON.stringify(pet),
			dataType: "json",
			contentType: "application/json"
		})
		.done(function(e) {
			$('.pet[data-id="' + e.petId + '"] .add-to-list').attr("class", "remove-from-list").text("REMOVE FROM LIST");
		});
	});
};

function removeFromList() {
	$('.adoptable-pets').on("click", ".remove-from-list", function(e) {
		e.preventDefault();
		e.stopImmediatePropagation(); // Why does this not work?
		var pet = $(this).closest(".pet");
		$.ajax({
			type: "DELETE",
			url: "http://localhost:3000/list/" + pet.attr('data-id'),
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('authToken')
			},
			contentType: "application/json",
		})
		.done(function(e) {
			pet.remove();
		})
		.fail(function(err) {
			console.log(err);
		});
	});
};

function contactShelter() {
	$('.adoptable-pets').on("click", ".contact-shelter", function(e) {
		e.stopPropogation(); // works here for some reason?
	})
}

function expandPet() {
	$('.adoptable-pets').on('click', '.pet', function(e) {
		$(this).closest(".pet").addClass('clicked');
		$('.overlay').show().css('z-index', '998');
		$('body').css('overflow', 'hidden');
		$('.overlay').click(function() {
			$('.pet').removeClass('clicked');
			$('.overlay').hide().css('z-index', '-1');
			$('body').css('overflow', 'auto');
		})
	})
};


$(function() {
	fetchPets();
	expandPet();
	addToList();
	contactShelter();
})