// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"auth/sign-out.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOut = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var signOut = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var response, errRes, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("/api/v1/auth/sign-out");
          case 3:
            response = _context.sent;
            if (response.ok) {
              _context.next = 10;
              break;
            }
            _context.next = 7;
            return response.json();
          case 7:
            errRes = _context.sent;
            alert(errRes.message);
            return _context.abrupt("return");
          case 10:
            _context.next = 12;
            return response.json();
          case 12:
            data = _context.sent;
            setTimeout(function () {
              // window.location.reload(true);
              alert("logout successfully");
              window.location.replace("/admin/sign-in");
            }, 500);
            _context.next = 19;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            alert(_context.t0.message);
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function signOut(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.signOut = signOut;
},{}],"user/uc-handle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.banUser = banUser;
exports.handleBanUser = handleBanUser;
exports.handleClearSearchboxUser = handleClearSearchboxUser;
exports.handleFilter = handleFilter;
exports.handleSearch = handleSearch;
exports.handleSelectType = handleSelectType;
exports.renderUC = renderUC;
var option = '';
var key_srch = '';
var type_srch = 'none';
var cur_page = 1;
function reGetUserData(e) {
  var target = e.target;
  if (target.id) {
    cur_page = target.id;
    renderUC(cur_page, option, key_srch, type_srch);
  } else {
    cur_page = target.parentElement.id;
    renderUC(cur_page, option, key_srch, type_srch);
  }
}
function renderUC() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sortQ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  var searchK = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var typeS = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
  fetch('http://localhost:3000/admin/usercenter/get-users-data?page=' + page + '&sort=' + sortQ + '&search=' + searchK + '&type=' + typeS).then(function (response) {
    return response.json();
  }).then(function (data) {
    var users = data.data.users;
    var pageList = data.data.pageList;
    var pageIndex = data.data.pageIndex;
    var total = data.data.total;
    var total_percent = data.data.total_percent;
    var total_sales = data.data.total_sales;
    var total_sales_percent = data.data.total_sales_percent;
    var source = $("#userlist-template").html();
    var template = Handlebars.compile(source);
    var html = template({
      users: users,
      pageIndex: pageIndex
    });
    $(".user-list").html(html);
    var psource = $("#userpagination-template").html();
    var ptemplate = Handlebars.compile(psource);
    var phtml = ptemplate({
      pageList: pageList,
      pageIndex: pageIndex
    });
    $(".admin-pagination-wrapper").html(phtml);
    var ucsource = $("#users-count-template").html();
    var uctemplate = Handlebars.compile(ucsource);
    var uchtml = uctemplate({
      total: total,
      total_percent: total_percent
    });
    $(".user-count-number").html(uchtml);
    var ussource = $("#users-sales-template").html();
    var ustemplate = Handlebars.compile(ussource);
    var ushtml = ustemplate({
      sales: total_sales,
      total_sales_percent: total_sales_percent
    });
    $(".user-sales-number").html(ushtml);
    var numpage_btn = document.querySelectorAll(".page-number-btn");
    if (numpage_btn) {
      numpage_btn.forEach(function (btn) {
        btn.addEventListener('click', reGetUserData);
      });
    }
    var banUserBtn = document.querySelectorAll('.ban-btn-ud');
    if (banUserBtn) {
      banUserBtn.forEach(function (btn) {
        btn.addEventListener('click', handleBanUser);
      });
    }
    var unbanUserBtn = document.querySelectorAll('.unban-btn-ud');
    if (unbanUserBtn) {
      unbanUserBtn.forEach(function (btn) {
        btn.addEventListener('click', handleBanUser);
      });
    }
  }).catch(function (err) {
    console.log(err);
  });
}
;
function handleClearSearchboxUser(e) {
  var searchbox = document.getElementById('user-search-box');
  if (searchbox.value.trim() !== '') {
    searchbox.value = '';
  }
}
function handleSelectType(e) {
  var target_key = e.target.innerText;
  $('#user-typesearch-btn').html(target_key);
  document.getElementById('user-typesearch-btn').dataset.type = target_key;
}
;
function handleSearch(e) {
  key_srch = document.getElementById('user-search-box').value.trim();
  type_srch = document.getElementById('user-typesearch-btn').dataset.type;
  if (key_srch !== '' && type_srch != 'none') {
    renderUC(1, option, key_srch, type_srch);
  }
}
function handleFilter(e) {
  option = ''; //refresh
  var cur_target = e.target;
  if (!$(cur_target).hasClass('filter-btn-active')) {
    switch (cur_target.id) {
      case 'user-name-filter':
        option += 'name';
        break;
      case 'user-email-filter':
        option += 'email';
        break;
      case 'user-registime-filter':
        option += 'registime';
        break;
      case 'user-spent-filter':
        option += 'spent';
        break;
      case 'user-desorder-filter':
        option += 'desorder';
        break;
      default:
        break;
    }
    var filterBtnList = document.querySelectorAll('.filter-btn');
    if (filterBtnList) {
      filterBtnList.forEach(function (btn) {
        if ($('#' + btn.id).hasClass('filter-btn-active')) {
          option += '-' + btn.id.split('-')[1];
        }
      });
    }
    $(cur_target).addClass('filter-btn-active');
    renderUC(1, option);
  } else {
    // Handle active button
    $(cur_target).removeClass('filter-btn-active');
    // Get option
    var _filterBtnList = document.querySelectorAll('.filter-btn');
    if (_filterBtnList) {
      _filterBtnList.forEach(function (btn) {
        if ($('#' + btn.id).hasClass('filter-btn-active')) {
          option += '-' + btn.id.split('-')[1];
        }
      });
    }
    option = option.slice(1, option.length);
    renderUC(1, option);
  }
}
function banUser() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'none';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  fetch('http://localhost:3000/admin/usercenter/ban-user?id=' + id + '&type=' + type).then(function (response) {
    return response.json();
  }).catch(function (err) {
    console.log(err);
  });
}
function handleBanUser(e) {
  var id = e.target.dataset.userid;
  var ban_type = e.target.dataset.type;
  banUser(id, ban_type);
  setTimeout(function () {
    renderUC(cur_page, option, key_srch, type_srch);
  }, 500);
}
},{}],"user/products-handle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClearSearchboxProducts = handleClearSearchboxProducts;
exports.handleFilterProducts = handleFilterProducts;
exports.handleSearchProducts = handleSearchProducts;
exports.handleSelectTypeProducts = handleSelectTypeProducts;
exports.renderPC = renderPC;
var option = '';
var key_srch = '';
var type_srch = 'none';
var cur_page = 1;
function reGetProductsData(e) {
  var target = e.target;
  if (target.id) {
    cur_page = target.id;
    renderPC(cur_page, option, key_srch, type_srch);
  } else {
    cur_page = target.parentElement.id;
    renderPC(cur_page, option, key_srch, type_srch);
  }
}
function renderPC() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sortQ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  var searchK = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var typeS = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
  fetch('http://localhost:3000/admin/products/get-products-data?page=' + page + '&sort=' + sortQ + '&search=' + searchK + '&type=' + typeS).then(function (response) {
    return response.json();
  }).then(function (data) {
    var products = data.data.products;
    var pageList = data.data.pageList;
    var pageIndex = data.data.pageIndex;
    var source = $("#products-list-template").html();
    var template = Handlebars.compile(source);
    var html = template({
      products: products,
      pageIndex: pageIndex
    });
    $(".products-list").html(html);
    var psource = $("#products-pagination-template").html();
    var ptemplate = Handlebars.compile(psource);
    var phtml = ptemplate({
      pageList: pageList,
      pageIndex: pageIndex
    });
    $(".admin-products-pagination-wrapper").html(phtml);
    var numpage_btn = document.querySelectorAll(".products-page-number-btn");
    if (numpage_btn) {
      numpage_btn.forEach(function (btn) {
        btn.addEventListener('click', reGetProductsData);
      });
    }
  }).catch(function (err) {
    console.log(err);
  });
}
;
function handleClearSearchboxProducts(e) {
  var searchbox = document.getElementById('products-search-box');
  if (searchbox.value.trim() !== '') {
    searchbox.value = '';
  }
}
function handleSelectTypeProducts(e) {
  var target_key = e.target.innerText;
  $('#products-typesearch-btn').html(target_key);
  document.getElementById('products-typesearch-btn').dataset.type = target_key;
}
;
function handleSearchProducts(e) {
  key_srch = document.getElementById('products-search-box').value.trim();
  type_srch = document.getElementById('products-typesearch-btn').dataset.type;
  if (key_srch !== '' && type_srch != 'none') {
    renderPC(1, option, key_srch, type_srch);
  }
}
function handleFilterProducts(e) {
  option = ''; //refresh
  var cur_target = e.target;
  if (!$(cur_target).hasClass('filter-btn-active')) {
    switch (cur_target.id) {
      case 'products-name-filter':
        option += 'name';
        break;
      case 'products-time-filter':
        option += 'time';
        break;
      case 'products-price-filter':
        option += 'price';
        break;
      case 'products-desorder-filter':
        option += 'desorder';
        break;
      case 'products-tp-filter':
        option += 'tp';
        break;
      default:
        break;
    }
    var filterBtnList = document.querySelectorAll('.products-filter-btn');
    if (filterBtnList) {
      filterBtnList.forEach(function (btn) {
        if ($('#' + btn.id).hasClass('filter-btn-active')) {
          option += '-' + btn.id.split('-')[1];
        }
      });
    }
    $(cur_target).addClass('filter-btn-active');
    renderPC(1, option);
  } else {
    // Handle active button
    $(cur_target).removeClass('filter-btn-active');
    // Get option
    var _filterBtnList = document.querySelectorAll('.products-filter-btn');
    if (_filterBtnList) {
      _filterBtnList.forEach(function (btn) {
        if ($('#' + btn.id).hasClass('filter-btn-active')) {
          option += '-' + btn.id.split('-')[1];
        }
      });
    }
    option = option.slice(1, option.length);
    renderPC(1, option);
  }
}
},{}],"user/orders-handle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFilterOrders = handleFilterOrders;
exports.renderOC = renderOC;
exports.updateOrderStatus = updateOrderStatus;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var option = "";
var status = "";
var key_srch = "";
var type_srch = "none";
var cur_page = 1;

