$('.login-form').find('input').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } else {
        label.removeClass('highlight');   
      }   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 
      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

$('.login').submit(function(e) {
  e.preventDefault();
  var username = $("#login input.username").val();
  var password = $("#login input.password").val();
  login(username, password);
});

function incorrectLogin() {
  $('.login-error').remove();
  $('.login').prepend('<span class="login-error">The username or password is incorrect. Please try again.');
}


function login(username, password) { 
  $.ajax
  ({
    type: "POST",
    url: "/auth/login",
    dataType: 'json',
    headers: {
      "Authorization": 'Basic ' + btoa(username + ":" + password)
    },
    success: function (tkn) {
      if (!tkn.authToken) {
        incorrectLogin();
      } else {
        $('.login-error').remove();
        localStorage.setItem('authToken', tkn.authToken);
        $(location).attr('href', BASE_URL + '/browse?auth_token=' + tkn.authToken);
      }
    }
  });
}

$('.register').submit(function(e) {
  e.preventDefault();
  var username = $("#register input.username").val();
  var password = $("#register input.password").val(); 
  var zip = $("#register input.zip").val(); 
  $.ajax
  ({
    type: "POST",
    url: "/users",
    data: {
      username: username,
      password: password,
      zip: zip
    },
    dataType: 'json',
    success: function () {
      login(username, password);
    }
  });
})