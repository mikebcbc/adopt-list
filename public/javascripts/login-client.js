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
        console.log('nope.');
        // Notify user that account is incorrect
      } else {
        console.log(tkn);
        localStorage.setItem('authToken', tkn.authToken);
        $(location).attr('href', 'http://localhost:3000/browse?auth_token=' + tkn.authToken);
      }
    }
  });
}

$('.register').submit(function(e) {
  e.preventDefault();
  var username = $("#register input.username").val();
  var password = $("#register input.password").val(); 
  $.ajax
  ({
    type: "POST",
    url: "/users",
    data: {
      username: username,
      password: password
    },
    dataType: 'json',
    success: function () {
      login(username, password);
    }
  });
})