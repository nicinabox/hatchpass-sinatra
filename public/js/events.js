jQuery.expr[':'].focus = function( elem ) {
  return elem === document.activeElement && ( elem.type || elem.href );
};
if (Modernizr.localstorage) {
  var supports_localstorage = true
} else {
  var supports_localstorage = false
}

var key = localStorage.hp_key || location.pathname.substr(1)
if ((settings = localStorage.hp_settings)) {
  settings = JSON.parse(settings)
} else {
  var settings = {
  	"key"		:  key,
  	"symbols"	: true,
  	"caps"		: true,
  	"length"	: 10,
  	"algorithm"	: "default",
  	"r_master"	: true,	
  	"r_settings": false,
  	"save_key": true
  }
}

if (key != location.pathname.substr(1)) {
  window.location = "/"+key
} else {
  localStorage.hp_key = key
}


$(function() {
  if (!supports_localstorage) {
    $('#localstorage_warning').show()
  }
  
  // Saving settings
  $('#settings').bind('temp_save_settings', function(event) {
    $('#settings input, #settings select').each(function(index) {
      var id = $(this).attr('id')  
      var val = $(this).val()
      var checked = $(this).is(':checked')
      switch (typeof settings[id]) {
        case "boolean":
          settings[id] = checked
          break
        default:
          settings[id] = val
          break
      }
      if ($('#r_master').is(':checked')) {
        localStorage.hp_master = $('#master').val()
      } else {
        localStorage.removeItem('hp_master')
      }
      if ($('#r_settings').is(':checked')) {
        localStorage.hp_settings = JSON.stringify(settings)
      } else {
        localStorage.removeItem('hp_settings')
      }
    })
    $('#hatch').trigger('change')
  })
  
  // Update form
  $('#hatch').bind('change',function(e){
      var master = $('#master').val()
      var domain = $('#domain').val()
      if (master != '' && domain != '') {
        $.post('/'+settings.key, {
         master: master, 
         domain: domain,
         settings: settings
         }, function(data){
            $('#secret').val(data).select()
        })
      }
  })
  
  // New Key
  $('#new_key').bind('click', function(event) {
    localStorage.removeItem('hp_key')
    localStorage.removeItem('hp_master')
    $('.panel').slideUp('fast', function() {
      window.location = '/'
    })
    return false
  })
  // Save Key
  $('#save_key').bind('save_key', function(event) {
    if ($(this).data('saved')) { // Forget it
      localStorage.removeItem('hp_key')
      settings.save_key = false
      $(this).text('Save Key').data('saved', false)
    } else {
      localStorage.hp_key = settings.key
      settings.save_key = true
      $(this).html('Forget Key: '+ settings.key).data('saved', true)
    }
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
  $('.nav-button').each(function(index) {
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
		    $('#about').slideUp('fast');
		    break;
		  case 74: // j
		    if (!focused) $('#my_settings').trigger('click')
		    $('#about').slideUp('fast');
		    break;
		  case 75: // k
		    if (!focused) $('#my_url').trigger('click')
		    $('#about').slideUp('fast');
		    break;
		  case 68: // d
		    if (!focused) $('#domain').select();
		    $('#about').slideUp('fast');
		    break;
		  case 77: // m
		    if (!focused) $('#master').select();
		    $('#about').slideUp('fast');
		    break;
		  case 191: case 72: // foward slash or h
		    if (!focused) {
		      $('#help').slideUp('fast')
		    }
		  default:
		    break;
		}
  })
  
})