// handle update order status

function reGetOrdersData(e) {
  var target = e.target;
  if (target.id) {
    cur_page = target.id;
    renderOC(cur_page, option);
  } else {
    cur_page = target.parentElement.id;
    renderOC(cur_page, option);
  }
}
function updateOrderStatus(_x) {
  return _updateOrderStatus.apply(this, arguments);
}
function _updateOrderStatus() {
  _updateOrderStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var value, orderId, response, errRes;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            value = e.target.value;
            orderId = e.target.dataset.orderId;
            _context.prev = 2;
            _context.next = 5;
            return fetch("/api/v1/orders/".concat(orderId), {
              method: "PATCH",
              body: JSON.stringify({
                status: value
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 5:
            response = _context.sent;
            if (response.ok) {
              _context.next = 12;
              break;
            }
            _context.next = 9;
            return response.json();
          case 9:
            errRes = _context.sent;
            alert(errRes.message);
            return _context.abrupt("return");
          case 12:
            _context.next = 14;
            return response.json();
          case 14:
            _context.next = 19;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            alert(_context.t0.message);
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _updateOrderStatus.apply(this, arguments);
}
function renderOC() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var sortQ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "none";
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  fetch("http://localhost:3000/admin/orders/get-orders-data?page=" + page + "&sort=" + sortQ + "&status=" + status).then(function (response) {
    return response.json();
  }).then(function (data) {
    var orders = data.data.orders;
    var pageList = data.data.pageList;
    var pageIndex = data.data.pageIndex;
    var source = $("#orders-list-template").html();
    var template = Handlebars.compile(source);
    var html = template({
      orders: orders,
      pageIndex: pageIndex
    });
    $(".orders-list").html(html);
    var psource = $("#products-pagination-template").html();
    var ptemplate = Handlebars.compile(psource);
    var phtml = ptemplate({
      pageList: pageList,
      pageIndex: pageIndex
    });
    $(".admin-products-pagination-wrapper").html(phtml);

    // add update order event
    $(".orders-status-select").change(updateOrderStatus);
    var numpage_btn = document.querySelectorAll(".products-page-number-btn");
    if (numpage_btn) {
      numpage_btn.forEach(function (btn) {
        btn.addEventListener("click", reGetOrdersData);
      });
    }
  }).catch(function (err) {
    console.log(err);
  });
}

// export function handleClearSearchboxProducts(e) {
//   const searchbox = document.getElementById("products-search-box");
//   if (searchbox.value.trim() !== "") {
//     searchbox.value = "";
//   }
// }

// export function handleSelectTypeProducts(e) {
//   const target_key = e.target.innerText;
//   $("#products-typesearch-btn").html(target_key);
//   document.getElementById("products-typesearch-btn").dataset.type = target_key;
// }

// export function handleSearchProducts(e) {
//   key_srch = document.getElementById("products-search-box").value.trim();
//   type_srch = document.getElementById("products-typesearch-btn").dataset.type;
//   if (key_srch !== "" && type_srch != "none") {
//     renderPC(1, option, key_srch, type_srch);
//   }
// }

function handleFilterOrders(e) {
  option = ""; //refresh
  var cur_target = e.target;

  // handle select element
  var isSelectElement = cur_target.classList.contains("orders-status-filter");
  if (isSelectElement) {
    if (cur_target.value === "all") {
      status = "";
    } else {
      status = cur_target.value;
    }
  }
  if (!$(cur_target).hasClass("filter-btn-active")) {
    switch (cur_target.value) {
      case "orders-name-filter":
        option += "name";
        break;
      case "orders-time-filter":
        option += "time";
        break;
      case "orders-subTotal-filter":
        option += "subTotal";
        break;
      case "orders-desorder-filter":
        option += "desorder";
        break;
      default:
        break;
    }
    var filterBtnList = document.querySelectorAll(".orders-filter-btn");
    if (filterBtnList) {
      filterBtnList.forEach(function (btn) {
        if ($("#" + btn.id).hasClass("filter-btn-active")) {
          option += "-" + btn.id.split("-")[1];
        }
      });
    }
    if (!isSelectElement) {
      $(cur_target).addClass("filter-btn-active");
    }
    renderOC(1, option, status);
  } else {
    // Handle active button
    if (!isSelectElement) {
      $(cur_target).removeClass("filter-btn-active");
    }
    // Get option
    var _filterBtnList = document.querySelectorAll(".orders-filter-btn");
    if (_filterBtnList) {
      _filterBtnList.forEach(function (btn) {
        if ($("#" + btn.id).hasClass("filter-btn-active")) {
          option += "-" + btn.id.split("-")[1];
        }
      });
    }
    option = option.slice(1, option.length);
    renderOC(1, option, status);
  }
}
},{}],"payment/cart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSetItemQuantity = exports.handleDeleteItemFromCart = exports.handleCartToOrder = exports.handleAddItemToCart = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var handleAddItemToCart = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var productId, price, quantityInput, cartQuantity, quantityInputValue, response, errRes, data, cart;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            productId = e.target.dataset.productId;
            price = +e.target.dataset.price || 0;
            quantityInput = document.getElementById("qty-itdetail");
            cartQuantity = document.querySelector(".cart-icon__quantity");
            quantityInputValue = +quantityInput.value;
            if (!(quantityInputValue === "" || isNaN(quantityInputValue) || quantityInputValue <= 0)) {
              _context.next = 8;
              break;
            }
            alert("Số lượng nhập không hợp lệ");
            return _context.abrupt("return");
          case 8:
            _context.prev = 8;
            _context.next = 11;
            return fetch("/api/v1/products/".concat(productId), {
              method: "PATCH",
              body: JSON.stringify({
                quantity: quantityInputValue,
                price: price,
                type: "add"
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 11:
            response = _context.sent;
            if (response.ok) {
              _context.next = 18;
              break;
            }
            _context.next = 15;
            return response.json();
          case 15:
            errRes = _context.sent;
            alert(errRes.message);
            return _context.abrupt("return");
          case 18:
            _context.next = 20;
            return response.json();
          case 20:
            data = _context.sent;
            if (data.status === "success") {
              cart = data.data.cart;
              cartQuantity.textContent = cart.products.length || "";
            }
            _context.next = 27;
            break;
          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](8);
            alert(_context.t0.message);
          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 24]]);
  }));
  return function handleAddItemToCart(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.handleAddItemToCart = handleAddItemToCart;
var handleSetItemQuantity = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
    var productId, price, quantityInput, cartTotals, response, errRes, data, subTotal, formattedSubTotal;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productId = e.target.dataset.productId;
            price = +e.target.dataset.price || 0;
            quantityInput = e.target;
            cartTotals = _toConsumableArray(document.querySelectorAll(".cart-total"));
            _context2.prev = 4;
            _context2.next = 7;
            return fetch("/api/v1/products/".concat(productId), {
              method: "PATCH",
              body: JSON.stringify({
                quantity: +(quantityInput === null || quantityInput === void 0 ? void 0 : quantityInput.value) || 0,
                price: price,
                type: "set"
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 7:
            response = _context2.sent;
            if (response.ok) {
              _context2.next = 14;
              break;
            }
            _context2.next = 11;
            return response.json();
          case 11:
            errRes = _context2.sent;
            alert(errRes.message);
            return _context2.abrupt("return");
          case 14:
            _context2.next = 16;
            return response.json();
          case 16:
            data = _context2.sent;
            // display new subtotal price when changing product quantity
            subTotal = data.data.cart.subTotal;
            formattedSubTotal = subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            cartTotals[0].textContent = "".concat(formattedSubTotal, " VN\u0110");
            cartTotals[1].textContent = "".concat(formattedSubTotal, " VN\u0110");
            _context2.next = 26;
            break;
          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](4);
            alert(_context2.t0.message);
          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 23]]);
  }));
  return function handleSetItemQuantity(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.handleSetItemQuantity = handleSetItemQuantity;
var handleCartToOrder = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
    var checkBoxes, productIds, response, errRes, data, orderUrl;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            checkBoxes = _toConsumableArray(document.querySelectorAll(".form-check-input")); // remove select all checkbox
            checkBoxes.shift();
            productIds = [];
            checkBoxes.forEach(function (check) {
              if (check.checked) {
                productIds.push(check.dataset.productId);
              }
            });
            _context3.prev = 4;
            _context3.next = 7;
            return fetch("/api/v1/products", {
              method: "PATCH",
              body: JSON.stringify({
                productIds: productIds
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 7:
            response = _context3.sent;
            if (response.ok) {
              _context3.next = 14;
              break;
            }
            _context3.next = 11;
            return response.json();
          case 11:
            errRes = _context3.sent;
            alert(errRes.message);
            return _context3.abrupt("return");
          case 14:
            _context3.next = 16;
            return response.json();
          case 16:
            data = _context3.sent;
            if (data.status === "success") {
              orderUrl = location.href.replace("cart", "order");
              location.assign(orderUrl);
            }
            _context3.next = 24;
            break;
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](4);
            alert(_context3.t0.message);
            console.log(_context3.t0);
          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 20]]);
  }));
  return function handleCartToOrder(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.handleCartToOrder = handleCartToOrder;
var handleDeleteItemFromCart = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
    var productId, itemDeleted, cartTotals, lengthItems, cartQuantity, response, errRes, data, cart, subTotal, formattedSubTotal;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productId = e.target.dataset.productId;
            itemDeleted = document.getElementById(productId);
            cartTotals = _toConsumableArray(document.querySelectorAll(".cart-total"));
            lengthItems = _toConsumableArray(document.querySelectorAll(".items-length"));
            cartQuantity = document.querySelector(".cart-icon__quantity");
            if (productId) {
              _context4.next = 8;
              break;
            }
            alert("cannot find productId, fail to delete item from cart");
            return _context4.abrupt("return");
          case 8:
            _context4.prev = 8;
            _context4.next = 11;
            return fetch("/api/v1/products/".concat(productId), {
              method: "DELETE"
            });
          case 11:
            response = _context4.sent;
            if (response.ok) {
              _context4.next = 18;
              break;
            }
            _context4.next = 15;
            return response.json();
          case 15:
            errRes = _context4.sent;
            alert(errRes.message);
            return _context4.abrupt("return");
          case 18:
            _context4.next = 20;
            return response.json();
          case 20:
            data = _context4.sent;
            // update subtotal and number of products in cart
            if (data.status === "success") {
              itemDeleted.parentElement.removeChild(itemDeleted);

              // prepare updating user interface data
              cart = data.data.cart;
              subTotal = (cart === null || cart === void 0 ? void 0 : cart.subTotal) || 0;
              formattedSubTotal = subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // update user interface
              cartQuantity.textContent = cart.products.length || 0;
              cartTotals[0].textContent = "".concat(formattedSubTotal, " VN\u0110");
              cartTotals[1].textContent = "".concat(formattedSubTotal, " VN\u0110");
              lengthItems[0].textContent = "(".concat(cart === null || cart === void 0 ? void 0 : cart.products.length, ")") || "0";
              lengthItems[1].textContent = "(".concat(cart === null || cart === void 0 ? void 0 : cart.products.length, ")") || "0";
            }
            _context4.next = 28;
            break;
          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](8);
            alert(_context4.t0.message);
            console.log(_context4.t0);
          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[8, 24]]);
  }));
  return function handleDeleteItemFromCart(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
exports.handleDeleteItemFromCart = handleDeleteItemFromCart;
},{}],"product/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrl = createUrl;
exports.loadFilterFromSearchParams = exports.handleSearchAndFilter = exports.handlePagination = void 0;
exports.loadProductPage = loadProductPage;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// Handlebars.registerHelper("toPrice", (rawPrice) =>
//   rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
// );
// loadProductPage("?page=1");
function createUrl(field, value) {
  var allowFields = ["_sort", "column", "type", "priceRange", "manufacturer", "category", "page", "_search"];
  var params = new URLSearchParams(location.search);
  if (allowFields.includes(field)) {
    params.set(field, value);
  }
  var isFirstQuery = true;
  var url = allowFields.reduce(function (accum, field, index) {
    if (params.has(field)) {
      if (!isFirstQuery) {
        accum += "&";
      }
      if (isFirstQuery) {
        isFirstQuery = false;
      }
      return accum += "".concat(field, "=").concat(params.get(field));
    }
    return accum;
  }, "?");
  return url;
}
function loadProductPage(query) {
  fetch("/api/v1/products".concat(query)).then(function (response) {
    return response.json();
  }).then(function (data) {
    var pagination_info = data.data.pagination_info;
    var foods = data.data.foods;
    if (foods.length === 0) {
      $("#food-list").html("<div class=\"py-5 my-5 d-flex flex-column justify-content-center align-items-center\">\n        <h4 class=\"text-danger\">Kh\xF4ng t\xECm th\u1EA5y m\xF3n \u0103n</h4>\n        <div class=\"\" style=\"width: 200px; height: 160px;\">\n            <img class=\"w-100\" src=\"/images/cart/empty.png\" alt=\"empty cart image\">\n        </div>\n    </div>");
      $("#pagination-list").html("");
      return;
    }
    var source = $("#products-template").html();
    var template = Handlebars.compile(source);
    var html = template({
      foods: foods
    });
    $("#food-list").html(html);

    // handle pagination
    var links = Array.from(Array(pagination_info.last_page - pagination_info.first_page + 1)).map(function (_, idx) {
      return {
        pageNumber: idx + pagination_info.first_page,
        selected: idx + pagination_info.first_page === pagination_info.current_page
      };
    });
    $("#pagination-list").html(Handlebars.compile($("#pagination-template").html())({
      links: links,
      prev: pagination_info.previous_page,
      next: pagination_info.has_next_page ? pagination_info.next_page : pagination_info.current_page,
      start: 1,
      end: pagination_info.total_pages
    }));
    $(".pagination-item .page-item").click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      var newQuery = createUrl("page", this.getAttribute("value"));
      loadProductPage(newQuery);
    });
  }).catch(function (err) {
    console.log(err);
  });
}
var handleSearchAndFilter = function handleSearchAndFilter(e) {
  // I) variable identification
  // 0.search
  var boxSearch = document.getElementById("search-box");

  // 1.price search
  var fromInput = document.querySelector('input[name="price-from"]').value;
  var toInput = document.querySelector('input[name="price-to"]').value;
  // 2. sort order (thứ tự sắp xếp)
  var sortOptions = $('input[name="flexRadioDefault"]:checked');
  var oldSearchParams = new URLSearchParams(location.search);

  // 3.manufacturer
  var checkedManufacturerInputs = _toConsumableArray(document.querySelectorAll("input[name='manufacturer']:checked"));

  // 4.category
  var categoryInput = document.querySelector("select[name='category']");

  // II) assign query string
  // 0) search
  var searchQuery = boxSearch.value !== "" ? "?_search=".concat(boxSearch.value) : "?";
  // 1) price search
  if (fromInput.trim().length === 0 && toInput.trim().length === 0) {
    searchQuery += "&priceRange=0,1000000000";
  } else if (fromInput.trim().length === 0 || toInput.trim().length === 0 || +fromInput > +toInput) {
    alert("Khoảng giá không hợp lệ vui lòng nhập lại");
    return;
  } else {
    searchQuery += "&priceRange=".concat(fromInput, ",").concat(toInput);
  }

  // 2) sort order

  switch (sortOptions.val()) {
    case "low-to-high":
      searchQuery += "&_sort&column=price&type=asc";
      break;
    case "high-to-low":
      searchQuery += "&_sort&column=price&type=desc";
      break;
    case "created-at":
      searchQuery += "&_sort&column=_createdAt&type=asc";
      break;
    case "default":
      searchQuery += "";
      break;
    default:
      searchQuery += "";
      break;
  }

  // 3) manufacturer
  // ["Sunrise_Foods", "Friggitoria", ...]
  if (checkedManufacturerInputs.length !== 0) {
    var manufacturers = checkedManufacturerInputs.map(function (checkedManu) {
      return checkedManu.dataset.search;
    });
    searchQuery += "&manufacturer=".concat(manufacturers.join(","));
  }

  // 4) category
  searchQuery += "&category=".concat(categoryInput.value);
  // location.assign(searchQuery);
  window.history.pushState("/", "Final project", "/products".concat(searchQuery)); // không bị reload
  loadProductPage(searchQuery);
};
exports.handleSearchAndFilter = handleSearchAndFilter;
var handlePagination = function handlePagination(e) {
  var allowFields = ["_sort", "column", "type", "priceRange", "manufacturer", "category", "page", "_search"];
  var query = e.target.dataset.query;
  if (!query) {
    alert("khong tim thay query");
    return;
  }
  var pageValue = query.split("=")[1];
  var params = new URLSearchParams(location.search);
  params.set("page", pageValue);
  var isFirstQuery = true;
  var url = allowFields.reduce(function (accum, field, index) {
    if (params.has(field)) {
      if (!isFirstQuery) {
        accum += "&";
      }
      if (isFirstQuery) {
        isFirstQuery = false;
      }
      return accum += "".concat(field, "=").concat(params.get(field));
    }
    return accum;
  }, "?");

  // console.log(url);
  // location.assign(url);
  window.history.pushState("/", "Final project", "/products".concat(url)); // không bị reload
  loadProductPage(url);
};

