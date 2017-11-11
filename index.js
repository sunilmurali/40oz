const Places = require('./places');
let places = new Places();

var toLocation = 'San Francisco, California';
var type1 = 'places to visit';

var fromDate = new Date();
var toDate = new Date();
toDate.setDate(toDate.getDate() + 5);


let callback = (error, response)=>{
  if ( error ) {

  } else {
    var results = response.results;

  }
}


places.plan(toLocation, ['places to visit', 'museum', 'hiking'] ,{ from: fromDate, to: toDate }, places.PLAN_TYPE.EASY, callback )
