jQuery.expr[':'].focus = function( elem ) {
  return elem === document.activeElement && ( elem.type || elem.href );
};

var key = localStorage.hp_key
if (key != location.pathname.substr(1)) {
  window.location = "/"+key
}
var settings = {
	"key"		:  key || location.pathname.substr(1),
	"symbols"	: true,
	"caps"		: true,
	"length"	: 10,
	"algorithm"	: "default",
	"r_master"	: true,	
	"r_settings": false,
	"r_url"		: true	
}

$(function() {
  $(window).resize(function () { 
    console.log(window.innerWidth)
  })
  
  // Focus
  $('input').bind('focus_empty', function(e) {
    if ($('#master').val() != "") {
      $('#domain').focus().select()
    } else {
      $('#master').focus().select()
    }
  })
  // Panels
  $('.panel').bind('hide', function(event) {
    $(this).slideUp('fast')
  })
  $('.button').each(function(index) {
    $(this).bind('click', function() {
       panel = '.'+$(this).attr('href').substr(1)
       if (!$(panel).hasClass('active')) {
         $('.panel').slideUp('fast').removeClass('active')
       }
       $(panel).slideToggle('fast').toggleClass('active')
       return false
     })
  });
  
  // Help
  $('#help').bind('help', function(event) {
    $(this).fadeToggle();
  })
  
  $(document).keyup(function(e){
    var focused = $("input").is(":focus")
    var help = $('#help').is(':visible')
		switch(e.keyCode) {
		  case 27: // Esc
		    if (focused) {
		      $(':focus').blur()
		    } else {
		      $('#help').fadeOut('fast')
		      $('.panel').trigger('hide')
  		    $('input').trigger('focus_empty')
		    }
		    break;
		  case 83: // s
		    $('#my_settings').trigger('click')
		    break;
		  case 85: // u
		    $('#my_url').trigger('click')
		    break;
		  case 68: // d
		    $('#domain').select();
		    break;
		  case 77: // m
		    $('#master').select();
		    break;
		  case 191: case 72: // foward slash or h
		    if (!focused) {
		      $('#help').fadeToggle('fast')
		    }
		  default:
		    console.log(e.keyCode)
		    break;
		}
  })
  
})