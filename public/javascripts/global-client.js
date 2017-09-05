var BASE_URL = "http://localhost:3000";

$(function(){
	if (localStorage.getItem('authToken')) {
		$("nav .login").text('Logout').attr('href', '/logout');
	} else {
		$("nav .login").text('Login').attr('href', '/login');
	}
});