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
  const username = $("input#username").val();
  const password = $("input#password").val(); 
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
        // $(location).attr('href', 'http://localhost:3000/my-list?auth_token=' + tkn.authToken);
        // Save token to local storage and redirect
      }
    }
});
})