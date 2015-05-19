window.FileManager && (function () {
  var CdnTest = function () {
    this.name = '_lpcdn';
    this.alis = ['s', 'core.pc', 'a.pc', 'article.pc', 'ats.pc', 'c.pc', 'campus.pc', 'city.pc', 'clt.pc', 'company.pc', 'erp.pc', 'event.pc', 'h.pc', 'it.pc', 'job.pc', 'lpt.pc', 'phone.pc', 'sns.pc', 'www.pc'];
    this._urls = [];
    this.cookie = {};
    return this;
  };
  CdnTest.prototype.getUrl = function (alis) {
    return 'http://' + alis + '.lietou-static.com/cdntest.png'
  };
  CdnTest.prototype.init = function () {
    var that = this,
      alis = window.FileManager.alis || {};
    if (window.FileManager.root === 'http://' + 'i.' + 's.lietou-static.com/') {
      return false;
    }
    that.getCookie();
    for (var i = 0; i < that.alis.length; i++) {
      if (that.cookie[that.alis[i]] === '0') {
        alis[that.alis[i]] = false;
      } else {
        alis[that.alis[i]] = true;
      }
    }
    (function () {
      if (that.alis.length > 0) {
        var ali = that.alis.shift(),
          url = that.getUrl(ali);
        if (typeof that.cookie[ali] === 'undefined') {
          that.loadImage(url, function () {
            that.cookie[ali] = '1';
            alis[ali] = true;
          }, function () {
            that.cookie[ali] = '0';
            alis[ali] = false;
          });
          that._urls.push(url);
        }
        setTimeout(arguments.callee, 10);
      } else {
        that.setCookie();
      }
    })();
    setTimeout(function () {
      that.catchCdn();
    }, 5000);
  };
  CdnTest.prototype.catchCdnError = function (url) {
    try {
      var api = 'http://cat.app.liepin.com/broker-service/api/',
        report = 'http://lietou-static.com/cdn-error',
        timestamp = new Date().valueOf(),
        rd = Math.random();
      setTimeout(function () {
        (new Image).src = api + 'single?v=1&ts=' + timestamp + '&tu=' + encodeURIComponent(report) + '&d=9999&hs=-903&ec=&' + rd;
      }, 100);
      setTimeout(function () {
        (new Image).src = api + 'js?v=1&timestamp=' + timestamp + '&error=' + encodeURIComponent('[CdnError]url:' + url) + '&file=' + encodeURIComponent(url) + '&url=' + encodeURIComponent(report) + '&line=0&data=&' + rd;
      }, 200);
    } catch (e) {}
  };
  CdnTest.prototype.catchCdn = function () {
    var that = this;
    if (that._urls.length > 0 && window.performance && window.performance.getEntriesByType) {
      try {
        var api = 'http://cat.app.liepin.com/broker-service/api/',
          timestamp = new Date().valueOf(),
          resource = window.performance.getEntriesByType('resource'),
          result = [],
          _track = function (lookup) {
            var dnslookup = (lookup.domainLookupEnd - lookup.domainLookupStart).toFixed(2),
              tcpConnect = (lookup.connectEnd - lookup.connectStart).toFixed(2),
              request = (lookup.responseStart - lookup.requestStart).toFixed(2),
              response = (lookup.responseEnd - lookup.responseStart).toFixed(2);
            result.push(timestamp + '\t' + lookup.name + '\t' + dnslookup + '\t' + tcpConnect + '\t' + request + '\t' + response + '\n');
          };
        if (Object.prototype.toString.call(resource) === '[object Array]') {
          for (var i = 0; i < resource.length; i++) {
            if (resource[i].initiatorType === 'img') {
              for (var j = 0; j < that._urls.length; j++) {
                if (that._urls[j] === resource[i].name) {
                  _track(resource[i]);
                }
              }
            }
          }
          if (result.length > 0) {
            (new Image).src = api + 'cdn?v=1&c=' + encodeURIComponent(result.join('')) + '&' + Math.random();
          }
        }
      } catch (e) {}
    }
  };
  CdnTest.prototype.loadImage = function (url, success, error) {
    var that = this,
      img = new Image();
    img.src = url;
    if (img.complete) {
      success(img);
    } else {
      img.onload = function () {
        success(img);
      };
      img.onerror = function () {
        error(img);
        that.catchCdnError(url);
      };
    }
  };
  CdnTest.prototype.getCookie = function () {
    var result = {},
      cookie = this._getCookie(this.name);
    if (cookie) {
      cookie.replace(/([a-z0-9\.]+),([01])/g, function (all, $1, $2) {
        if ($1) {
          result[$1] = $2;
        }
      });
    }
    this.cookie = result;
  };
  CdnTest.prototype.setCookie = function () {
    var cookie = [];
    for (var i in this.cookie) {
      Object.prototype.hasOwnProperty.call(this.cookie, i) && cookie.push(i + ',' + this.cookie[i]);
    }
    this._setCookie(this.name, cookie.join('|'), .1, '/', 'liepin.com');
  };
  CdnTest.prototype._getCookie = function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) {
        var ret;
        try {
          ret = decodeURIComponent(c.substring(nameEQ.length, c.length));
        } catch (e) {
          ret = unescape(c.substring(nameEQ.length, c.length));
        }
        return ret;
      }
    }
    return null;
  };
  CdnTest.prototype._setCookie = function (name, value, days, path, domain, secure) {
    var expires;
    if (typeof days == 'number') {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = date.toGMTString();
    } else if (typeof days == 'string') {
      expires = days;
    } else {
      expires = false;
    }
    document.cookie = name + '=' + encodeURIComponent(value) +
      (expires ? (';expires=' + expires) : '') +
      (path ? (';path=' + path) : '') +
      (domain ? (';domain=' + domain) : '') +
      (secure ? ';secure' : '');
  };
  (new CdnTest()).init();
})();