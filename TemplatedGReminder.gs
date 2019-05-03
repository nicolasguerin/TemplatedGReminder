var NOTIFICATION_DELAY_IN_DAYS = 2;
var EVENT_TYPE = '1to1';

var REMINDER_SUBJECT = 'Let\'s prepare our 1to1!';
var REMINDER_BODY = 
    'Hi,\nIt\'s time to prepare our next 1to1.\n\n'+
    'Could you please share with me some topics you would like to talk about prior to our meeting?\n'+
    'Answering this email will help me to come prepare and hopefully bring answer or good news.\n'+
    '\nWe will also discuss about: \n'+
    '\t- Progress on your SMART goals\n'+
    '\t- Progress since our previous 1to1\n'+
    '\t- Any new topic you would like to address\n'+
    '\nTo get you inspired, here are some other topics:\n'+
    '\t- How is your workload? Is your work/life balance ok right now?\n'+
    '\t- How do you feel about latest company news/events?\n'+
    '\t- How do you feel about your squad and Tech organization?\n'+
    '\t- What could we do to improve your daily life?\n'+
    '\t- Are you happy with your recent work?\n\n'+
    'Regards,\n'+
    '\nNicolas';

// Get Events from a calendar at a specific date
function getEvents(date) {
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(date); 
  return events;
}

// Filter events by type
function filterEventsByType(events, type){
  var results = [];
  events.forEach(function(event) {
    if(event.getTitle().indexOf(type) == 0){
      Logger.log('%s (at %s) is an event of type %s', event.getTitle(), event.getStartTime(), type);
      results.push(event);
    }
  });
  
  return results;
}

function sendReminder(events){
 
  events.forEach(function(event) {
    var guestList = event.getGuestList();
    guestList.forEach(function(guest) {
      GmailApp.sendEmail(guest.getEmail(), REMINDER_SUBJECT, REMINDER_BODY);
    });
  });
}


// 
function main() {
  var date = new Date();
  var delay = NOTIFICATION_DELAY_IN_DAYS;
  
  if(date.getDay()==6)
    return;
  
  if(date.getDay()== 5 && NOTIFICATION_DELAY_IN_DAYS < 3)
    delay = delay + 1;
  
  var futureEventDate = new Date(date.setDate(date.getDate()+delay));
  
  Logger.log('Looking for %s on the %s',EVENT_TYPE, futureEventDate);
  
  var eventsList = getEvents(futureEventDate) ;
  var eventsFiltered = filterEventsByType(eventsList,EVENT_TYPE);
  sendReminder(eventsFiltered); 
}
