var settings = {
	"key"		:  null,
	"symbols"	: 10,
	"caps"		: true,
	"length"	: 10,
	"algorithm"	: "default",
	"r_master"	: true,	
	"r_settings": false,
	"r_url"		: true	
}
$(document).ready(function() {
  $(window).resize(function () { 
    $('#window-size').html(window.innerWidth)
  });
  
  $('#master').focus();
  
  settings.key = $('#key').val();
  
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
})
