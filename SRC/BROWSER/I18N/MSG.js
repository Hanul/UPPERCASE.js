/**
 * Get internationalization message.
 */
global.MSG = MSG = METHOD({

	run : function(msgs) {'use strict';
		//REQUIRED: msgs

		var
		// msg
		msg = msgs[INFO.getLang()];

		if (msg === undefined) {
			EACH(msgs, function(_msg) {
				msg = _msg;
				return false;
			});
		}

		return msg;
	}
});

