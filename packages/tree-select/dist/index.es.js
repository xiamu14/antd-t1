import React, { PureComponent } from 'react';
import { Tree } from 'antd';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".select_box {\n  display: flex;\n  flex-wrap: wrap;\n  border: 1px solid #d9d9d9;\n  width: 100%;\n  min-height: 36px;\n  border-radius: 4px;\n  padding: 2px 4px 0;\n  cursor: pointer;\n  z-index: 62;\n  position: relative;\n  box-sizing: border-box; }\n\n.select_box_selection {\n  border-color: #40a9ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); }\n\n.select_box-block {\n  padding: 2px 10px;\n  margin-right: 4px;\n  margin-bottom: 4px;\n  border: 1px solid #e8e8e8;\n  border-radius: 2px;\n  background-color: #fafafa; }\n\n.tree_select {\n  position: relative; }\n  .tree_select > .tree_dropdown {\n    position: absolute;\n    transform: translateY(3px);\n    width: 100%;\n    background-color: #ffffff;\n    border-radius: 4px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n    animation-duration: 400ms;\n    z-index: 60;\n    display: block; }\n  .tree_select > .tree_dropdown_init {\n    opacity: 0;\n    height: 0;\n    display: none; }\n  .tree_select > .tree_dropdown_show {\n    animation-name: fadeIn;\n    animation-timing-function: ease-in;\n    animation-fill-mode: forwards; }\n  .tree_select > .tree_dropdown_hide {\n    animation-name: fadeOut;\n    animation-timing-function: ease-out;\n    animation-fill-mode: forwards; }\n  .tree_select .ant-tree li .ant-tree-node-content-wrapper {\n    width: 80%;\n    word-break: break-word;\n    white-space: pre-wrap;\n    height: auto; }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    visibility: visible;\n    opacity: 1; } }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    visibility: hidden;\n    opacity: 0; } }\n";
styleInject(css);

// 去重
var unique = function (arr) { return __spread(new Set(arr)); };
// 过滤
var filter = function (arr1, arr2) {
    return arr1.filter(function (v) { return arr2.indexOf(v) === -1; });
};
/**
 * 判断数组是否包含
 */
function isContained(wrapArr, innerArr) {
    if (!Array.isArray(wrapArr) || !Array.isArray(innerArr))
        return false;
    if (wrapArr.length < innerArr.length)
        return false;
    for (var i = 0, len = innerArr.length; i < len; i++) {
        if (wrapArr.indexOf(innerArr[i]) === -1)
            return false;
    }
    return true;
}
/**
 * 获取指定元素的所有父级节点
 */
function getAllParentList(data, id) {
    var result = [];
    var deep = function (id, isRoot) {
        // console.log("这里无限循环了");
        for (var i = 0, len = data.length; i < len; i++) {
            var v = data[i];
            if (v.id === id) {
                if (!isRoot) {
                    result.push(v.id);
                }
                if (v.parentId) {
                    deep(v.parentId, false);
                }
                break;
            }
        }
    };
    deep(id, true);
    return result;
}
/**
 * 获取指定元素的所有子级节点
 */
function getAllChildList(tree, id) {
    var result = [];
    var deep = function (data) {
        for (var i = 0, len = data.length; i < len; i++) {
            var v = data[i];
            result.push(v.id);
            if (v.children && v.children.length) {
                deep(v.children);
            }
        }
    };
    var find = function (data) {
        for (var i = 0, len = data.length; i < len; i++) {
            var v = data[i];
            if (v.id === id) {
                deep(v.children || []);
                break;
            }
            else if (v.children && v.children.length) {
                find(v.children);
            }
        }
    };
    find(tree);
    return result;
}
/**
 * 获取半选状态下的节点
 */
