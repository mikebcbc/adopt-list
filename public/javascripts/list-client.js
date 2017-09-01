var RESULT_TEMPLATE = (
	'<div class="pet">' +
		'<div class="photo">' +
		'</div>' +
		'<div class="name"></div>' +
		'<div class="description"><p></p></div>' +
		'<div class="action">' +
			'<a href class="remove-from-list">- REMOVE FROM LIST</a>' +
			'<a href class="contact-shelter">CONTACT SHELTER<div class="tool-tip"></div></a>' +
		'</div>' +
	'</div>'
);

function renderPet(pet) {
	var template = $(RESULT_TEMPLATE);
	template.attr("data-id", pet._id);
	template.attr("data-phone", pet.contactInfo.phone);
	template.attr("data-email", pet.contactInfo.email);
	if (pet.contactInfo.phone) {
		template.find(".tool-tip").append('<div class="phone">Phone: ' + pet.contactInfo.phone + '</div>');
	}
	if (pet.contactInfo.email) {
		template.find(".tool-tip").append('<div class="email">Email: ' + pet.contactInfo.email + '</div>');
	}
	template.find(".photo").css('background-image', 'url("' + pet.image + '")');
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
		url: BASE_URL + "/list",
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
		var pet = $(this).closest(".pet");
		$.ajax({
			type: "DELETE",
			url: BASE_URL + "/list/" + pet.attr('data-id'),
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
}

function contactShelter() {
	$('.adoptable-pets').on("click", ".contact-shelter", function(e) {
		e.stopPropogation();
	})
};

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
	getListedPets();
	removeFromList();
	expandPet();
	contactShelter();
})