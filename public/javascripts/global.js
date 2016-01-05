function vote(Name){
	
	$.ajax({
        type: 'POST',
        data: {'name': Name},
        url: '/poll/vote',
        dataType: 'JSON'
    
    }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {
        }
        else {
        	alert('Error: ' + response.msg);
        }
    });
}


function loadResults(){
	$.getJSON( '/poll/poll_entries', function( data ) {

        var content = '';
        $.each(data, function(){
            content += '<div>';
            content += '<span>' + this.Votes + '</span>';
            content += '<a href="#" class="' + this.Name + '">Vote</a>';
            content += this.Name;
            content += '</div>';
        });

        $('#wrapper p').after(content);


        $("#wrapper div a").click(function() {
        vote($(this).attr("class"));	
        	
        $(this).parent().animate({
           width: '+=1px'
        }, 10);

        $(this).prev().html(parseInt($(this).prev().html()) + 1);
        return false;
    });
    });


}

function reset(node) {
	

	$.ajax({
        type: 'POST',
        url: '/poll/reset',
        dataType: 'JSON'
    }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {
        }
        else {
        	alert('Error: ' + response.msg);
        }
    });

    $("#wrapper div span").text('0');

    return false;
}

$(document).ready(function() {
	loadResults();
	
});

