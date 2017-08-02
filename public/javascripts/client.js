function addToList() {
	$('.add-to-list').click(function(e) {
		e.preventDefault();
		console.log('hi');
	});
}


$(function() {
	addToList();
})

// const listPets = $.getJSON('localhost:3000/pets')
//   .done(function(pets) {
//     console.dir(pets);
//   })

// exports.data = listPets;