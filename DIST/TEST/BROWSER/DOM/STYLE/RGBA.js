var
// test dom
dom = DOM({
	tag : 'div',
	c : 'This is test dom.'
}).appendTo(BODY);

ADD_STYLE({
	node : dom,
	style : {

		// set rgba color.
		backgroundColor : RGBA([255, 0, 0, 0.5]),
		padding : 20
	}
});

// remove dom after 3 seconds.
DELAY(3, function() {
	dom.remove();
});
