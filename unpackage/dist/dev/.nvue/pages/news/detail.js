import { f as formatAppLog, _ as _export_sfc } from "../../uni-app.es.js";
import { resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createVNode } from "vue";
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
const _style_0 = { "banner": { "": { "height": 180, "position": "relative", "backgroundColor": "#cccccc", "flexDirection": "row", "overflow": "hidden" } }, "banner-img": { "": { "flex": 1 } }, "title-area": { "": { "position": "absolute", "left": 15, "right": 15, "bottom": 15, "zIndex": 11 } }, "title-text": { "": { "fontSize": 16, "fontWeight": "400", "lineHeight": 20, "lines": 2, "color": "#ffffff", "overflow": "hidden" } }, "article-meta": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15, "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start" } }, "article-meta-text": { "": { "color": "#808080" } }, "article-text": { "": { "fontSize": 12, "lineHeight": 25, "marginTop": 0, "marginRight": 10, "marginBottom": 0, "marginLeft": 10 } }, "article-author": { "": { "fontSize": 15 } }, "article-time": { "": { "fontSize": 15 } }, "article-content": { "": { "fontSize": 15, "paddingTop": 0, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15, "marginBottom": 15, "overflow": "hidden" } } };
const FAIL_CONTENT = "<p>获取信息失败1</p>";
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
const _sfc_main = {
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
  const _component_rich_text = resolveComponent("rich-text");
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "content" }, [
      createElementVNode("view", {
        class: "banner",
        autoFocus: ""
      }, [
        createElementVNode("u-image", {
          class: "banner-img",
          src: $data.banner.image_url
        }, null, 8, ["src"]),
        createElementVNode("view", { class: "title-area" }, [
          createElementVNode(
            "u-text",
            { class: "title-text" },
            toDisplayString($data.banner.title),
            1
            /* TEXT */
          )
        ])
      ]),
      createElementVNode("view", { class: "article-meta" }, [
        createElementVNode(
          "u-text",
          { class: "article-meta-text article-author" },
          toDisplayString($data.banner.source),
          1
          /* TEXT */
        ),
        createElementVNode("u-text", { class: "article-meta-text article-text" }, "发表于"),
        createElementVNode(
          "u-text",
          { class: "article-meta-text article-time" },
          toDisplayString($data.banner.datetime),
          1
          /* TEXT */
        )
      ]),
      createElementVNode("view", { class: "article-content" }, [
        createVNode(_component_rich_text, {
          nodes: $data.content,
          style: { "font-size": "14px" }
        }, null, 8, ["nodes"])
      ]),
      createElementVNode("view", { class: "comment-wrap" })
    ])
  ]);
}
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "C:/Users/34554/OneDrive/文档/HBuilderProjects/news/pages/news/detail.nvue"]]);
export {
  detail as default
};
