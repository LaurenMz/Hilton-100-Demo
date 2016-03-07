// Process JSON data
$.get( 'data/properties.json', function( data ) {
	var properties = [],
	row = 0,
	firstRow = true;

	$.each( data, function( index, property ) {
		// Create groups of 5
		if ( index % 5 === 0 ) {
			if ( firstRow ) {
				firstRow = false;
			} else {
				row++;	
			}
			properties[row] = [];
		}
		// Add property to the group
		properties[row].push( property );
	});

	// Create DOM elements for property tiles
	for ( row = 0; row < 4; row++ ) {
		loadPropertyRow(properties, row);
	}

	// Load more property tiles as user scrolls down
	$(window).scroll(function() {
		if( $(window).scrollTop() >= $(document).height() - $(window).height() - 100 ) {
	        if (row < properties.length) {
	        	console.log(row);
	       		loadPropertyRow(properties, row);
	       		row++;
	        }
	        tileHover();
	        tileFlip();
	    }
	});

	tileHover();
	tileFlip();	
});

function loadPropertyRow(propertiesArray, row) {
	var grid = document.getElementById( 'properties-grid' );
	$( grid ).append( '<div id=row-' + row + ' class="row-5"></div>' );
	for ( col = 0; col < propertiesArray[row].length; col++ ) {
		var tile = '<div class="col-2 tile">';
		tile += '<div class="hover">';
		tile += '<h3>' + propertiesArray[row][col].title + '</h3>';
		tile += '<span class="button flip-fact">View Fact</span>';
		tile += '</div>';
		tile += '<div class="front">';
		tile += '<img src="' + propertiesArray[row][col].image + '" height="192px" width="192px">';
		tile += '</div>';
		tile += '<div class="back">';
		tile += '<p>' + propertiesArray[row][col].body + '</p>';
		tile += '</div>';
		tile += '</div>';
		$( '#row-' + row ).append( tile );
	}
}

function tileHover() {
	$( '.tile' ).hover(
		function() {
			$( '.hover', this ).addClass( 'animate' );
		}, function() {
			$( '.hover', this ).removeClass( 'animate' );
		});
}

function tileFlip() {
	$( '.flip-fact' ).click( function() {
		$( this ).parent().removeClass( 'animate');
		var thisTile = $( this ).closest( '.tile' );
		setTimeout( function() {
			thisTile.addClass( 'flip' );
		}, 200 );

		$( this ).closest( '.tile' ).mouseleave( function() {
			$( this ).removeClass( 'flip' );
		} );
	});
}