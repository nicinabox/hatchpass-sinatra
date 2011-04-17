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
  $('#settings').bind('change keyup', function(e) {
    $(this).trigger('temp_save_settings')
    return false
  })
  
  $('#save_key').trigger('save_key')
  
  
  // Remember master
  $('#master').change(function(){
    if ($("#r_master").is(':checked') && $('#master').val() != "") {
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