// dùng khi không xài ajax
// dùng để load _search(khi từ / -> /products)
exports.handlePagination = handlePagination;
var loadFilterFromSearchParams = function loadFilterFromSearchParams() {
  var params = new URLSearchParams(location.search);

  // 0) search
  if (params.has("_search")) {
    var boxSearch = document.getElementById("search-box");
    boxSearch.value = params.get("_search");
  }

  // 1) price range
  if (params.has("priceRange")) {
    var fromInput = document.querySelector('input[name="price-from"]');
    var toInput = document.querySelector('input[name="price-to"]');
    var priceString = params.get("priceRange");
    var _priceString$split = priceString.split(","),
      _priceString$split2 = _slicedToArray(_priceString$split, 2),
      fromPrice = _priceString$split2[0],
      toPrice = _priceString$split2[1];
    if (+fromPrice !== 0 && +toPrice !== 1000000000) {
      fromInput.value = fromPrice;
      toInput.value = toPrice;
    }
  }

  // 2) sort order
  if (params.has("column") && params.has("type")) {
    var column = params.get("column");
    var type = params.get("type");
    var sortValue = "";
    if (column === "price") {
      sortValue = type === "asc" ? "low-to-high" : "high-to-low";
    } else {
      sortValue = "created-at";
    }
    var sortOptions = document.querySelector("input[value=".concat(sortValue, "]"));
    sortOptions.checked = true;
  }

  // 3) manufacturer
  if (params.has("manufacturer")) {
    var manufacturers = params.get("manufacturer").split(",");
    manufacturers.forEach(function (manu) {
      document.querySelector("input[value=".concat(manu, "]")).checked = true;
    });
  }

  // 4) category
  if (params.has("category")) {
    var categoryInput = document.querySelector("select[name='category']");
    categoryInput.value = params.get("category");
  }

  // 5) pagination
  if (params.has("page")) {
    var page = document.querySelector(".page-item[value=\"".concat(params.get("page"), "\"]"));
    page.classList.add("selected");
  }
};
exports.loadFilterFromSearchParams = loadFilterFromSearchParams;
},{}],"payment/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickOrderButton = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var clickOrderButton = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var payments, phoneInput, addressInput, noteInput, checkedPayment, response, errRes, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payments = _toConsumableArray(document.querySelectorAll(".form-check-input"));
            phoneInput = document.querySelector("input[name='phone']");
            addressInput = document.querySelector("input[name='address']");
            noteInput = document.querySelector("input[name='note']");
            if (!(!phoneInput || phoneInput.value.trim().length === 0 || !addressInput || addressInput.value.trim().length === 0 || !noteInput || noteInput.value.trim().length === 0)) {
              _context.next = 7;
              break;
            }
            alert("vui lòng điền đầy đủ thông tin");
            return _context.abrupt("return");
          case 7:
            checkedPayment = payments.find(function (payment) {
              return payment.checked;
            });
            if (checkedPayment) {
              _context.next = 11;
              break;
            }
            alert("vui lòng chọn phương thức thanh toán");
            return _context.abrupt("return");
          case 11:
            _context.prev = 11;
            _context.next = 14;
            return fetch("/api/v1/payment/checkout-session", {
              method: "POST",
              body: JSON.stringify({
                phone: phoneInput.value,
                address: addressInput.value,
                note: noteInput.value || "None",
                payment: checkedPayment.dataset.value || "card"
              }),
              headers: {
                "Content-Type": "application/json"
              }
            });
          case 14:
            response = _context.sent;
            if (response.ok) {
              _context.next = 21;
              break;
            }
            _context.next = 18;
            return response.json();
          case 18:
            errRes = _context.sent;
            alert(errRes.message);
            return _context.abrupt("return");
          case 21:
            _context.next = 23;
            return response.json();
          case 23:
            data = _context.sent;
            if (data.status === "success") {
              location.assign(data.data.session.url);
            }
            _context.next = 30;
            break;
          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](11);
            alert(_context.t0.message);
          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 27]]);
  }));
  return function clickOrderButton(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.clickOrderButton = clickOrderButton;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _signOut = require("./auth/sign-out.js");
var _ucHandle = require("./user/uc-handle.js");
var _productsHandle = require("./user/products-handle.js");
var _ordersHandle = require("./user/orders-handle.js");
var _cart = require("./payment/cart.js");
var _filter = require("./product/filter.js");
var _order = require("./payment/order.js");
var _this = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
Handlebars.registerHelper("toPrice", function (rawPrice) {
  return rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});
Handlebars.registerHelper("if_cond", function (v1, op, v2, options) {
  switch (op) {
    case "==":
      return v1 == v2 ? options.fn(_this) : options.inverse(_this);
    case "===":
      return v1 === v2 ? options.fn(_this) : options.inverse(_this);
    case "!=":
      return v1 != v2 ? options.fn(_this) : options.inverse(_this);
    case "!==":
      return v1 !== v2 ? options.fn(_this) : options.inverse(_this);
    case "<":
      return v1 < v2 ? options.fn(_this) : options.inverse(_this);
    case "<=":
      return v1 <= v2 ? options.fn(_this) : options.inverse(_this);
    case ">":
      return v1 > v2 ? options.fn(_this) : options.inverse(_this);
    case ">=":
      return v1 >= v2 ? options.fn(_this) : options.inverse(_this);
    case "&&":
      return v1 && v2 ? options.fn(_this) : options.inverse(_this);
    case "||":
      return v1 || v2 ? options.fn(_this) : options.inverse(_this);
    default:
      return options.inverse(_this);
  }
});
Handlebars.registerHelper("toStandardDate", function (raw_date) {
  return new Date(raw_date).toLocaleDateString();
});
Handlebars.registerHelper("getNameFromEmail", function (email) {
  return email.slice(0, email.indexOf("@"));
});
Handlebars.registerHelper("countTotal", function (arr) {
  var result = 0;
  for (var i in arr) {
    ++result;
  }
  return result;
});
Handlebars.registerHelper("countTotal", function (arr) {
  var result = 0;
  for (var i in arr) {
    ++result;
  }
  return result;
});

// Admin handling
var clearSearchboxUser = document.getElementById("user-clearsearch-btn");
if (clearSearchboxUser) {
  clearSearchboxUser.addEventListener("click", _ucHandle.handleClearSearchboxUser);
}
var userSearchBtn = document.getElementById("usercenter-search-button");
if (userSearchBtn) {
  userSearchBtn.addEventListener("click", _ucHandle.handleSearch);
}
var userFilterBtn = document.querySelectorAll(".filter-btn");
if (userFilterBtn) {
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", _ucHandle.handleFilter);
  });
}
var first_ren_UC = document.querySelector(".user-list");
if (first_ren_UC) {
  (0, _ucHandle.renderUC)();
}
var userTypeBtn = document.querySelectorAll(".type-btn");
if (userTypeBtn) {
  userTypeBtn.forEach(function (btn) {
    btn.addEventListener("click", _ucHandle.handleSelectType);
  });
}
// Product handling
var clearSearchboxProducts = document.getElementById("products-clearsearch-btn");
if (clearSearchboxProducts) {
  clearSearchboxProducts.addEventListener("click", _productsHandle.handleClearSearchboxProducts);
}
var productsSearchBtn = document.getElementById("products-search-button");
if (productsSearchBtn) {
  productsSearchBtn.addEventListener("click", _productsHandle.handleSearchProducts);
}
var productsFilterBtn = document.querySelectorAll(".products-filter-btn");
if (productsFilterBtn) {
  document.querySelectorAll(".products-filter-btn").forEach(function (btn) {
    btn.addEventListener("click", _productsHandle.handleFilterProducts);
  });
}
var first_ren_PC = document.querySelector(".products-list");
if (first_ren_PC) {
  (0, _productsHandle.renderPC)();
}
var productsTypeBtn = document.querySelectorAll(".products-type-btn");
if (productsTypeBtn) {
  productsTypeBtn.forEach(function (btn) {
    btn.addEventListener("click", _productsHandle.handleSelectTypeProducts);
  });
}

