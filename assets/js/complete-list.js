$(document).ready(function () {
    $("#physician-list").append("<ul></ul>");
    var count;
    $.ajax({
        type: 'GET',
        url: "data/locations.xml",
        dataType: "xml",
        success: function (xml) {

            count = xml.getElementsByTagName('marker').length;
            $('.jumbotron').append('<h3>Count:' + count + '</h3>');

            // Loop through each marker
            $(xml).find('marker').each(function () {
                count++;
                var name = $(this).attr('name');
                var email = '<a href="mailto:"' + $(this).attr('email') + '">' + $(this).attr('email') + '</a>';
                var web = $(this).attr('web');
                var services = $(this).attr('features');

                var address = [];

                address.push($(this).attr('address'));
                address.push($(this).attr('address2'));
                address.push($(this).attr('state'));
                address.push($(this).attr('postal'));
                address.push($(this).attr('country'));
                address.push($(this).attr('phone'));
                
                address.push('</address>');
                
                address = '<p class="darkness"><strong>Address:</strong><address>' + address.filter(function(n) {return n}).toString().replace(/,/gi, '<br>');
    

                if (services.length > 1) {
                    services = '<strong>Services</strong>: <br>' + $(this).attr('features').replace(/,/gi, '<br>');
                } else {
                    services = '<p  class=" darkness"><strong>No services in the database</strong></p>'
                }

                var clinicianArray = [];

                for (var i = 0; i < 7; i++) {
                    clinicianArray.push($(this).attr('clinicianName' + i));
                }

                clinicianArray = clinicianArray.filter(function (n) {
                    return n
                }).toString().replace(/,/gi, '<br>');

                var cliniciansPresent = '';

                if (clinicianArray.length > 1) {
                    cliniciansPresent += '<p class=" darkness"><strong>Clinicians:</strong><br>' + clinicianArray + '</p>';
                } else {
                    cliniciansPresent += '<p  class=" darkness"><strong>No clinicians in the database</strong></p>';
                }


                $("<li></li>").html(
                    '<h2>' + name + '</h2>' + address +
                    '<p class=" darkness"><strong>Email:</strong> ' + email + '</p>' +
                    '<p class=" darkness"><strong>Website:</strong> <a href="' + web + '">' + web + '</a></p>' +
                    cliniciansPresent + services).appendTo("#physician-list ul");

            });

        },
        error: function () {
            alert("The XML File could not be processed correctly.");
        }
    });

});