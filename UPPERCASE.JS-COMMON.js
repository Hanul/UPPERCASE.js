global.TO_DELETE=TO_DELETE=null,global.CONFIG=CONFIG={},global.METHOD=METHOD=function(t){"use strict";var n,r,e=function(t,n){return void 0!==r?r(t,n):void 0};return e.type=METHOD,n="function"==typeof t?t(e):t,void 0!==n&&(r=n.run),e},global.CLASS=CLASS=METHOD(function(t){"use strict";var n,r=0;return t.getInstanceId=n=function(){return r+=1,r-1},{run:function(t){var r,e,i,o,u,a,E,c=function(t,r){var e={},i={};return i.type=c,i.checkIsInstanceOf=function(t){for(var n=c;void 0!==n;){if(n===t)return!0;n=n.mom}return!1},i.id=n(),a(e,i,t,r),E(e,i,t,r),i};return c.type=CLASS,c.innerInit=a=function(t,n,r,u){var a,E,A;void 0!==o&&(void 0===r?r=o(c):CHECK_IS_DATA(r)===!0?(E=o(c),void 0!==E&&EACH(E,function(t,n){void 0===r[n]&&(r[n]=t)})):(A=r,r=o())),void 0!==e&&(a=e(r,u),void 0!==a&&(c.mom=a,a.type===CLASS?a.innerInit(t,n,r,u):a.type.innerInit(t,n,r,u))),void 0!==i&&i(t,n,void 0===A?r:A,u)},r="function"==typeof t?t(c):t,void 0!==r&&(e=r.preset,i=r.init,o=r.params,u=r.afterInit),c.innerAfterInit=E=function(t,n,r,e){var i=c.mom;void 0!==i&&(i.type===CLASS?i.innerAfterInit(t,n,r,e):i.type.innerAfterInit(t,n,r,e)),void 0!==u&&u(t,n,r,e)},c}}}),global.OBJECT=OBJECT=METHOD(function(t){"use strict";var n,r,e,i,o=[],u=!1;return n=function(t){var n=t.type,r={},e={};t.id=CLASS.getInstanceId(),n.innerInit(r,t,e),n.innerAfterInit(r,t,e)},r=function(t){u===!0?n(t):o.push(t)},t.removeReadyObject=e=function(t){REMOVE({array:o,value:t})},t.initObjects=i=function(){EACH(o,function(t){n(t)}),u=!0},{run:function(t){var n=CLASS(t),e={};return e.type=n,e.checkIsInstanceOf=function(t){for(var r=n;void 0!==r;){if(r===t)return!0;r=r.mom}return!1},r(e),e}}}),global.INIT_OBJECTS=INIT_OBJECTS=METHOD({run:function(){"use strict";OBJECT.initObjects()}}),global.NEXT=NEXT=METHOD({run:function(t,n){"use strict";var r,e,i;void 0===n&&(n=t,t=void 0),void 0!==t&&(CHECK_IS_ARRAY(t)!==!0?r=t:e=t),REPEAT({start:n.length-1,end:0},function(t){var o;0!==t&&void 0===i?i=n[t]():t>0?(o=i,i=n[t](o),i.next=o):(o=i,void 0===o&&(o=function(){}),i=n[t],void 0!==r?RUN(function(){var t=-1;RUN(function(n){t+=1,r>t+1?i(t,n):i(t,o)})}):void 0!==e?RUN(function(){var t=e.length,n=-1;0===t?o():RUN(function(r){n+=1,t>n+1?(e.length===t-1&&(n-=1,t-=1),i(e[n],r,n)):i(e[n],o,n)})}):i(o))})}}),global.OVERRIDE=OVERRIDE=METHOD({run:function(t,n){"use strict";void 0!==t.type&&t.type.type===CLASS&&OBJECT.removeReadyObject(t),n(t)}}),global.PARALLEL=PARALLEL=METHOD({run:function(t,n){"use strict";var r,e,i=0;void 0===n&&(n=t,t=void 0),void 0!==t&&(CHECK_IS_ARRAY(t)!==!0?r=t:e=t),void 0!==r?REPEAT(r,function(t){n[0](t,function(){i+=1,i===r&&n[1]()})}):void 0!==e?EACH(e,function(t,r){n[0](t,function(){i+=1,i===e.length&&n[1]()},r)}):RUN(function(){var t=n.length-1;EACH(n,function(r,e){t>e&&r(function(){i+=1,i===t&&n[t]()})})})}}),global.PARSE_STR=PARSE_STR=METHOD({run:function(t){"use strict";var n;try{return n=JSON.parse(t),CHECK_IS_DATA(n)===!0?UNPACK_DATA(n):n}catch(r){return void 0}}}),global.RANDOM_STR=RANDOM_STR=METHOD({run:function(t){"use strict";var n="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return REPEAT(t,function(){n+=r.charAt(RANDOM({limit:r.length}))}),n}}),global.STRINGIFY=STRINGIFY=METHOD({run:function(t){"use strict";return JSON.stringify(CHECK_IS_DATA(t)===!0?PACK_DATA(t):t)}}),global.TEST=TEST=METHOD(function(){"use strict";var t=0;return{run:function(n,r){r(function(r){var e,i={};r===!0?console.log("["+n+" TEST] SUCCESS! "+t+" error(s) founded."):(i.__THROW_ERROR_$$$=function(){try{throw Error()}catch(t){return t}},e=i.__THROW_ERROR_$$$().stack,void 0!==e&&(e=e.substring(e.indexOf("__THROW_ERROR_$$$")),e=e.split("\n")[2],e=e.substring(e.indexOf("at "))),t+=1,console.log("["+n+" TEST] ERROR! "+e+" "+t+" error(s) founded."))})}}}),global.VALID=VALID=CLASS(function(t){"use strict";var n,r,e,i,o,u,a,E,c,A,f,l,v,C,_,d,s,T,D,S,H;return t.notEmpty=n=function(t){var n=void 0===t||t===TO_DELETE?"":String(t);return CHECK_IS_ARRAY(t)===!0||""!==n.trim()},t.regex=r=function(t){var n=t.pattern,r=String(t.value);return r===r.match(n)[0]},t.size=e=function(t){var n=t.min,r=t.max,e=String(t.value),i=e.length;return void 0===n&&(n=0),i>=n&&(void 0===r||r>=i)},t.integer=i=function(t){var r=String(t);return n(r)===!0&&r.match(/^(?:-?(?:0|[1-9][0-9]*))$/)!==TO_DELETE},t.real=o=function(t){var r=String(t);return n(r)===!0&&r.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/)!==TO_DELETE},t.bool=u=function(t){var n=String(t);return"true"===n||"false"===n},t.date=a=function(t){var n=String(t),r=Date.parse(n);return isNaN(r)===!1},t.min=E=function(t){var n=t.min,r=t.value;return o(r)===!0&&r>=n},t.max=c=function(t){var n=t.max,r=t.value;return o(r)===!0&&n>=r},t.email=A=function(t){return"string"==typeof t&&n(t)===!0&&t.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)!==TO_DELETE},t.png=f=function(t){return"string"==typeof t&&n(t)===!0&&t.match(/^data:image\/png;base64,/)!==TO_DELETE},t.url=l=function(t){return"string"==typeof t&&n(t)===!0&&t.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i)!==TO_DELETE&&t.length<=2083},t.username=v=function(t){return"string"==typeof t&&n(t)===!0&&t.match(/^[_a-zA-Z0-9\-]+$/)!==TO_DELETE},t.id=C=function(t){return"string"==typeof t&&n(t)===!0&&t.match(/[0-9a-f]{24}/)!==TO_DELETE&&24===t.length},t.one=_=function(t){var n=t.value,r=t.array;return EACH(r,function(t){return n===t?!1:void 0})===!1},t.array=d=function(t){return CHECK_IS_ARRAY(t)===!0},t.data=s=function(t){return CHECK_IS_DATA(t)===!0},t.element=T=function(t){var n=t.array,r=VALID({_:t.validData});return EACH(n,function(t){return r.check({_:t}).checkHasError()===!0?!1:void 0})===!0},t.property=D=function(t){var n=t.data,r=VALID({_:t.validData});return EACH(n,function(t){return r.check({_:t}).checkHasError()===!0?!1:void 0})===!0},t.detail=S=function(t){var n=t.data,r=VALID(t.validDataSet);return r.check(n).checkHasError()!==!0},t.equal=H=function(t){var n=t.value,r=String(n),e=t.validValue,i=String(e);return r===i},{init:function(r,e,i){var o,u,a=CLASS({init:function(r,e,o){var u,a,E=o.data,c=o.isExceptUndefined,A=!1,f={};EACH(i,function(r,e){EACH(r,function(r,i){var o=E[e];if(c===!0&&void 0===o)return!1;if("notEmpty"!==i&&n(o)!==!0)return("integer"===i||"real"===i||"bool"===i||"date"===i)&&(E[e]=TO_DELETE),!0;if("one"===i){if(_({array:r,value:o})===!1)return A=!0,f[e]={type:i,array:r,value:o},!1}else if("element"===i){if(T({validData:r,array:o})===!1)return A=!0,f[e]={type:i,validData:r,array:o},!1}else if("property"===i){if(D({validData:r,data:o})===!1)return A=!0,f[e]={type:i,validData:r,data:o},!1}else if("detail"===i){if(S({validDataSet:r,data:o})===!1)return A=!0,f[e]={type:i,validDataSet:r,data:o},!1}else if("size"===i){if(t[i](COMBINE(CHECK_IS_DATA(r)===!0?[r,{value:o}]:[{min:r,max:r},{value:o}]))===!1)return A=!0,f[e]={type:i,validParams:r,value:o},!1}else if("regex"===i){if(t[i]({pattern:r,value:o})===!1)return A=!0,f[e]={type:i,validParam:r,value:o},!1}else if("min"===i){if(t[i]({min:r,value:o})===!1)return A=!0,f[e]={type:i,validParam:r,value:o},!1}else if("max"===i){if(t[i]({max:r,value:o})===!1)return A=!0,f[e]={type:i,validParam:r,value:o},!1}else if("equal"===i){if(t[i]({value:o,validValue:r})===!1)return A=!0,f[e]={type:i,validParam:r,value:o},!1}else if(r===!0&&t[i](o)===!1)return A=!0,f[e]={type:i,value:o},!1;n(o)===!0&&"string"==typeof o&&("integer"===i?E[e]=INTEGER(o):"real"===i?E[e]=REAL(o):"bool"===i?E[e]="true"===o:"date"===i?E[e]=new Date(o):"username"===i&&(E[e]=o.toLowerCase()))})}),e.checkHasError=u=function(){return A},e.getErrors=a=function(){return f}}});e.check=o=function(t){return a({data:t})},e.checkExceptUndefined=u=function(t){return a({data:t,isExceptUndefined:!0})}}}}),global.CHECK_IS_ARGUMENTS=CHECK_IS_ARGUMENTS=METHOD({run:function(t){"use strict";return void 0!==t&&t!==TO_DELETE&&"object"==typeof t&&("[object Arguments]"===Object.prototype.toString.call(t)||void 0!==t.callee&&"function"==typeof t.callee)?!0:!1}}),global.CHECK_ARE_SAME=CHECK_ARE_SAME=METHOD({run:function(t){"use strict";var n=!1,r=function(t,n){return t instanceof Date==!0&&n instanceof Date==!0?t.getTime()===n.getTime():CHECK_IS_DATA(t)===!0&&CHECK_IS_DATA(n)===!0?EACH(t,function(t,e){return r(t,n[e])}):CHECK_IS_ARRAY(t)===!0&&CHECK_IS_ARRAY(n)===!0?EACH(t,function(t,e){return r(t,n[e])}):t===n};return t.length>1&&(n=REPEAT(t.length,function(n){return n<t.length-1?r(t[n],t[n+1]):r(t[n],t[0])})),n}}),global.CHECK_IS_ARRAY=CHECK_IS_ARRAY=METHOD({run:function(t){"use strict";return void 0!==t&&t!==TO_DELETE&&"object"==typeof t&&"[object Array]"===Object.prototype.toString.call(t)?!0:!1}}),global.CHECK_IS_DATA=CHECK_IS_DATA=METHOD({run:function(t){"use strict";return void 0!==t&&t!==TO_DELETE&&CHECK_IS_ARGUMENTS(t)!==!0&&CHECK_IS_ARRAY(t)!==!0&&t instanceof Date!=!0&&"object"==typeof t?!0:!1}}),global.CHECK_IS_EMPTY_DATA=CHECK_IS_EMPTY_DATA=METHOD({run:function(t){"use strict";return CHECK_ARE_SAME([t,{}])}}),global.PACK_DATA=PACK_DATA=METHOD({run:function(t){"use strict";var n=COPY(t),r=[];return EACH(n,function(t,e){t instanceof Date==!0?(n[e]=INTEGER(t.getTime()),r.push(e)):CHECK_IS_DATA(t)===!0?n[e]=PACK_DATA(t):CHECK_IS_ARRAY(t)===!0&&EACH(t,function(n,r){CHECK_IS_DATA(n)===!0&&(t[r]=PACK_DATA(n))})}),n.__DATE_ATTR_NAMES=r,n}}),global.UNPACK_DATA=UNPACK_DATA=METHOD({run:function(t){"use strict";var n=COPY(t);return void 0!==n.__DATE_ATTR_NAMES&&(EACH(n.__DATE_ATTR_NAMES,function(t){n[t]=new Date(n[t])}),delete n.__DATE_ATTR_NAMES),EACH(n,function(t,r){CHECK_IS_DATA(t)===!0?n[r]=UNPACK_DATA(t):CHECK_IS_ARRAY(t)===!0&&EACH(t,function(n,r){CHECK_IS_DATA(n)===!0&&(t[r]=UNPACK_DATA(n))})}),n}}),global.CHECK_IS_IN=CHECK_IS_IN=METHOD({run:function(t){"use strict";var n=t.data,r=t.array,e=t.value;return void 0!==n?EACH(n,function(t){return CHECK_ARE_SAME([t,e])===!0?!1:void 0})!==!0:void 0!==r?EACH(r,function(t){return CHECK_ARE_SAME([t,e])===!0?!1:void 0})!==!0:void 0}}),global.COMBINE=COMBINE=METHOD({run:function(t){"use strict";var n,r;return t.length>0&&(n=t[0],CHECK_IS_DATA(n)===!0?(r={},EACH(t,function(t){EXTEND({origin:r,extend:t})})):CHECK_IS_ARRAY(n)===!0&&(r=[],EACH(t,function(t){EXTEND({origin:r,extend:t})}))),r}}),global.COPY=COPY=METHOD({run:function(t){"use strict";var n;return CHECK_IS_DATA(t)===!0?(n={},EXTEND({origin:n,extend:t})):CHECK_IS_ARRAY(t)===!0&&(n=[],EXTEND({origin:n,extend:t})),n}}),global.EXTEND=EXTEND=METHOD({run:function(t){"use strict";var n=t.origin,r=t.extend;return CHECK_IS_DATA(n)===!0?EACH(r,function(t,r){n[r]=t instanceof Date==!0?new Date(t.getTime()):CHECK_IS_DATA(t)===!0||CHECK_IS_ARRAY(t)===!0?COPY(t):t}):CHECK_IS_ARRAY(n)===!0&&EACH(r,function(t){n.push(t instanceof Date==!0?new Date(t.getTime()):CHECK_IS_DATA(t)===!0||CHECK_IS_ARRAY(t)===!0?COPY(t):t)}),n}}),global.FIND=FIND=METHOD({run:function(t,n){"use strict";var r,e,i,o;return void 0!==n?CHECK_IS_DATA(t)===!0?EACH(t,function(t){return n(t)===!0?(o=t,!1):void 0}):CHECK_IS_ARRAY(t)===!0&&EACH(t,function(t){return n(t)===!0?(o=t,!1):void 0}):(r=t.data,e=t.array,i=t.value,void 0!==r&&EACH(r,function(t,n){return t===i?(o=n,!1):void 0}),void 0!==e&&EACH(e,function(t,n){return t===i?(o=n,!1):void 0})),o}}),global.REMOVE=REMOVE=METHOD({run:function(t,n){"use strict";var r,e,i,o,u;void 0!==n?CHECK_IS_DATA(t)===!0?EACH(t,function(r,e){n(r)===!0&&REMOVE({data:t,name:e})}):CHECK_IS_ARRAY(t)===!0&&EACH(t,function(r,e){n(r)===!0&&REMOVE({array:t,key:e})}):(r=t.data,e=t.array,i=t.name,o=t.key,u=t.value,void 0!==i&&delete r[i],void 0!==o&&e.splice(o,1),void 0!==u&&(void 0!==r&&EACH(r,function(t,n){t===u&&REMOVE({data:r,name:n})}),void 0!==e&&EACH(e,function(t,n){t===u&&REMOVE({array:e,key:n})})))}}),global.CALENDAR=CALENDAR=CLASS({init:function(t,n,r){"use strict";var e,i,o,u,a,E,c;void 0===r&&(r=new Date),n.getYear=e=function(){return r.getFullYear()},n.getMonth=i=function(){return r.getMonth()+1},n.getDate=o=function(){return r.getDate()},n.getDay=u=function(){return r.getDay()},n.getHour=a=function(){return r.getHours()},n.getMinute=E=function(){return r.getMinutes()},n.getSecond=c=function(){return r.getSeconds()}}}),global.DELAY=DELAY=CLASS({init:function(t,n,r,e){"use strict";var i,o;void 0===e&&(e=r,r=0),i=setTimeout(function(){e(n)},1e3*r),n.remove=o=function(){clearTimeout(i)}}}),global.INTERVAL=INTERVAL=CLASS({init:function(t,n,r,e){"use strict";var i,o;void 0===e&&(e=r,r=0),i=setInterval(function(){e(n)},0===r?1:1e3*r),n.remove=o=function(){clearInterval(i)}}}),global.LOOP=LOOP=CLASS(function(){"use strict";var t,n,r=[],e=[],i=function(){void 0===n&&(t=Date.now(),n=INTERVAL(function(){var n,i,o,u,a,E=Date.now(),c=E-t;if(c>0){for(u=0;u<r.length;u+=1)if(n=r[u],void 0!==n.fps&&n.fps>0){for(void 0===n.timeSigma&&(n.timeSigma=0,n.countSigma=0),i=parseInt(n.fps/(1e3/c)*(n.timeSigma/c+1),10)-n.countSigma,void 0!==n.start&&n.start(),o=n.interval,a=0;i>a;a+=1)o();void 0!==n.end&&n.end(c),n.countSigma+=i,n.timeSigma+=c,n.timeSigma>1e3&&(n.timeSigma=void 0)}for(u=0;u<e.length;u+=1)e[u](c);t=E}}))},o=function(){r.length<=0&&e.length<=0&&(n.remove(),n=void 0)};return{init:function(t,n,u,a){var E,c,A,f,l,v,C;void 0!==a?(CHECK_IS_DATA(a)!==!0?A=a:(c=a.start,A=a.interval,f=a.end),r.push(l={fps:u,start:c,interval:A,end:f}),n.changeFPS=v=function(t){l.fps=t},n.remove=C=function(){REMOVE({array:r,value:l}),o()}):(e.push(E=u),n.remove=C=function(){REMOVE({array:e,value:E}),o()}),i()}}}),global.RAR=RAR=METHOD({run:function(t,n){"use strict";return void 0===n&&(n=t,t=void 0),n(t),n}}),global.RUN=RUN=METHOD({run:function(t){"use strict";var n=function(){return t(n)};return n()}}),global.INTEGER=INTEGER=METHOD({run:function(t){"use strict";return void 0===t?void 0:parseInt(t,10)}}),global.RANDOM=RANDOM=METHOD({run:function(t){"use strict";var n,r,e;return CHECK_IS_DATA(t)!==!0?r=t:(n=t.min,r=t.max,e=t.limit),void 0===n&&(n=0),void 0!==e&&(r=e-1),Math.floor(Math.random()*(r-n+1)+n)}}),global.REAL=REAL=METHOD({run:function(t){"use strict";return void 0===t?void 0:parseFloat(t)}}),global.EACH=EACH=METHOD({run:function(t,n){"use strict";var r,e,i;if(void 0===t)return!1;if(CHECK_IS_DATA(t)===!0){for(e in t)if(t.hasOwnProperty(e)===!0&&n(t[e],e)===!1)return!1}else if(CHECK_IS_ARRAY(t)===!0||CHECK_IS_ARGUMENTS(t)===!0)for(r=t.length,i=0;r>i;i+=1){if(n(t[i],i)===!1)return!1;t.length===r-1&&(i-=1,r-=1)}else if(void 0===n)return n=t,t=void 0,function(t){return EACH(t,n)};return!0}}),global.REPEAT=REPEAT=METHOD({run:function(t,n){"use strict";var r,e,i,o,u,a;if(CHECK_IS_DATA(t)!==!0?r=t:(e=t.start,i=t.end,o=t.limit,u=t.step),void 0===o&&void 0!==i&&(o=i+1),void 0===u&&(u=1),void 0!==r){for(a=0;a<parseInt(r,10);a+=1)if(n(a)===!1)return!1}else if(void 0!==i&&e>i){for(a=e;a>=i;a-=u)if(n(a)===!1)return!1}else for(a=e;o>a;a+=u)if(n(a)===!1)return!1;return!0}});