$(function() {
	localStorage.removeItem('authToken');
	$(location).attr('href', 'http://localhost:3000/');
})