// remove: handleClearSearchboxProducts, handleSearchProducts
// Order handling
var productsFilterOrderBtn = document.querySelectorAll(".orders-filter-btn");
if (productsFilterOrderBtn.length > 0) {
  productsFilterOrderBtn.forEach(function (btn) {
    btn.addEventListener("click", _ordersHandle.handleFilterOrders);
  });
  var productsFilterOrderSelect = document.querySelector(".orders-status-filter");
  productsFilterOrderSelect.addEventListener("change", _ordersHandle.handleFilterOrders);
}
var first_ren_OC = document.querySelector(".orders-list");
if (first_ren_OC) {
  (0, _ordersHandle.renderOC)();
}

// auth handling
var signOutBtnAdmin = document.getElementById("signout-admin");
var signOutBtnUser = document.getElementById("signout-user");

// filter, sort, pagination handling
var filterSortBtn = document.querySelector(".btn-filter");
var paginationItems = document.querySelectorAll(".page-item");

// search
var buttonSearch = $(".btn.btn-primary");
var inputBoxSearch = $("#search-box");

// cart handling
var addItemBtn = document.querySelector(".btn-addtocart");
var checkoutBtn = document.getElementById("checkout-btn-rtab");
var orderBtn = document.getElementById("buy-btn");
var quantityCartBtn = _toConsumableArray(document.querySelectorAll("input[name='quantity']"));
var deleteItemBtn = _toConsumableArray(document.querySelectorAll("button[name='delete-item-btn']"));
if (signOutBtnAdmin) {
  signOutBtnAdmin.addEventListener("click", _signOut.signOut);
}
if (signOutBtnUser) {
  // alert("logout successfully");
  signOutBtnUser.addEventListener("click", _signOut.signOut);
}

