var settings = {
	"key"		:  location.pathname.substr(1),
	"symbols"	: true,
	"caps"		: true,
	"length"	: 10,
	"algorithm"	: "default",
	"r_master"	: true,	
	"r_settings": false,
	"r_url"		: true	
}


$(document).ready(function() {
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
    pane = '.'+$(this).attr('href').substr(1)
    $(pane).slideToggle('fast')
    return false
  })
})
