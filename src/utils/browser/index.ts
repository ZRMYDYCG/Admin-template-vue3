/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09
 * @Description: 针对浏览器上各种操作的工具函数
 */

/**
 * 返回当前url
 */
export const currentURL = (): string => window.location.href;

/**
 * 获取url参数（第一种）
 * @param name
 * @param origin
 */
export function getUrlParam(name: string, origin: string | null = null): string | null {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r: RegExpMatchArray | null = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * 获取url参数（第二种）
 * @param name
 * @param origin
 */
export function getUrlParams(name: string, origin: string | null = null): string | undefined {
    let url = location.href;
    let temp1 = url.split('?');
    let pram = temp1[1];
    let keyValue = pram.split('&');
    let obj: { [key: string]: string } = {};
    for (let i = 0; i < keyValue.length; i++) {
        let item = keyValue[i].split('=');
        let key = item[0];
        let value = item[1];
        obj[key] = value;
    }
    return obj[name];
}

/**
 * 修改url中的参数
 * @param paramName
 * @param replaceWith
 */
export function replaceParamVal(paramName: string, replaceWith: string): string {
    var oUrl = location.href.toString();
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    location.href = oUrl.replace(re, paramName + '=' + replaceWith);
    return location.href;
}

/**
 * 删除url中指定的参数
 * @param name
 */
export function funcUrlDel(name: string): string | undefined {
    var loca = location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name) > -1) {
        var obj: { [key: string]: string } = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
        return url;
    }
}

/**
 * 获取全部url参数,并转换成json对象
 * @param url
 */
export function getUrlAllParams(url: string | null = null): { [key: string]: string } {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs: { [key: string]: string } = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

/**
 * 获取窗口可视范围的高度
 */
export function getClientHeight(): number {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

/**
 * 获取窗口可视范围宽度
 */
export function getPageViewWidth(): number {
    let d = document,
        a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
    return a.clientWidth;
}

/**
 * 获取窗口宽度
 */
export function getPageWidth(): number {
    let g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == "BackCompat" ? a : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

/**
 * 获取窗口尺寸
 */
export function getViewportOffset(): { w: number, h: number } {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        // ie8及其以下
        if (document.compatMode === "BackCompat") {
            // 怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            // 标准模式
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}

/**
 * 获取滚动条距顶部高度
 */
export function getPageScrollTop(): number {
    let a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}

/**
 * 获取滚动条距左边的高度
 */
export function getPageScrollLeft(): number {
    let a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft;
}

/**
 * 开启全屏
 * @param element
 */
export function launchFullscreen(element: HTMLElement): void {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }
}

/**
 * 关闭全屏
 */
export function exitFullscreen(): void {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * 返回当前滚动条位置
 */
export const getScrollPosition = (el: Window | HTMLElement = window): { x: number, y: number } => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

/**
 * 滚动到指定元素区域
 */
export const smoothScroll = (element: string): void => {
    document.querySelector(element)?.scrollIntoView({
        behavior: 'smooth'
    });
};

/**
 * 平滑滚动到页面顶部
 */
export const scrollToTop = (): void => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

/**
 * http跳转https
 */
export const httpsRedirect = (): void => {
    if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};

/**
 * 检查页面底部是否可见
 */
export const bottomVisible = (): boolean => {
    return document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.documentElement.clientHeight);
};

/**
 * 打开一个窗口
 * @param url
 * @param windowName
 * @param width
 * @param height
 */
export function openWindow(url: string, windowName: string, width: number, height: number): void {
    var x = parseInt(screen.width / 2.0) - width / 2.0;
    var y = parseInt(screen.height / 2.0) - height / 2.0;
    var isMSIE = navigator.appName == "Microsoft Internet Explorer";
    if (isMSIE) {
        var p = "resizable=1,location=no,scrollbars=no,width=";
        p = p + width;
        p = p + ",height=";
        p = p + height;
        p = p + ",left=";
        p = p + x;
        p = p + ",top=";
        p = p + y;
        window.open(url, windowName, p);
    } else {
        var win = window.open(
            url,
            "ZyiisPopup",
            "top=" +
            y +
            ",left=" +
            x +
            ",scrollbars=" +
            scrollbars +
            ",dialog=yes,modal=yes,width=" +
            width +
            ",height=" +
            height +
            ",resizable=no"
        );
        eval("try { win.resizeTo(width, height); } catch(e) { }");
        win.focus();
    }
}

/**
 * 自适应页面（rem）
 * @param width
 */
export function AutoResponse(width: number = 750): void {
    const target = document.documentElement;
    target.clientWidth >= 750
        ? (target.style.fontSize = "100px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}

/**
 * 获取当前浏览器名称
 */
export const getExplorerName = (): string | undefined => {
    const userAgent = window.navigator.userAgent;
    const isExplorer = (exp: string): boolean => {
        return userAgent.indexOf(exp) > -1;
    };
    if (isExplorer('MSIE')) return 'IE';
    else if (isExplorer('Firefox')) return 'Firefox';
    else if (isExplorer('Chrome')) return 'Chrome';
    else if (isExplorer('Opera')) return 'Opera';
    else if (isExplorer('Safari')) return 'Safari';
}

/**
 * 禁止鼠标右键、选择、复制
 */
export const contextmenuBan = (): void => {
    ['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
        document.addEventListener(ev, function (event) {
            return event.returnValue = false;
        });
    });
}