// add item to cart

if (addItemBtn) {
  addItemBtn.addEventListener("click", _cart.handleAddItemToCart);
}
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", _cart.handleCartToOrder);
}

// order
if (orderBtn) {
  orderBtn.addEventListener("click", _order.clickOrderButton);
}
if (quantityCartBtn.length > 0) {
  quantityCartBtn.forEach(function (btn) {
    btn.addEventListener("change", _cart.handleSetItemQuantity);
  });
}
if (deleteItemBtn.length > 0) {
  deleteItemBtn.forEach(function (btn) {
    btn.addEventListener("click", _cart.handleDeleteItemFromCart);
  });
}

// filter, sort, pagination
if (filterSortBtn) {
  // check manufacturer
  var checkedManufacturerWrappers = _toConsumableArray(document.querySelectorAll("a[name='manufacturer']"));
  checkedManufacturerWrappers.forEach(function (wrapper) {
    wrapper.addEventListener("click", function (e) {
      var childInput = wrapper.querySelector("input");
      childInput.checked = !childInput.checked;
    });
  });
  (0, _filter.loadFilterFromSearchParams)();
  filterSortBtn.addEventListener("click", _filter.handleSearchAndFilter);
}
if (paginationItems.length > 0) {
  paginationItems.forEach(function (item) {
    item.addEventListener("click", _filter.handlePagination);
  });
}
if (location.pathname === "/products") {
  var url = (0, _filter.createUrl)("page", 1);
  (0, _filter.loadProductPage)(url);
}
if (inputBoxSearch) {
  inputBoxSearch.on("keypress", function (e) {
    if (e.which == 13) {
      if (inputBoxSearch.val()) {
        var _url = (0, _filter.createUrl)("_search", inputBoxSearch.val());
        if (location.pathname !== "/products") {
          location.href = "/products?_search=".concat(inputBoxSearch.val());
        } else {
          (0, _filter.loadProductPage)(_url);
        }
      }
    }
  });
}
if (buttonSearch) {
  buttonSearch.click(function () {
    if (inputBoxSearch.val()) {
      var _url2 = (0, _filter.createUrl)("_search", inputBoxSearch.val());
      if (location.pathname !== "/products") {
        location.href = "/products?_search=".concat(inputBoxSearch.val());
      } else {
        (0, _filter.loadProductPage)(_url2);
      }
    }
  });
}

