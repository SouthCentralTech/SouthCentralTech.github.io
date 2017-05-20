(function() {
    loadEventType('Meetups');
})();

$('.eventType').click(function() {
    $('.eventType').parent().removeClass('active');
    $(this).parent().addClass('active');
    loadEventType($(this).text());
});

function loadEventType(eventType) {
    $.ajax('https://api.github.com/repos/SouthCentralTech/Events/contents/' + eventType, {
        dataType: 'json',
        async: true,
        success: function(data, status) {
            if (data != null && data.length > 0) {
                $('#items').children().detach();
                for (var index = 0; index < data.length; index++) {
                    var event = parseEventName(data[index].name);

                    if (event != null) {
                        $('#items').append('<div class="col-md-4"><h2>' + event.name + '</h2><p><i>' + (event.date !== undefined && event.date !== null ? event.date : '') + '</i></p><p>' + event.description + '</p><p><a class="btn btn-default" href="' + data[index].download_url + '" role="button">Download &raquo;</a></p></div>');                                
                    }
                }
            }
        }
    });
}

function parseEventName(name) {
    if (name != null && name != undefined) {
        var parts = name.split('-');

        if (parts.length >= 5) {
            var date = parts.join('-', parts.slice(0, 3));
            var description = parts[4].split('.')[0];
            
            return { name: parts[3], date: date, description: description };
        }
        else if (parts.length >= 2) {
            var description = parts[1].split('.')[0];
            
            return { name: parts[0], description: description };
        }
    }

    return null;
}