function getHalfCheckedKeys(tree, keys) {
    var result = [];
    var deep = function (keys) {
        for (var i = 0, len = keys.length; i < len; i++) {
            var v = keys[i];
            var childList = getAllChildList(tree, v);
            var isAllChecked = isContained(keys, childList);
            if (!isAllChecked) {
                result.push(v);
            }
        }
    };
    deep(keys);
    return result;
}
function treeToArray(data) {
    return data.reduce(function (arr, _a) {
        var _b = _a.children, children = _b === void 0 ? [] : _b, other = __rest(_a, ["children"]);
        return arr.concat([__assign({}, other)], treeToArray(children));
    }, []);
}
var TreeSelect = /** @class */ (function (_super) {
    __extends(TreeSelect, _super);
    function TreeSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.hideSelection = function () {
            _this.setState({
                selection: false
            });
        };
        _this.onSelection = function (event) {
            event.stopPropagation();
            var selection = _this.state.selection;
            _this.setState({
                selection: !selection
            });
            if (!_this.state.treeInitTag) {
                _this.setState({
                    treeInitTag: true
                });
            }
        };
        _this.onCheck = function (args) {
            var _a = args[0], checked = _a.checked, halfChecked = _a.halfChecked;
            var props = args[1].node.props;
            var id = props.id;
            var isAdd = checked.includes(id);
            var childIds = getAllChildList(_this.state.treeData, id);
            var parentIds = getAllParentList(_this.state.menuIdsListOrder, id);
            var menuIds = [];
            if (isAdd) {
                menuIds = unique(__spread(parentIds, childIds, checked, halfChecked));
            }
            else {
                menuIds = filter(__spread(checked, halfChecked), childIds);
            }
            _this.setState({
                menuIds: menuIds
            });
            var onChange = _this.props.onChange;
            onChange(_this.state.menuIdsListOrder.filter(function (v) { return menuIds.indexOf(v.id) > -1; }));
        };
        _this.state = {
            treeData: [],
            menuIdsListOrder: [],
            menuIds: undefined,
            selection: false,
            treeInitTag: false //  treeSelect init tag
        };
        return _this;
    }
    TreeSelect.prototype.componentDidMount = function () {
        window.addEventListener("click", this.hideSelection);
    };
    TreeSelect.prototype.componentWillUnmount = function () {
        // 解决 window 的事件绑定
        window.removeEventListener("click", this.hideSelection);
    };
    TreeSelect.getDerivedStateFromProps = function (nextProps, prevState) {
        var treeData = nextProps.treeData, initialValues = nextProps.initialValues, value = nextProps.value;
        var menuIds = prevState.menuIds;
        var menuIdsCopy = value
            ? value
            : menuIds
                ? menuIds || []
                : initialValues || [];
        var other = {};
        // 当传入的treeData发生变化的时候，更新state
        if (treeData !== prevState.treeData) {
            other = {
                treeData: treeData,
                menuIdsListOrder: treeToArray(treeData)
            };
        }
        return __assign(__assign({}, other), { menuIds: menuIdsCopy });
    };
    TreeSelect.prototype.render = function () {
        var _this = this;
        var _a = this.state, treeData = _a.treeData, menuIds = _a.menuIds, menuIdsListOrder = _a.menuIdsListOrder;
        var switcherIcon = this.props.switcherIcon;
        var menuIdsHalfChecked = getHalfCheckedKeys(treeData, menuIds);
        var menuIdsChecked = filter(menuIds, menuIdsHalfChecked);
        var menuCheckedList = menuIdsListOrder.filter(function (v) { return menuIds.indexOf(v.id) > -1; });
        return (React.createElement("div", { className: "tree_select", style: { width: "300px" } },
            React.createElement("section", { className: "select_box " + (this.state.selection ? "select_box_selection" : ""), onClick: this.onSelection }, menuCheckedList.map(function (item, index) { return (React.createElement("span", { className: "select_box-block", key: String(index) }, item.title)); })),
            React.createElement("div", { className: "tree_dropdown " + (this.state.selection
                    ? "tree_dropdown_show"
                    : this.state.treeInitTag
                        ? "tree_dropdown_hide"
                        : "tree_dropdown_init"), onClick: function (e) { return e.stopPropagation(); } },
                React.createElement(Tree, { checkedKeys: {
                        checked: menuIdsChecked,
                        halfChecked: menuIdsHalfChecked
                    }, checkable: true, checkStrictly: true, switcherIcon: switcherIcon, defaultExpandedKeys: treeData.map(function (v) { return v.id; }), treeData: treeData, onCheck: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.onCheck(args);
                    } }))));
    };
    return TreeSelect;
}(PureComponent));

export default TreeSelect;
//# sourceMappingURL=index.es.js.map