// review
var reviewForm = document.querySelector("#review-form");
if (reviewForm) {
  var handleCreateReview = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var review, rating, product, fetchOptions, response, errRes, resData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              review = this.elements[name = "review"].value;
              rating = this.elements[name = "rating"].value;
              product = reviewForm.dataset.productId;
              if (!(!review || !rating || review.trim().length === 0 || rating.trim().length === 0)) {
                _context.next = 7;
                break;
              }
              alert("vui lòng nhập đầy đủ thông tin");
              return _context.abrupt("return");
            case 7:
              if (!(isNaN(+rating) || +rating > 5 || +rating < 1)) {
                _context.next = 10;
                break;
              }
              alert("Đánh giá phải là số từ 1 - 5");
              return _context.abrupt("return");
            case 10:
              _context.prev = 10;
              fetchOptions = {
                method: "POST",
                body: JSON.stringify({
                  product: product,
                  review: review,
                  rating: +rating
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              };
              _context.next = 14;
              return fetch("/api/v1/reviews", fetchOptions);
            case 14:
              response = _context.sent;
              if (response.ok) {
                _context.next = 21;
                break;
              }
              _context.next = 18;
              return response.json();
            case 18:
              errRes = _context.sent;
              alert(errRes.message);
              return _context.abrupt("return", false);
            case 21:
              _context.next = 23;
              return response.json();
            case 23:
              resData = _context.sent;
              alert("Th\xEAm \u0111\xE1nh gi\xE1 th\xE0nh c\xF4ng");
              return _context.abrupt("return", true);
            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](10);
              alert("error", _context.t0.message);
              return _context.abrupt("return", false);
            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[10, 28]]);
    }));
    return function handleCreateReview(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  reviewForm.addEventListener("submit", handleCreateReview);
}
},{"./auth/sign-out.js":"auth/sign-out.js","./user/uc-handle.js":"user/uc-handle.js","./user/products-handle.js":"user/products-handle.js","./user/orders-handle.js":"user/orders-handle.js","./payment/cart.js":"payment/cart.js","./product/filter.js":"product/filter.js","./payment/order.js":"payment/order.js"}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65271" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bundle.js.map