$(document).ready(function() {
		$('.nav').onePageNav({
			changeHash: true,
			currentClass:'active'
		});
		$(".knob").knob();
		//$('#web_development,#social_media,#marketing').hide();
	 $("a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'facebook', slideshow: 3000, autoplay_slideshow: false, social_tools: false 	});
		
	   var $container = $('div#works').isotope({
        itemSelector: 'img.work',
        layoutMode: 'fitRows'
    });

    // items filter
    $('#works_filter a').click(function () {
        var selector = $(this).attr('data-filter');
        $('div#works').isotope({
            filter: selector,
            itemSelector: 'img.work',
            layoutMode: 'fitRows'
        });

        $('#works_filter').find('a.selected').removeClass('selected');
        $(this).addClass('selected');

        return false;
    });
	
	$('#submit').click(function(){
		sendMessage();	
	});
	
	$(".media").click(function(){
     window.location=$(this).find("a").attr("href"); 
     return false;
	});
		
	  $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
          $('#slider').removeClass('loading');
        }
      });
    });
	
	
	
function checkEmail(email) {
    var check = /^[\w\.\+-]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,6}$/;
    if (!check.test(email)) {
        return false;
    }
    return true;
}

function sendMessage() {
	
	var dataString = $('#frmContactus').serialize();
	
   // receive the provided data
    var name = $("#inputName").val();
    var email = $("#inputEmail").val();
	var phone = $("#inputPhone").val();
	var company = $("#inputCompany").val();
	
    var website = $("#inputWebsite").val();
    var msg = $("#inputMessage").val();

    // check if all the fields are filled
    if (name == '' || email == '' || msg == '') {
        $("div#msgs").html('<div class="alert alert-error">Please enter all the fields!</div>');
        return false;
    }
    // verify the email address
    if (!checkEmail(email)) {
        $("div#msgs").html('<div class="alert alert-error">Please enter a valid Email Address</div>');
        return false;
    }

    // make the AJAX request
    var dataString = $('#frmContactus').serialize();
    $.ajax({
        type: "POST",
        url: 'contact_send.php',
        data: dataString,
        dataType: 'json',
        success: function (data) {
			
            if (data.success == 0) {
                var errors = '<ul><li>';
                if (data.name_msg != '')
                    errors += data.name_msg + '</li>';
                if (data.email_msg != '')
                    errors += '<li>' + data.email_msg + '</li>';
                if (data.message_msg != '')
                    errors += '<li>' + data.message_msg + '</li>';
              

                $("div#msgs").html('<div class="alert alert-error">Could not complete your request. See the errors below!</div>' + errors);
            }
            else if (data.success == 1) {

                $("div#msgs").html('<div class="alert alert-success">You message has been sent successfully!</div>');
            }

        },
        error: function () {
            $("div#msgs").html('<div class="alert alert-error">Could not complete your request. Sorry!</div>');
        }
    });

    return false;
}