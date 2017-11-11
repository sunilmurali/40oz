let config = require('./config').config;
let GooglePlaces = require('googleplaces');
let async = require('async')

let googlePlaces = new GooglePlaces(config.GOOGLE_API_KEY, config.GOOGLE_PLACES_OUTPUT_FORMAT);
let search = (parameters, callback) =>{
  googlePlaces.search(parameters,function (error, response) {
      if ( callback && typeof callback === 'function' )
        callback(error, response);
  });
}

function Places() {}

/**
 * @param parameters {Object} parameters for hte text search
 * @param dateRange {Object} specify from and to property {required}
 * @param planType
 */
Places.prototype.plan = (locationName, types , dateRange, planType, respCallback) =>{
  var events = buildParameterCallbacks(locationName, types);


  async.series (events, function (error, response){
    spread(response, dateRange, planType, respCallback);
  });
}

let buildParameterCallbacks = (locationName, types) => {
  var arr = [];
  for ( let type of types ) {
    arr.push( function (callback) {

      let parameters = {
        query : String.raw`${type} in ${locationName}`
      };

      googlePlaces.textSearch(parameters, function (error, response) {
        if ( error || response.status !== 'OK') {
          callback('Error');
        } else {
          var result ={};
          result[type] = response.results;
          callback(null, result);
        }
      });
    } );
  }
  return arr;
}

/**
 * todo planning
 */
let spread = (response, dateRange, planType, respCallback) => {
  console.log(response);
  console.log(dateRange);
  console.log(planType);
  respCallback(null,'success');
}

Places.prototype.PLAN_TYPE = {
  EASY: 1,
  BALANCED: 2,
  BANG_FOR_BUCK: 3,
  INSANE: 4
};

module.exports = Places;
