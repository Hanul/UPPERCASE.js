/**
 * create date type.
 */
global.CREATE_DATE = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.year
		//OPTIONAL: params.month
		//OPTIONAL: params.date
		//OPTIONAL: params.hour
		//OPTIONAL: params.minute
		//OPTIONAL: params.second
		
		var
		// year
		year = params.year,
		
		// month
		month = params.month,
		
		// date
		date = params.date,
		
		// hour
		hour = params.hour,
		
		// minute
		minute = params.minute,
		
		// second
		second = params.second,
		
		// now cal
		nowCal = CALENDAR(new Date());
		
		if (year === undefined) {
			year = nowCal.getYear();
		}
		
		if (month === undefined) {
			month = date === undefined ? 0 : nowCal.getMonth();
		}
		
		if (date === undefined) {
			date = hour === undefined ? 0 : nowCal.getDate();
		}
		
		if (hour === undefined) {
			hour = minute === undefined ? 0 : nowCal.getHour();
		}
		
		if (minute === undefined) {
			minute = second === undefined ? 0 : nowCal.getMinute();
		}
		
		if (second === undefined) {
			second = 0;
		}

		return new Date(year, month - 1, date, hour, minute, second);
	}
});
