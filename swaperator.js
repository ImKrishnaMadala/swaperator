var tickInterval;

//_______________________

// Hack for missing JSON file
Date.prototype.CLOCK_DESCRIPTIONS = [
 {
    'hours': 
        {
             '1': 'one',
             '2': 'two',
             '3': 'three',
             '4': 'four',
             '5': 'five(?!x)',
             '6': 'six',
             '7': 'seven',
             '8': 'eight',
             '9': 'nine',
            '10': 'ten(?!f)',
            '11': 'eleven',
            '12': 'twelve'
        },
    
    'minutes': 
        {
             '0': 'oclock',
             '5': 'five(?!t)|past',
            '10': 'ten(?!s)|past',
            '15': 'quarter|past',
            '20': 'twenty|past',
            '25': 'twentyfive|past',
            '30': 'half|past',
            '35': 'twentyfive|to',
            '40': 'twenty|to',
            '45': 'quarter|to',
            '50': 'ten(?!s)|to',
            '55': 'five(?!t)|to'
        }
       
 }
];

Date.prototype.getTimeAsText = function() {
	var hours, minutes, guessMins, i = this.getMinutes();
	var period = this.getHours();
		period = period >= 12 ? 'pm' : 'am';
		
	// Get minutes text description for every increment of 5, and return
	// description, if not multiple of 5 check value is 58 or 59 if true
	// return oclock, else round to nearest multiple of 5
	minutes =  this.CLOCK_DESCRIPTIONS[0].minutes[this.getMinutes()];
  
	if ( typeof minutes == 'undefined' ) {
	  
	  if ( i > 57 && i <= 59 ) {
		  minutes = this.CLOCK_DESCRIPTIONS[0].minutes[0]; // return oclock
	  } else {
	  	guessMins = Math.round( this.getMinutes() / 5 ) * 5;; // Round to nearest 5
		  minutes =  this.CLOCK_DESCRIPTIONS[0].minutes[guessMins];
	  }
	  
	}
  
	// Convert getHours 0-23 to 12hr clock
	hours = this.getHours();
		if ( hours > 12 ) {
			hours -= 12;
		} else if ( hours === 0 ) {
			hours = 12;
		}
  
	// Increment hour for minutes greater than 32, push the hour back to 1 if at 12
	if ( i > 32 && hours < 12 ) {	
		hours++; 
	} else if ( i > 32 ) {
		hours = 1;
	}
   
	// Match hour to text description from config
	hours = this.CLOCK_DESCRIPTIONS[0].hours[hours];
  
		return '(it(?=l)|is(?=t)|' + minutes + '|' + hours + '|' + period + ')';
};

function setTimeString( e ) {
	// Sets the pattern of text
	var patternString = 'itlistempusquarterkrdvtwentyfivexhalfbtenftopasterunineonesixthreefourfivetwoeightelevenseventwelvetenseoclockamxpmxfugit';
  
		e.innerHTML = patternString;
}

function illuminateTime( e ) {
	// Get element by ID
	e = document.getElementById( e );

	// Get date as text string
	var d = new Date();
	// New regex with formatted date text string '(match|alternation)' 
	var re = new RegExp( d.getTimeAsText(), 'gi' );

	// Reset time string 
    	setTimeString( e );
	// Replace content of e with regex matches wrapped in span
		e.innerHTML = e.innerHTML.replace( re, "<span class='illuminate'>$1</span>" );
	
		tick();
}

function tick() {
	var tick, d = new Date(); // Interval declared in global scope
	
	clearInterval( tickInterval);

	tick = ( 60 - d.getSeconds() ) * 1000;
		( tick == 0 ) ? tick = 60000 : tick;
		
	    // Set interval to re-call every tick, will fire at 1 second past the minute
	    tickInterval = setInterval( function() {
	    	illuminateTime( 'tempus-fugit' ); 
	    }, tick );
		
}

illuminateTime( 'tempus-fugit' );