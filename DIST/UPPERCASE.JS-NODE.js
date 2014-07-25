global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD(function(t){"use strict";var e=require("cluster");return{run:function(o){RUN(e.isMaster?function(){var t=function(){var t=e.fork();t.on("message",function(o){EACH(e.workers,function(e){e!==t&&e.send(o)})})};REPEAT(require("os").cpus().length,function(){t()}),e.on("exit",function(e,o,n){console.log(CONSOLE_RED("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+e.id+" (PID:"+e.process.pid+") died. ("+(void 0!==n?n:o)+"). restarting...")),t()})}:function(){var n,E,i,r=e.worker.id,a=e.worker.process.pid,R={},u=function(t,e){var o=R[t];void 0!==o&&EACH(o,function(t){t(e)})};process.on("message",function(t){var e=PARSE_STR(t);void 0!==e&&u(e.methodName,e.data)}),t.on=n=function(t,e){var o=R[t];void 0===o&&(o=R[t]=[]),o.push(e)},n("__SHARED_STORE_SAVE",SHARED_STORE.save),n("__SHARED_STORE_REMOVE",SHARED_STORE.remove),n("__CPU_SHARED_STORE_SAVE",CPU_SHARED_STORE.save),n("__CPU_SHARED_STORE_REMOVE",CPU_SHARED_STORE.remove),t.off=E=function(t){delete R[t]},t.broadcast=i=function(t){process.send(STRINGIFY(t))},o({id:r,pid:a},n,E,i),console.log(CONSOLE_GREEN("[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:"+r+", PID:"+a+")"))})}}}),global.CPU_SHARED_STORE=CPU_SHARED_STORE=CLASS(function(t){"use strict";var e,o,n,E={},i={};return t.save=e=function(t,e){var o=t.fullKey,n=t.value,r=t.removeAfterSeconds,a=t.isWaitRemove;E[o]=n,a===!0&&void 0!==i[o]&&(i[o].remove(),delete i[o]),void 0!==r&&(i[o]=DELAY(r,e))},t.get=o=function(t){return E[t]},t.remove=n=function(t){delete E[t],void 0!==i[t]&&(i[t].remove(),delete i[t])},{init:function(e,o,n){var E,i,r,a;E=function(t){return n+"."+t},o.save=i=function(e){var o=e.key,n=E(o),i=e.value,r=e.removeAfterSeconds;t.save({fullKey:n,value:i,removeAfterSeconds:r},function(){a(o)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_SAVE",data:{fullKey:n,value:i,isWaitRemove:void 0!==r}})},o.get=r=function(e){return t.get(E(e))},o.remove=a=function(e){var o=E(e);t.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_REMOVE",data:o})}}}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD(function(t){"use strict";return{run:function(e,o){var n,E,i,r,a,R=require("os"),u=e.hosts,s=e.port,c=R.networkInterfaces(),S=[],d={},_={},C={},T=[];EACH(c,function(t){return EACH(t,function(t){var e=t.address;return"IPv4"===t.family&&t.internal===!1&&(S.push(e),CHECK_IS_EXISTS({data:u,value:e})===!0)?(n=e,!1):void 0})}),void 0===n?console.log(CONSOLE_YELLOW("[UPPERCASE.JS-SERVER_CLUSTERING] NOT EXISTS MY HOST. (CLUSTER SERVER HOSTS:"),u,CONSOLE_YELLOW(", THIS SERVER HOSTS:"),S):(E=function(t){_[t]!==!0&&(_[t]=!0,CONNECT_TO_SOCKET_SERVER({host:t,port:s},{error:function(){delete _[t]},success:function(e,o,E){E({methodName:"__BOOTED",data:n}),C[t]=function(t){var e=t.methodName,o=t.data;E({methodName:"SERVER_CLUSTERING."+e,data:o})},e("__DISCONNECTED",function(){delete C[t],delete _[t]}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+t+")"),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",data:t})}}))},void 0!==CPU_CLUSTERING.on&&CPU_CLUSTERING.on("__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",E),EACH(u,function(t){t!==n&&E(t)}),SOCKET_SERVER(s,function(t,e){T.push(e),e("__BOOTED",function(t){E(t)}),EACH(d,function(t,o){EACH(t,function(t){e("SERVER_CLUSTERING."+o,t)})}),e("__DISCONNECTED",function(){REMOVE({data:T,value:e})})}),t.on=i=function(t,e){var o=d[t];void 0===o&&(o=d[t]=[]),o.push(e),EACH(T,function(o){o("SERVER_CLUSTERING."+t,e)})},i("__SHARED_STORE_SAVE",function(t){SHARED_STORE.save(t),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:t})}),i("__SHARED_STORE_REMOVE",function(t){SHARED_STORE.remove(t),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:t})}),t.off=r=function(t){delete d[t]},t.broadcast=a=function(t){EACH(C,function(e){e(t)})},void 0!==o&&o(n,i,r,a),console.log(CONSOLE_BLUE("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+n+", PORT:"+s+")")))}}}),global.SHARED_STORE=SHARED_STORE=CLASS(function(t){"use strict";var e,o,n,E={},i={};return t.save=e=function(t,e){var o=t.fullKey,n=t.value,r=t.removeAfterSeconds,a=t.isWaitRemove;E[o]=n,a===!0&&void 0!==i[o]&&(i[o].remove(),delete i[o]),void 0!==r&&(i[o]=DELAY(r,e))},t.get=o=function(t){return E[t]},t.remove=n=function(t){delete E[t],void 0!==i[t]&&(i[t].remove(),delete i[t])},{init:function(e,o,n){var E,i,r,a;E=function(t){return n+"."+t},o.save=i=function(e){var o=e.key,n=E(o),i=e.value,r=e.removeAfterSeconds;t.save({fullKey:n,value:i,removeAfterSeconds:r},function(){a(o)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:n,value:i,isWaitRemove:void 0!==r}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullKey:n,value:i,isWaitRemove:void 0!==r}})},o.get=r=function(e){return t.get(E(e))},o.remove=a=function(e){var o=E(e);t.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o})}}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(t,e){"use strict";var o,n,E,i,r,a,R,u,s,c=t.host,S=t.port,d=require("net"),_={},C="";CHECK_IS_DATA(e)!==!0?o=e:(o=e.success,n=e.error),s=function(t,e){var o=_[t];void 0!==o&&EACH(o,function(o){o(e,function(e){void 0!==u&&u({methodName:"__CALLBACK_"+t,data:e})})})},E=d.connect({host:c,port:S},function(){i=!0,o(a=function(t,e){var o=_[t];void 0===o&&(o=_[t]=[]),o.push(e)},R=function(t,e){var o=_[t];void 0!==o&&(void 0!==e?REMOVE({data:o,value:e}):delete _[t])},u=function(t,e){var o=t.methodName;E.write(STRINGIFY(t)+"\n"),void 0!==e&&a("__CALLBACK_"+o,function(t){e(t),R("__CALLBACK_"+o)})},function(){r=!0,E.end()})}),E.on("data",function(t){var e,o,n;for(C+=t.toString();-1!==(o=C.indexOf("\n"));)e=C.substring(0,o),n=PARSE_STR(e),void 0!==n&&s(n.methodName,n.data),C=C.substring(o+1)}),E.on("close",function(){r!==!0&&s("__DISCONNECTED")}),E.on("error",function(t){var e=t.toString();i!==!0?(console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+e)),void 0!==n&&n(e)):s("__ERROR",e)})}}),global.CONSOLE_BLUE=CONSOLE_BLUE=METHOD({run:function(t){"use strict";return"[36m"+t+"[0m"}}),global.CONSOLE_GREEN=CONSOLE_GREEN=METHOD({run:function(t){"use strict";return"[32m"+t+"[0m"}}),global.CONSOLE_RED=CONSOLE_RED=METHOD({run:function(t){"use strict";return"[31m"+t+"[0m"}}),global.CONSOLE_YELLOW=CONSOLE_YELLOW=METHOD({run:function(t){"use strict";return"[33m"+t+"[0m"}}),global.SHA1=SHA1=METHOD({run:function(t){"use strict";var e=t.key,o=t.password,n=require("crypto");return n.createHmac("sha1",e).update(o).digest("hex")}}),global.READ_FILE=READ_FILE=METHOD(function(){"use strict";var t=require("fs");return{run:function(e,o){var n,E,i;CHECK_IS_DATA(o)!==!0?n=o:(n=o.success,E=o.notExists,i=o.error),t.exists(e,function(o){o===!0?t.stat(e,function(o,r){var a;o!==TO_DELETE?(a=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+a)),void 0!==i&&i(a)):r.isDirectory()===!0?void 0!==E&&E(e):t.readFile(e,function(t,e){var o;t!==TO_DELETE?(o=t.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+o)),void 0!==i&&i(o)):n(e)})}):void 0!==E&&E(e)})}}}),global.WRITE_FILE=WRITE_FILE=METHOD(function(){"use strict";var t=require("fs"),e=require("path");return{run:function(o,n){var E,i,r=o.path,a=o.content;CHECK_IS_DATA(n)!==!0?E=n:(E=n.success,i=n.error),NEXT([function(o){var n=function(o,E){t.exists(o,function(i){var r;i===!0?E():(r=e.dirname(o),t.exists(r,function(e){e===!0?t.mkdir(o,E):n(r,function(){n(o,E)})}))})};n(e.dirname(r),o)},function(){return function(){t.writeFile(r,a,function(t){var e;t!==TO_DELETE?(e=t.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR:"+e)),void 0!==i&&i(e)):E()})}}])}}}),global.DELETE=DELETE=METHOD({run:function(t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"DELETE"}}),e)}}),global.GET=GET=METHOD({run:function(t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"GET"}}),e)}}),global.POST=POST=METHOD({run:function(t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"POST"}}),e)}}),global.PUT=PUT=METHOD({run:function(t,e){"use strict";REQUEST(COMBINE_DATA({origin:t,extend:{method:"PUT"}}),e)}}),global.REQUEST=REQUEST=METHOD({run:function(t,e){"use strict";var o,n,E,i=require("http"),r=void 0===t.host?"localhost":t.host,a=void 0===t.port?80:t.port,R=t.method,u=t.uri,s=void 0!==t.data?"data="+encodeURIComponent(STRINGIFY(t.data)):t.paramStr;CHECK_IS_DATA(e)!==!0?o=e:(o=e.success,n=e.error),s=(void 0===s?"":s+"&")+Date.now(),R=R.toUpperCase(),"GET"===R?E=i.get({hostname:r,port:a,path:"/"+u+"?"+s},function(t){t.setEncoding("utf-8"),t.on("data",function(t){o(t)})}):(E=i.request({hostname:r,port:a,path:"/"+u,method:R},function(t){t.setEncoding("utf-8"),t.on("data",function(t){o(t)})}),E.write(s),E.end()),E.on("error",function(e){var o=e.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-NODE] REQUEST FAILED: "+o),t),void 0!==n&&n(o)})}}),global.RESOURCE_SERVER=RESOURCE_SERVER=METHOD(function(t){"use strict";var e,o=require("path"),n=require("querystring");return t.getContentTypeFromURI=e=function(t){var e=o.extname(t);return".png"===e?"image/png":".jpeg"===e||".jpg"===e?"image/jpeg":".gif"===e?"image/gif":".js"===e?"text/javascript":".json"===e?"application/json":".css"===e?"text/css":".text"===e||".txt"===e?"text/plain":".html"===e?"text/html":".swf"===e?"application/x-shockwave-flash":".mp3"===e?"audio/mpeg":"application/octet-stream"},{run:function(t,o){var E,i,r,a=(require("path"),t.port),R=t.securedPort,u=t.rootPath,s=t.version;void 0!==o&&(CHECK_IS_DATA(o)!==!0?E=o:(E=o.requestListener,i=o.error,r=o.notExistsResource)),WEB_SERVER(t,function(t,o,a){var R,c,S,d=u,_=t.uri,C=t.method,T=t.params,v=t.headers;void 0!==s&&v["if-none-match"]===s?o({statusCode:304}):void 0!==s&&""!==_&&T.version!==s?o({statusCode:302,headers:{Location:_+"?"+n.stringify(COMBINE_DATA({origin:T,extend:{version:s}}))}}):(void 0!==E&&(R=E(t,o,a,function(t){d=t}),_=t.uri,C=t.method,T=t.params,v=t.headers),R!==!1&&t.isResponsed!==!0&&"GET"===C&&(c=function(e){void 0!==r&&r(e,t,o),t.isResponsed!==!0&&o({statusCode:404})},S=function(e){console.log(CONSOLE_RED("[UPPERCASE.JS-RESOURCE_SERVER] ERROR: "+e)),void 0!==i&&i(e,t,o),t.isResponsed!==!0&&o({statusCode:500})},NEXT([function(t){READ_FILE(d+"/"+_,{notExists:function(){READ_FILE(d+(""===_?"":"/"+_)+"/index.html",{notExists:c,error:S,success:function(e){t(e,"text/html")}})},error:S,success:t})},function(){return function(t,n){void 0===n&&(n=e(_)),o({content:t,contentType:n,headers:{ETag:s}})}}])))}),console.log("[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER..."+(void 0===a?"":" (PORT:"+a+")")+(void 0===R?"":" (SECURED PORT:"+R+")"))}}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(t,e){"use strict";var o=require("net"),n=o.createServer(function(t){var o,n,E,i,r={},a="",R=function(t,e){var o=r[t];void 0!==o&&EACH(o,function(o){o(e,function(e){i({methodName:"__CALLBACK_"+t,data:e})})})};t.on("data",function(t){var e,o,n;for(a+=t.toString();-1!==(o=a.indexOf("\n"));)e=a.substring(0,o),n=PARSE_STR(e),void 0!==n&&R(n.methodName,n.data),a=a.substring(o+1)}),t.on("close",function(){o!==!0&&R("__DISCONNECTED"),r=void 0}),t.on("error",function(t){R("__ERROR",t)}),e({ip:t.remoteAddress},n=function(t,e){var o=r[t];void 0===o&&(o=r[t]=[]),o.push(e)},E=function(t,e){var o=r[t];void 0!==o&&(void 0!==e?REMOVE({data:o,value:e}):delete r[t])},i=function(e,o){var i=e.methodName;t.write(STRINGIFY(e)+"\n"),void 0!==o&&n("__CALLBACK_"+i,function(t){o(t),E("__CALLBACK_"+i)})},function(){o=!0,t.end()})});n.listen(t),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+t+")")}}),global.WEB_SERVER=WEB_SERVER=METHOD(function(t){"use strict";var e,o=require("http"),n=require("querystring");return t.getEncodingFromContentType=e=function(t){return"text/javascript"===t?"utf-8":"text/css"===t?"utf-8":"text/plain"===t?"binary":"text/html"===t?"utf-8":"image/png"===t?"binary":"image/jpeg"===t?"binary":"image/gif"===t?"binary":"application/x-shockwave-flash"===t?"binary":"audio/mpeg"===t?"binary":"binary"},{run:function(t,E){var i,r,a,R,u;CHECK_IS_DATA(t)!==!0?i=t:(i=t.port,r=t.securedPort,a=t.securedKeyFilePath,R=t.securedCertFilePath),u=function(t,o){var i,r,a=t.headers,R=t.url,u=t.method.toUpperCase(),s=a["X-Forwarded-For"],c=[];void 0===s&&(s=t.connection.remoteAddress),-1!=R.indexOf("?")&&(i=R.substring(R.indexOf("?")+1),R=R.substring(0,R.indexOf("?"))),R=R.substring(1),NEXT([function(e){"GET"===u?e():(t.on("data",function(t){void 0===i&&(i=""),i+=t}),t.on("end",function(){e()}))},function(){return function(){E(r={headers:a,uri:R,method:u,params:n.parse(i),ip:s,cookies:PARSE_COOKIE_STR(a.cookie),nativeReq:t},function(t){var n,E,i,a,R,u;r.isResponsed!==!0&&(void 0!==t&&(n=t.statusCode,E=t.headers,i=t.contentType,a=t.content,R=t.encoding,u=t.cacheTime),void 0===n&&(n=200),void 0===E&&(E={}),void 0!==i&&(E["Content-Type"]=i,void 0===R&&(R=e(i))),void 0!==u&&(E.ETag=u,E["Last-Modified"]=new Date(u).toUTCString()),o.writeHead(n,E),o.end(a,R),r.isResponsed=!0)},function(t){c.push(t)})}}]),t.on("close",function(){EACH(c,function(t){t()})})},void 0!==i&&o.createServer(u).listen(i),void 0!==r&&https.createServer({key:fs.readFileSync(a),cert:fs.readFileSync(R)},u).listen(r),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER..."+(void 0===i?"":" (PORT:"+i+")")+(void 0===r?"":" (SECURED PORT:"+r+")"))}}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(t){"use strict";var e,o={};return void 0!==t&&(e=t.split(";"),EACH(e,function(t){var e=t.split("=");o[e[0].trim()]=decodeURIComponent(e[1])})),o}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(t){"use strict";var e=[];return EACH(t,function(t,o){e.push(o+"="+encodeURIComponent(t))}),e}});