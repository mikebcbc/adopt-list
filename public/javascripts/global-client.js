var BASE_URL = "https://adopt-list.herokuapp.com";

$(function(){
	if (localStorage.getItem('authToken')) {
		$("nav .login").text('Logout').attr('href', '/logout');
	} else {
		$("nav .login").text('Login').attr('href', '/login');
	}
});