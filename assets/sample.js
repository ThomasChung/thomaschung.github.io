function setCookie(name,value,days) {
        var expires = "";
        if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days*24*60*60*1000));
                    expires = "; expires=" + date.toUTCString();
                }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
        return null;
}

function eraseCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function makeId(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() *
                       charactersLength));
               }
       return result;
}

function alertCookie(name) {
      alert(getCookie(name));
}

function httpGet(pageType) {
    ccid = getCookie('ccid');
    if (ccid == null) {
        setCookie('ccid', makeId(6), 7);
        ccid = getCookie('ccid');
    }
	var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var url = 'https://us-central1-subtle-poet-202105.cloudfunctions.net/pixels?ccid=' + ccid +'&type=' + pageType + '&tz=' + tz;
    var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);
        xmlHttpReq.send(null);
        return xmlHttpReq.responseText;
}


