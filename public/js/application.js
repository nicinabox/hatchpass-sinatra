$(document).ready(function() {
  if (!localStorage.saved_domains) {
    localStorage.saved_domains = JSON.stringify([])
  }
  var saved_domains = JSON.parse(localStorage.saved_domains)
  for (var i=0, len = saved_domains.length; i < len; i++) {
    $('#saved_domains').append("<li>"+saved_domains[i]+"</li>")
  };
  
  // Javascript checkboxes
  $('input[type="checkbox"]').wrap('<span class="toggle"></span>')
  $('input[type="checkbox"]').change(function() {
    if ($(this).is(':checked')) {
      $(this).closest('.toggle').removeClass('off')
    } else {
      $(this).closest('.toggle').addClass('off')
    }
  })
  
  // iPhone checkbox fix
  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
  	$(document).ready(function () {
  		$('label[for]').click(function () {
  			var el = $(this).attr('for');
  			if ($('#' + el + '[type=radio], #' + el + '[type=checkbox]').attr('selected', !$('#' + el).attr('selected'))) {
  				return;
  			} else {
  				$('#' + el)[0].focus();
  			}
  		});
  	});
  }
  
  // help
  $('#tagline').click(function() {
    $('#help').slideToggle('fast')
    return false
  });
  
  $('#length').change(function() {
    $('.range-val').text($(this).val())
  })
  
  // $('#aboutproject').click(function() {
  //   $('#about').slideToggle(100);
  //   return false;
  // });
  
  $('#master').val(localStorage.hp_master).trigger('focus_empty')
  if ($('#master').val() != '') {
    $('#master').next('.clearinput').fadeIn(50)
  }
  
  // Set settings
  $('#settings input, #settings select').each(function(index) {
    var id = $(this).attr('id')  
    var el = "#"+id
    switch (this.type) {
      case "checkbox":
        $(el).attr('checked', settings[id])
        if (!settings[id]) {
          $(el).closest('.toggle').addClass('off')
        }
        break
      case "range":
        $(el).val(settings[id]).prev('.range-val').text(settings[id])
        break
      default:
        console.log(id)
        break
    } 
  })
  $('#settings').bind('change keyup', function(e) {
      $(this).stop().delay(300).trigger('save_settings')
    return false
  })
  
  $('#save_key').trigger('save_key')
  
  // Remember master
  $('#master').change(function(){
    if ($("#remember").is(':checked') && $('#master').val() != "") {
      localStorage.hp_master = $('#master').val()
    }
	})
	$('#master, #domain').keyup(function(){
    if ($(this).val() == "") {
      $('#secret').val('')
      $(this).next('.clearinput').fadeOut(50)
    } else {
      $(this).next('.clearinput').fadeIn(50)
    }
  })
  
  $('#domain').blur(function() {
    var domains = JSON.parse(localStorage.saved_domains)
    if ($(this).val() != "") {
      domains.push($(this).val())
      domains = JSON.stringify($.unique(domains))
      localStorage.saved_domains = domains
    }
  });
  
  $('#domain').dblclick(function() {
    $('#saved_domains').slideDown('fast')
  });
  
  $('#saved_domains li').click(function() {
    $('#domain').val($(this).text()).trigger('change').trigger('keyup')
    $('#saved_domains').slideUp('fast')
    $('#secret').select()
  });
  
  
  $('.clearinput').click(function() {
    $(this).prev('input').val('').focus();
    $(this).fadeOut(50);
    $('#secret').val('');
    return false;
  })
  
  $('#save_key').click(function() {
    $('#save_key').trigger('save_key')
    return false
  })
  
})
