/**
 * Create clear:both div.
 */
global.CLEAR_BOTH = CLEAR_BOTH = METHOD({

	run : function() {'use strict';

		return DIV({
			style : {
				clear : 'both'
			}
		});
	}
});
