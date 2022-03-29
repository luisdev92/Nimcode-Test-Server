// 1 Hour = 60 minutes 
// 1 Minute = 60 seconds 
// 1 second = 1000 milliseconds

// Change Hours Threshold to Ping Google Cloud Instances.
const HOURS = 1; 

module.exports = {
    SLEEP_TIMER: HOURS * 60 * 60 * 1000,
};