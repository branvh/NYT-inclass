//page update

//page clear


$('#submit').on('click', function() {

    var key = '2341b8bd89254c4f8b3a1ff1e097d8ea';
    var searchTerm = $('#search-term').val().trim(); //watch for var names
    var number = $('#number-of-records').val().trim();
    var start = $('#start-year').val().trim();
    start+='0101';
    var stop = $('#end-year').val().trim();
    stop+='1104';

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': key,
        'q':searchTerm,
        'begin_date': start,
        'end_date': stop
    });

    console.log(searchTerm, number, start, stop);

    $.ajax({ url: url, method: 'GET' }).done(function(response) {

    	console.log(response);

    	var results =[];

    	//build results array
    	for (var i = 0; i < number; i++) {

    		results.push(response.response.docs[i]);
    	}


    	console.log(results);
    	updatePage(results);


    });

});

function updatePage (results){


	//target the top article box

	//loop through items...grap: headline, author, pages??, section, link, 

	var target = $('#articles');

	for (var i = 0; i < results.length; i++) {

		var element = $('<div>');
		var itemNum = $('<p>')
		var headline = $('<h2>');
		var source = $('<p>');
		var link = $('<p>');

		element.addClass('row');
		itemNum.text(i + ' ');
		headline.text(results[i].headline.main);
		source.text(results[i].source);
		link.text(results[i].web_url);

		element.append(itemNum).append(headline).append(source).append(link);
		target.prepend(element);
	}

	//need to call function to clear out pages

}
