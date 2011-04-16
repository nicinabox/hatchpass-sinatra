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
if (!key) {
  key = settings.key
}

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
