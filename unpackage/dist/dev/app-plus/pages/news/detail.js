"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // ../../../../Users/34554/OneDrive/文档/HBuilderProjects/news/unpackage/dist/dev/.nvue/uni-app.es.js
  var import_vue = __toESM(require_vue());
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }

  // ../../../../Users/34554/OneDrive/文档/HBuilderProjects/news/unpackage/dist/dev/.nvue/pages/news/detail.js
  var import_vue2 = __toESM(require_vue());
  var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
  var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
  var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
  var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
  var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
  var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
  var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
  var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
  var special = makeMap("script,style");
  function HTMLParser(html, handler) {
    var index;
    var chars;
    var match;
    var stack = [];
    var last = html;
    stack.last = function() {
      return this[this.length - 1];
    };
    while (html) {
      chars = true;
      if (!stack.last() || !special[stack.last()]) {
        if (html.indexOf("<!--") == 0) {
          index = html.indexOf("-->");
          if (index >= 0) {
            if (handler.comment) {
              handler.comment(html.substring(4, index));
            }
            html = html.substring(index + 3);
            chars = false;
          }
        } else if (html.indexOf("</") == 0) {
          match = html.match(endTag);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(endTag, parseEndTag);
            chars = false;
          }
        } else if (html.indexOf("<") == 0) {
          match = html.match(startTag);
          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(startTag, parseStartTag);
            chars = false;
          }
        }
        if (chars) {
          index = html.indexOf("<");
          var text = index < 0 ? html : html.substring(0, index);
          html = index < 0 ? "" : html.substring(index);
          if (handler.chars) {
            handler.chars(text);
          }
        }
      } else {
        html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text2) {
          text2 = text2.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
          if (handler.chars) {
            handler.chars(text2);
          }
          return "";
        });
        parseEndTag("", stack.last());
      }
      if (html == last) {
        throw "Parse Error: " + html;
      }
      last = html;
    }
    parseEndTag();
    function parseStartTag(tag, tagName, rest, unary) {
      tagName = tagName.toLowerCase();
      if (block[tagName]) {
        while (stack.last() && inline[stack.last()]) {
          parseEndTag("", stack.last());
        }
      }
      if (closeSelf[tagName] && stack.last() == tagName) {
        parseEndTag("", tagName);
      }
      unary = empty[tagName] || !!unary;
      if (!unary) {
        stack.push(tagName);
      }
      if (handler.start) {
        var attrs = [];
        rest.replace(attr, function(match2, name) {
          var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
          attrs.push({
            name,
            value,
            escaped: value.replace(/(^|[^\\])"/g, '$1\\"')
            // "
          });
        });
        if (handler.start) {
          handler.start(tagName, attrs, unary);
        }
      }
    }
    function parseEndTag(tag, tagName) {
      if (!tagName) {
        var pos = 0;
      } else {
        for (var pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos] == tagName) {
            break;
          }
        }
      }
      if (pos >= 0) {
        for (var i = stack.length - 1; i >= pos; i--) {
          if (handler.end) {
            handler.end(stack[i]);
          }
        }
        stack.length = pos;
      }
    }
  }
  function makeMap(str) {
    var obj = {};
    var items = str.split(",");
    for (var i = 0; i < items.length; i++) {
      obj[items[i]] = true;
    }
    return obj;
  }
  function removeDOCTYPE(html) {
    return html.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*>\n/, "").replace(/<!DOCTYPE.*>\n/, "");
  }
  function parseAttrs(attrs) {
    return attrs.reduce(function(pre, attr2) {
      var value = attr2.value;
      var name = attr2.name;
      if (pre[name]) {
        pre[name] = pre[name] + " " + value;
      } else {
        pre[name] = value;
      }
      return pre;
    }, {});
  }
  function parseHtml(html) {
    html = removeDOCTYPE(html);
    var stacks = [];
    var results = {
      node: "root",
      children: []
    };
    HTMLParser(html, {
      start: function start(tag, attrs, unary) {
        var node = {
          name: tag
        };
        if (attrs.length !== 0) {
          node.attrs = parseAttrs(attrs);
        }
        if (unary) {
          var parent = stacks[0] || results;
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        } else {
          stacks.unshift(node);
        }
      },
      end: function end(tag) {
        var node = stacks.shift();
        if (node.name !== tag)
          formatAppLog("error", "at common/html-parser.js:303", "invalid state: mismatch end tag");
        if (stacks.length === 0) {
          results.children.push(node);
        } else {
          var parent = stacks[0];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        }
      },
      chars: function chars(text) {
        var node = {
          type: "text",
          text
        };
        if (stacks.length === 0) {
          results.children.push(node);
        } else {
          var parent = stacks[0];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(node);
        }
      },
      comment: function comment(text) {
        var node = {
          node: "comment",
          text
        };
        var parent = stacks[0];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    });
    return results.children;
  }
  var _style_0 = { "banner": { "": { "height": 180, "position": "relative", "backgroundColor": "#cccccc", "flexDirection": "row", "overflow": "hidden" } }, "banner-img": { "": { "flex": 1 } }, "title-area": { "": { "position": "absolute", "left": 15, "right": 15, "bottom": 15, "zIndex": 11 } }, "title-text": { "": { "fontSize": 16, "fontWeight": "400", "lineHeight": 20, "lines": 2, "color": "#ffffff", "overflow": "hidden" } }, "article-meta": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15, "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start" } }, "article-meta-text": { "": { "color": "#808080" } }, "article-text": { "": { "fontSize": 12, "lineHeight": 25, "marginTop": 0, "marginRight": 10, "marginBottom": 0, "marginLeft": 10 } }, "article-author": { "": { "fontSize": 15 } }, "article-time": { "": { "fontSize": 15 } }, "article-content": { "": { "fontSize": 15, "paddingTop": 0, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15, "marginBottom": 15, "overflow": "hidden" } } };
  var FAIL_CONTENT = "<p>\u83B7\u53D6\u4FE1\u606F\u5931\u8D251</p>";
  function parseImgs(nodes) {
    nodes.forEach((node) => {
      if (node.name === "img" && node.attrs && node.attrs["data-img-size-val"]) {
        const sizes = node.attrs["data-img-size-val"].split(",");
        const width = uni.upx2px(720 * 0.9);
        const height = parseInt(width * (sizes[1] / sizes[0]));
        node.attrs.style = `width:${width};height:${height};`;
      }
      if (Array.isArray(node.children)) {
        parseImgs(node.children);
      }
    });
    return nodes;
  }
  var _sfc_main = {
    data() {
      return {
        banner: {},
        content: []
      };
    },
    onShareAppMessage() {
      return {
        title: this.banner.title,
        path: "/pages/detail/detail?query=" + JSON.stringify(this.banner)
      };
    },
    onLoad(event) {
      this.load(event.query);
    },
    methods: {
      load(e) {
        var p = decodeURIComponent(e);
        try {
          this.banner = JSON.parse(p);
        } catch (error) {
          this.banner = JSON.parse(p);
        }
        uni.setNavigationBarTitle({
          title: this.banner.title
        });
        this.getDetail();
      },
      getDetail() {
        uni.request({
          url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + this.banner.post_id,
          success: (result) => {
            let content = FAIL_CONTENT;
            if (result.statusCode == 200) {
              content = result.data.content;
            }
            const nodes = parseHtml(content);
            parseImgs(nodes);
            this.content = nodes;
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_rich_text = (0, import_vue2.resolveComponent)("rich-text");
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      (0, import_vue2.createElementVNode)("view", { class: "content" }, [
        (0, import_vue2.createElementVNode)("view", {
          class: "banner",
          autoFocus: ""
        }, [
          (0, import_vue2.createElementVNode)("u-image", {
            class: "banner-img",
            src: $data.banner.image_url
          }, null, 8, ["src"]),
          (0, import_vue2.createElementVNode)("view", { class: "title-area" }, [
            (0, import_vue2.createElementVNode)(
              "u-text",
              { class: "title-text" },
              (0, import_vue2.toDisplayString)($data.banner.title),
              1
              /* TEXT */
            )
          ])
        ]),
        (0, import_vue2.createElementVNode)("view", { class: "article-meta" }, [
          (0, import_vue2.createElementVNode)(
            "u-text",
            { class: "article-meta-text article-author" },
            (0, import_vue2.toDisplayString)($data.banner.source),
            1
            /* TEXT */
          ),
          (0, import_vue2.createElementVNode)("u-text", { class: "article-meta-text article-text" }, "\u53D1\u8868\u4E8E"),
          (0, import_vue2.createElementVNode)(
            "u-text",
            { class: "article-meta-text article-time" },
            (0, import_vue2.toDisplayString)($data.banner.datetime),
            1
            /* TEXT */
          )
        ]),
        (0, import_vue2.createElementVNode)("view", { class: "article-content" }, [
          (0, import_vue2.createVNode)(_component_rich_text, {
            nodes: $data.content,
            style: { "font-size": "14px" }
          }, null, 8, ["nodes"])
        ]),
        (0, import_vue2.createElementVNode)("view", { class: "comment-wrap" })
      ])
    ]);
  }
  var detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "C:/Users/34554/OneDrive/\u6587\u6863/HBuilderProjects/news/pages/news/detail.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/news/detail";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    detail.mpType = "page";
    const app = Vue.createPageApp(detail, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...detail.styles || []]));
    app.mount("#root");
  }
})();
