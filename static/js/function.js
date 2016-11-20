/**
 * 绑定，删除事件
 * @param {obj对象}   elm       需要绑定事件的对象
 * @param {[type]}   evType     需要绑定的事件名称
 * @param {Function} fn         绑定事件的函数
 * @param {[type]}   useCapture true/false冒泡方式
 */
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

function removeEvent(elm, evType, fn, useCapture) {
    if (elm.removeEventListener) {
        elm.removeEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.detachEvent) {
        var r = elm.detachEvent("on" + evType, fn); //IE5+
        return r;
    }
}

function addScrollEvent(ele, fn, useCapture) {
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        ele.addEventListener("DOMMouseScroll", fn, useCapture);
    } else if (ele.addEventListener) {
        ele.addEventListener("mousewheel", fn, useCapture); //DOM2.0
        return true;
    } else if (ele.attachEvent) {
        var r = ele.attachEvent("onmousewheel", fn); //IE5+
        return r;
    }
}

function removeScrollEvent(ele, fn, useCapture) {
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        ele.removeEventListener("DOMMouseScroll", fn, useCapture);
    } else if (ele.addEventListener) {
        ele.removeEventListener("mousewheel", fn, useCapture); //DOM2.0
        return true;
    } else if (ele.attachEvent) {
        var r = ele.detachEvent("onmousewheel", fn); //IE5+
        return r;
    }
}

function forbiddenEvent(event) {
    event = event || window.event;
    if (event.stopPropagation) event.stopPropagation();
    else event.cancelBubble = true;
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;

}
/**
 * 原生JS获取form中的信息
 * @param  {[type]} frmID [description]
 * @return {[type]}       [description]
 */
function getFormQueryString(frmName) {
    var form = document.forms[frmName];
    var i, queryString = "",
        and = "";
    var item; // for each form's object
    var itemValue; // store each form object's value
    for (i = 0; i < form.length; i++) {
        item = form[i]; // get form's each object
        if (item.name != '') {
            if (item.type == 'select-one') {
                itemValue = item.options[item.selectedIndex].value;
            } else if (item.type == 'checkbox' || item.type == 'radio') {
                if (item.checked == false) {
                    continue;
                }
                itemValue = item.value;
            } else if (item.type == 'file') {
                continue; //跳过FILE
            } else if (item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image') { // ignore this type
                continue;
            } else {
                itemValue = item.value;
            }
            //itemValue = encodeURIComponent(itemValue);
            queryString += and + item.name + '=' + itemValue;
            and = "&";
        }
    }
    return queryString;
}
/**
 * 获取对象数组中有某个属性值的对象子数组
 * @param  {[array]} ele       对象总数组
 * @param  {[attribute]} attribute 属性值
 * @return {[array]}           对象数组
 */
function getUsefulList(ele, attribute) {
    var list = [];
    var j = 0;
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].getAttribute(attribute)) {
            list[j] = ele[i];
            j++;
        }
    }
    return list;
}
/**
 * 删除该父级元素中为空或者为#test的子元素
 * @param  {[element]} elem 父元素
 * @return {[element]}      父元素
 */
function del_ff(elem) {
    var elem_child = elem.childNodes;
    for (var i = 0; i < elem_child.length; i++) {
        if (elem_child[i].nodeName === "#text" && !/\s/.test(elem_child.nodeValue)) {
            elem.removeChild(elem_child[i]);
        }
    }
    return elem;
}
/**
 * 判断IE浏览器的版本号
 * @param {[type]} userAgent [description]
 */
function IETester(userAgent) {
    var UA = userAgent || navigator.userAgent;
    if (/msie/i.test(UA)) {
        return UA.match(/msie (\d+\.\d+)/i)[1];
    } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
        return UA.match(/rv:(\d+\.\d+)/)[1];
    }
    return false;
}
/**
 * 判断浏览器
 * @param  {[type]} userAgent [description]
 * @return {[string]}           [浏览器名称]
 */
function myBrowser(userAgent) {
    userAgent = userAgent || navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera";
    } //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    } //判断是否IE浏览器
}

//地址栏正则表达式获取
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}
//随机一个从min~max的整数
function randomNumber(min, max) {
    var cha = max - min;
    var randomNumber = min + (Math.floor(Math.random() * cha));
    return randomNumber;
}
/**
 * classList IE9兼容
 * @param  {[type]} !("classList" in            document.documentElement) [description]
 * @return {[type]}               [description]
 */
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;

            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);
                    fn(classes, index, value);
                    self.className = classes.join(" ");
                };
            }
            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),
                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },
                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}
//地址栏正则表达式
function getQueryString(name) {
    var href = decodeURI(window.location.search);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = href.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}
/********************
 * 取窗口滚动条高度 
 ******************/
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
function changeScrollTop(distance) {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        document.documentElement.scrollTop += distance;
    } else if (document.body) {
        document.body.scrollTop += distance;
    }
}