var menu = document.getElementById('menu');
var tableContents = document.getElementById('table-contents');
var clickLinks = document.querySelectorAll('li[page*="page"]');
var time;
var animated = false;

function contentScorll(pageNumber) {
    var targetScrollTop = pageNumber * del_ff(document.getElementById('content-wrap')).firstChild.clientHeight;
    //document.documentElement.scrollTop = document.body.scrollTop = targetScrollTop;
    //console.log(currentScrollTop);
    console.log(getScrollTop());
    console.log(targetScrollTop);
    time = setInterval(function() {
        var osTop = targetScrollTop - getScrollTop();
        //console.log('osTop:'+osTop);
        if (osTop === 0) {
            clearInterval(time);
            animated = false;
        } else {
            var ispeed = Math.floor(osTop / 6);
            //console.log('ispeed:'+ispeed);
            if (ispeed === 0) {
                if (osTop > 0) ispeed = 1;
                else ispeed = -1;
            }
            if (document.documentElement && document.documentElement.scrollTop) {
                document.documentElement.scrollTop += ispeed;
            } else if (document.body) {
                document.body.scrollTop += ispeed;
            }
            animated = true;
        }
    }, 30);
}
addScrollEvent(document, function(event) {
    event = event || window.event;
    var delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    var curryKey = event.keyCode || event.which || event.charCode;
    if (delta) {
        clearInterval(time);
        animated = false;
    } else if (curryKey) {
        switch (curryKey) {
            case 40:
                clearInterval(time);
                animated = false;
                break;
            case 38:
                clearInterval(time);
                animated = false;
                break;
            default:
                break;
        }
    }
}, false);
addEvent(menu, "click", function(event) {
    if (tableContents.classList.contains('table-contents-show')) {
        tableContents.classList.remove('table-contents-show');
        tableContents.classList.add('table-contents-hidden');
    } else if (tableContents.classList.contains('table-contents-hidden')) {
        tableContents.classList.remove('table-contents-hidden');
        tableContents.classList.add('table-contents-show');
    }
    forbiddenEvent(event);
});
addEvent(document, "click", function(event) {
    if (tableContents.classList.contains('table-contents-show')) {
        tableContents.classList.remove('table-contents-show');
        tableContents.classList.add('table-contents-hidden');
    }
    clearInterval(time);
    forbiddenEvent(event);
});
for (var i = 0; i < clickLinks.length; i++) {
    addEvent(clickLinks[i], "click", function(event) {
        if (!animated) {
            if (tableContents.classList.contains('table-contents-show')) {
                tableContents.classList.remove('table-contents-show');
                tableContents.classList.add('table-contents-hidden');
            }
            var page;
            if (event.target.nodeName === "LI") page = event.target.getAttribute("page");
            else page = event.target.parentNode.getAttribute("page");
            var pageNumber = page.toString().replace(/[^\d]/g, '');
            contentScorll(parseInt(pageNumber) - 1);
        }
        forbiddenEvent(event);
    });
}
