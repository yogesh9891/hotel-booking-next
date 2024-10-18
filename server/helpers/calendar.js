const ical = require('node-ical');

export const getCalendarHelper = async (url) => {
    // for user
    try {
     let data =   await ical.async.fromURL(url);
//   let url = 'https://ingoibibo-prod.s3-ap-south-1.amazonaws.com/2747e05d6263fe2a3e2452fcde438626.ics';
    let responseData = [];
  for (let k in data) {
    if (data.hasOwnProperty(k)) {
        const ev = data[k];
        if (data[k].type == 'VEVENT') {
            // ev.start = new Date(ev.start.getTime());
            // console.log(ev.start)
            // console.log(  ,"sd")
            responseData.push(ev)
            // console.log(`${ev.summary} is in ${ev.start} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at `);
        }
    }
  }
  return responseData;

    } catch (err) {
              console.log(err)
              return [];
    }


  };