$(function() {
  $(window).resize(function () { 
    console.log(window.innerWidth)
  })
  
  $('input').bind('focus_empty', function(e) {
    if ($('#master').val() != "") {
      $('#domain').focus().select()
    } else {
      $('#master').focus().select()
    }
  })
  
})
