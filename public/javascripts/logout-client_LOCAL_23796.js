$(function() {
	localStorage.removeItem('authToken');
	$(location).attr('href', BASE_URL);
})