$(document).ready(function() {
  $('#master').val(localStorage.hp_master).trigger('focus_empty')
  if ($('#master').val() != '') {
    $('#master').next('.clearinput').fadeIn(50)
  }
  
  // Set settings
  $('#settings input, #settings select').each(function(index) {
    var id = $(this).attr('id')  
    switch (typeof settings[id]) {
      case "boolean":
        $('#'+id).attr('checked', settings[id])
        break
      case "number":
        $('#'+id).val(settings[id])
        break
      case "string":
        $('#'+id).val(settings[id])
        break  
      default:
        console.log(id)
        break
    } 
  })
  
  $('#hatch').keyup(function(e){
    if (e.keyCode == 13 || e.keyCode == 9) {
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
    }
  })
  
  // Trigger panes
  $('.button').click(function() {
    panel = '.'+$(this).attr('href').substr(1)
    if (!$(panel).hasClass('active')) {
      $('.panel').slideUp('fast').removeClass('active')
    }
    $(panel).slideToggle('fast').toggleClass('active')
    return false
  })
  
  // Remember master
  $('#master').change(function(){
    if ($("#r_master").is(':checked') && $('#master').val() != "") {
      localStorage.hp_master = $('#master').val()
      console.log("Master saved")
    }
	})
	$('#master, #domain').keyup(function(){
    if ($(this).val() == "") {
      $('#secure').val('')
      $(this).next('.clearinput').fadeOut(50)
    } else {
      $(this).next('.clearinput').fadeIn(50)
    }
  })
  $('.clearinput').click(function() {
    $(this).prev('input').val('').focus();
    $(this).fadeOut(50);
    $('#secure').val('');
    return false;
  });
})
