!function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";function r(){return{type:"REQUEST_NODE"}}function o(e){return{type:"RECEIVE_NODE",data:e}}function i(e){return function(t){return t(r()),fetch("../../api/node/"+e+"/",(0,p.fetchInit)()).then(function(e){return e.json()}).then(function(e){return t(o(e))})}}function a(e,t){return function(n){return fetch("../../api/node/"+e+"/",(0,p.fetchInit)("PUT",JSON.stringify(t))).then(function(t){return n(i(e))})}}function s(e){return function(t){return fetch("../../api/node/"+e+"/document/",(0,p.fetchInit)("POST")).then(function(n){return t(i(e))})}}function u(e,t){return function(n){return fetch("../../api/document/"+t+"/",(0,p.fetchInit)("DELETE")).then(function(t){return n(i(e))})}}function c(e,t){return function(n){return fetch("../../api/document/"+t+"/duplicate/",(0,p.fetchInit)("POST")).then(function(t){return n(i(e))})}}function l(e,t){return function(n){return fetch("../../api/document/"+t+"/activate/",(0,p.fetchInit)("PUT")).then(function(t){return n(i(e))})}}function f(e,t){return function(n){return fetch("../../api/document/"+t+"/deactivate/",(0,p.fetchInit)("PUT")).then(function(t){return n(i(e))})}}function d(e){return function(t){return fetch("../../api/node/"+e+"/child/",(0,p.fetchInit)("POST")).then(function(n){return t(i(e))})}}function h(e,t,n){return function(r){return fetch("../../api/node/"+t+"/swap-positions/"+n+"/",(0,p.fetchInit)("PUT")).then(function(t){return r(i(e))})}}Object.defineProperty(n,"__esModule",{value:!0}),n.requestNode=r,n.receiveNode=o,n.fetchNode=i,n.saveNodeMetadata=a,n.createNewDocumentRevision=s,n.deleteDocumentRevision=u,n.duplicateDocumentRevision=c,n.activateDocumentRevision=l,n.deactivateDocumentRevision=f,n.createNewNodeChild=d,n.swapChildNodePositions=h;var p=e("../utils")},{"../utils":10}],2:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=e("react"),c=r(u),l=e("react-redux"),f=e("./Node"),d=r(f),h=e("./DocumentRevisions"),p=r(h),m=e("./ChildNodes"),v=r(m),y=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"row"},c["default"].createElement("div",{className:"col-lg-7"},c["default"].createElement(d["default"],{dispatch:this.props.dispatch,nodeId:this.props.nodeId,isFetching:this.props.isFetching,node:this.props.node}),c["default"].createElement(p["default"],{dispatch:this.props.dispatch,nodeId:this.props.nodeId,fetchedInitial:this.props.fetchedInitial,revisions:this.props.revisions})),c["default"].createElement("div",{className:"col-lg-5"},c["default"].createElement(v["default"],{dispatch:this.props.dispatch,nodeId:this.props.nodeId,children:this.props.children})))}}]),t}(u.Component);n["default"]=(0,l.connect)(function(e){return{isFetching:e.get("isFetching"),fetchedInitial:e.get("fetchedInitial"),node:e.get("node"),revisions:e.get("revisions"),children:e.get("children")}})(y)},{"./ChildNodes":4,"./DocumentRevisions":6,"./Node":7,react:"react","react-redux":"react-redux"}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=e("react"),l=r(c),f=e("react-dom"),d=e("react-dnd"),h=e("classnames"),p=r(h),m=e("../../utils"),v={CARD:"card"},y={beginDrag:function(e){return{id:e.id,index:e.index}}},b={hover:function(e,t,n){var r=t.getItem().index,o=e.index;if(r!==o){var i=(0,f.findDOMNode)(n).getBoundingClientRect(),a=(i.bottom-i.top)/2,s=t.getClientOffset(),u=s.y-i.top;r<o&&u<a||r>o&&u>a||(e.moveCard(r,o),t.getItem().index=o)}}},_=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),u(t,[{key:"render",value:function(){var e=this.props,t=e.isDragging,n=e.connectDragSource,r=e.connectDropTarget;return n(r(l["default"].createElement("li",o({className:"child-node"},"className",(0,p["default"])({"child-node":!0,dragging:t})),l["default"].createElement("a",{href:"../"+this.props.id+"/"},(0,m.truncateWords)(this.props.title,6)))))}}]),t}(c.Component),g=(0,d.DragSource)(v.CARD,y,function(e,t){return{connectDragSource:e.dragSource(),isDragging:t.isDragging()}})(_);g=(0,d.DropTarget)(v.CARD,b,function(e){return{connectDropTarget:e.dropTarget()}})(g),n["default"]=g},{"../../utils":10,classnames:"classnames",react:"react","react-dnd":"react-dnd","react-dom":"react-dom"}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=e("react"),c=r(u),l=e("react-dnd"),f=e("react-dnd-html5-backend"),d=r(f),h=e("../actions"),p=e("./ChildNode"),m=r(p),v=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){var e=this;return c["default"].createElement("div",{className:"child-nodes-container"},c["default"].createElement("h2",null,"Child documents"),c["default"].createElement("a",{className:"action add-new-child",href:"./add/"},"Add a new child"),0===this.props.children.size?c["default"].createElement("p",{className:"no-children"},"This document has no children."):c["default"].createElement("ul",{className:"child-nodes"},this.props.children.map(function(t,n){return c["default"].createElement(m["default"],{key:t.get("id"),id:t.get("id"),index:n,title:t.get("title"),moveCard:e.moveCard.bind(e)})})))}},{key:"moveCard",value:function(e,t){this.props.dispatch((0,h.swapChildNodePositions)(this.props.nodeId,this.props.children.getIn([e,"id"]),this.props.children.getIn([t,"id"])))}}]),t}(u.Component);n["default"]=(0,l.DragDropContext)(d["default"])(v)},{"../actions":1,"./ChildNode":3,react:"react","react-dnd":"react-dnd","react-dnd-html5-backend":"react-dnd-html5-backend"}],5:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=e("react"),c=r(u),l=e("../../utils"),f=e("../actions"),d=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){return this.props.revision.get("deleted")?c["default"].createElement(h,this.props):c["default"].createElement(p,this.props)}}]),t}(u.Component);n["default"]=d;var h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("li",null,c["default"].createElement("div",{className:"activate"},"×"),c["default"].createElement("div",{className:"revision"},c["default"].createElement("span",{className:"title"},"Revision ",this.props.revision.get("revision")),c["default"].createElement("div",{className:"info"},"Deleted on ",(0,l.formatDateTime)(this.props.revision.get("updated")))))}}]),t}(u.Component),p=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){var e=this,t=this.props.revision;return c["default"].createElement("li",null,c["default"].createElement("div",{className:"activate"},c["default"].createElement("input",{type:"radio",checked:t.get("active"),onChange:this.handleActivate.bind(this)})),c["default"].createElement("div",{className:"revision"},c["default"].createElement("a",{className:"action action-navigation title",href:t.get("url")},"Revision ",t.get("revision")),c["default"].createElement("ul",{className:"actions"},c["default"].createElement("li",null,c["default"].createElement("a",{className:"action",href:"#",onClick:function(t){return e.handleDelete(t)}},"Delete")),c["default"].createElement("li",null,c["default"].createElement("a",{className:"action",href:"#",onClick:function(t){return e.handleDuplicate(t)}},"Duplicate")),c["default"].createElement("li",null,c["default"].createElement("a",{className:"action action-navigation",href:t.get("preview_url")},"Preview"))),c["default"].createElement("div",{className:"info"},"Last updated on ",(0,l.formatDateTime)(t.get("updated")),", created on ",(0,l.formatDateTime)(t.get("created")))))}},{key:"handleActivate",value:function(e){this.props.revision.get("active")?this.props.dispatch((0,f.deactivateDocumentRevision)(this.props.nodeId,this.props.revision.get("id"))):this.props.dispatch((0,f.activateDocumentRevision)(this.props.nodeId,this.props.revision.get("id")))}},{key:"handleDelete",value:function(e){e.preventDefault();var t=window.confirm("Are you sure you want to delete this document revision?");t&&this.props.dispatch((0,f.deleteDocumentRevision)(this.props.nodeId,this.props.revision.get("id")))}},{key:"handleDuplicate",value:function(e){e.preventDefault();var t=window.confirm("Are you sure you want to duplicate this document revision?");t&&this.props.dispatch((0,f.duplicateDocumentRevision)(this.props.nodeId,this.props.revision.get("id")))}}]),t}(u.Component)},{"../../utils":10,"../actions":1,react:"react"}],6:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=e("react"),c=r(u),l=e("./DocumentRevision"),f=r(l),d=e("../actions"),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){return c["default"].createElement("div",{className:"revisions-container"},c["default"].createElement("h2",null,"Document revisions"),c["default"].createElement("a",{className:"action create-new-revision",href:"#",onClick:this.handleAddNew.bind(this)},"Create a new revision"),this.props.fetchedInitial&&0===this.props.revisions.size?c["default"].createElement("p",null,"This document has no revisions."):c["default"].createElement(p,this.props))}},{key:"handleAddNew",value:function(e){e.preventDefault(),this.props.dispatch((0,d.createNewDocumentRevision)(this.props.nodeId))}}]),t}(u.Component);n["default"]=h;var p=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"render",value:function(){var e=this;return c["default"].createElement("ul",{className:"revisions"},this.props.revisions.map(function(t){return c["default"].createElement(f["default"],{key:t.get("id"),dispatch:e.props.dispatch,nodeId:e.props.nodeId,revision:t})}))}}]),t}(u.Component)},{"../actions":1,"./DocumentRevision":5,react:"react"}],7:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=e("react"),l=r(c),f=e("classnames"),d=r(f),h=e("slug"),p=r(h),m=e("../actions"),v=["title","slug","description","is_subsite","show_in_menu","menu_title"],y=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isFormInFocus:!1},n}return s(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){if(this.props.isFetching&&!this.state.isFormInFocus)for(var t=0;t<v.length;t++){var n=v[t];this.setState(o({},n,e.node.get(n)))}}},{key:"render",value:function(){var e=this,t=void 0!==this.props.node.get("path")&&""===this.props.node.get("path");return l["default"].createElement("div",null,l["default"].createElement("h2",null,"Document metadata"),l["default"].createElement("div",{onKeyDown:this.handleKeys.bind(this),onFocus:function(){return e.setState({isFormInFocus:!0})},className:(0,d["default"])({"node-metadata":!0,editing:this.state.isFormInFocus})},l["default"].createElement("div",{className:"form-group row"},l["default"].createElement("label",{htmlFor:"node-metadata-title",className:"col-md-3 form-control-label"},"Title:"),l["default"].createElement("div",{className:"col-md-7"},l["default"].createElement("input",{type:"text",id:"node-metadata-title",className:"form-control",value:this.state.title,onChange:this.handleChangeTitle.bind(this)}))),t?"":l["default"].createElement("div",{className:"form-group row"},l["default"].createElement("label",{htmlFor:"node-metadata-slug",className:"col-md-3 form-control-label"},"Name in path:"),l["default"].createElement("div",{className:"col-md-7"},l["default"].createElement("input",{id:"node-metadata-slug",type:"text",className:"form-control",value:this.state.slug,onChange:this.handleChangeSlug.bind(this)}))),l["default"].createElement("div",{className:"form-group row"},l["default"].createElement("label",{htmlFor:"node-metadata-description",className:"col-md-3 form-control-label"},"Description:"),l["default"].createElement("div",{className:"col-md-7"},l["default"].createElement("input",{id:"node-metadata-description",type:"text",className:"form-control",value:this.state.description,onChange:function(t){return e.setState({description:t.target.value})}}))),t?"":l["default"].createElement("div",{className:"form-group row"},l["default"].createElement("label",{htmlFor:"node-metadata-is-subsite",className:"col-md-3"},"Subsite:"),l["default"].createElement("div",{className:"col-md-7"},l["default"].createElement("div",{className:"checkbox"},l["default"].createElement("label",null,l["default"].createElement("input",{id:"node-metadata-is-subsite",type:"checkbox",checked:this.state.is_subsite,onChange:function(t){return e.setState({is_subsite:!e.state.is_subsite})}})," ",l["default"].createElement("span",{className:"help-text"},"This document is the root of a new subsite"))))),t?"":l["default"].createElement("div",{className:"form-group row"},l["default"].createElement("label",{htmlFor:"node-metadata-show-in-menu",className:"col-md-3"},"Show in menu:"),l["default"].createElement("div",{className:"col-md-7"},l["default"].createElement("div",{className:"checkbox"},l["default"].createElement("label",null,l["default"].createElement("input",{id:"node-metadata-show-in-menu",type:"checkbox",checked:this.state.show_in_menu,onChange:this.handleChangeShowInMenu.bind(this)})," ",l["default"].createElement("span",{className:"help-text"},"Show this document in site navigation menu(s)"))))),t||!this.state.show_in_menu?"":l["default"].createElement("div",{className:"form-group row"},l["default"].createElement("label",{htmlFor:"node-metadata-description",className:"col-md-3 form-control-label"},"Title in menu:"),l["default"].createElement("div",{className:"col-md-7"},l["default"].createElement("input",{id:"node-metadata-menu-title",type:"text",className:"form-control",value:this.state.menu_title,onChange:function(t){return e.setState({menu_title:t.target.value})}}))),this.state.isFormInFocus?l["default"].createElement("div",{className:"form-group row save-or-cancel"},l["default"].createElement("div",{className:"col-md-offset-3 col-sm-7"},l["default"].createElement("button",{className:"btn btn-primary",onClick:this.handleSave.bind(this)},"Save"),l["default"].createElement("span",{className:"or-cancel"},"or"),l["default"].createElement("button",{className:"btn btn-link action",onClick:this.handleCancel.bind(this)},"Cancel"))):null))}},{key:"handleKeys",value:function(e){switch(e.which){case 13:e.target.blur(),this.handleSave();case 27:e.target.blur(),this.handleCancel()}}},{key:"handleChangeTitle",value:function(e){this.setState({title:e.target.value,slug:(0,p["default"])(e.target.value,{lower:!0})})}},{key:"handleChangeSlug",value:function(e){this.setState({slug:(0,p["default"])(e.target.value,{lower:!0})})}},{key:"handleChangeShowInMenu",value:function(e){this.setState({show_in_menu:!this.state.show_in_menu}),this.state.show_in_menu||this.setState({menu_title:""})}},{key:"handleCancel",value:function(e){this.setState({isFormInFocus:!1}),this.setState(this.props.node)}},{key:"handleSave",value:function(e){this.setState({isFormInFocus:!1});for(var t={},n=0;n<v.length;n++){var r=v[n];t[r]=this.state[r]}this.props.dispatch((0,m.saveNodeMetadata)(this.props.nodeId,t))}}]),t}(c.Component);n["default"]=y},{"../actions":1,classnames:"classnames",react:"react",slug:"slug"}],8:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}e("../utils");var o=e("react"),i=r(o),a=e("react-dom"),s=e("redux"),u=e("react-redux"),c=e("redux-thunk"),l=r(c),f=e("./components/App"),d=r(f),h=e("./reducers"),p=r(h),m=e("./actions"),v=(0,s.applyMiddleware)(l["default"])(s.createStore);if(document.getElementById("node-app")){var y=v(p["default"]);y.dispatch((0,m.fetchNode)(window.witlof.nodeId)),(0,a.render)(i["default"].createElement(u.Provider,{store:y},i["default"].createElement(d["default"],{nodeId:window.witlof.nodeId})),document.getElementById("node-app"))}},{"../utils":10,"./actions":1,"./components/App":2,"./reducers":9,react:"react","react-dom":"react-dom","react-redux":"react-redux",redux:"redux","redux-thunk":"redux-thunk"}],9:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length<=0||void 0===arguments[0]?s:arguments[0],t=arguments[1];switch(t.type){case"REQUEST_NODE":return e.set("isFetching",!0);case"RECEIVE_NODE":return e.set("isFetching",!1).set("fetchedInitial",!0).set("node",a["default"].fromJS(t.data.node)).set("revisions",a["default"].fromJS(t.data.revisions)).set("children",a["default"].fromJS(t.data.children));default:return e}}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=o;var i=e("immutable"),a=r(i),s=a["default"].fromJS({isFetching:!1,fetchedInitial:!1,node:{},revisions:[],children:[]})},{immutable:"immutable"}],10:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length<=0||void 0===arguments[0]?"GET":arguments[0],t=arguments.length<=1||void 0===arguments[1]?null:arguments[1],n={method:e,credentials:"same-origin",headers:{"X-CSRFToken":l}};return"HEAD"!=e&&"GET"!=e&&(n.body=t),n}function i(e){var t={day:"numeric",month:"short",year:"numeric",hour12:!1,hour:"numeric",minute:"numeric"};return new Date(e).toLocaleTimeString("en-US",t)}function a(e,t){var n=e.split(" ").splice(0,t).join(" ");return n.length<e.length?n+" …":e}function s(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return f++,""+e+f}Object.defineProperty(n,"__esModule",{value:!0}),n.CSRF_TOKEN=void 0,n.fetchInit=o,n.formatDateTime=i,n.truncateWords=a,n.getNextId=s,e("es6-promise"),e("whatwg-fetch");var u=e("js-cookie"),c=r(u),l=n.CSRF_TOKEN=c["default"].get("csrftoken"),f=0},{"es6-promise":11,"js-cookie":"js-cookie","whatwg-fetch":13}],11:[function(e,t,n){(function(r,o){!function(e,r){"object"==typeof n&&"undefined"!=typeof t?t.exports=r():"function"==typeof define&&define.amd?define(r):e.ES6Promise=r()}(this,function(){"use strict";function t(e){return"function"==typeof e||"object"==typeof e&&null!==e}function n(e){return"function"==typeof e}function i(e){Y=e}function a(e){Q=e}function s(){return function(){return r.nextTick(d)}}function u(){return function(){z(d)}}function c(){var e=0,t=new Z(d),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function l(){var e=new MessageChannel;return e.port1.onmessage=d,function(){return e.port2.postMessage(0)}}function f(){var e=setTimeout;return function(){return e(d,1)}}function d(){for(var e=0;e<X;e+=2){var t=ne[e],n=ne[e+1];t(n),ne[e]=void 0,ne[e+1]=void 0}X=0}function h(){try{var t=e,n=t("vertx");return z=n.runOnLoop||n.runOnContext,u()}catch(r){return f()}}function p(e,t){var n=arguments,r=this,o=new this.constructor(v);void 0===o[oe]&&A(o);var i=r._state;return i?!function(){var e=n[i-1];Q(function(){return I(i,o,e,r._result)})}():S(r,o,e,t),o}function m(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(v);return T(n,e),n}function v(){}function y(){return new TypeError("You cannot resolve a promise with itself")}function b(){return new TypeError("A promises callback cannot return that same promise.")}function _(e){try{return e.then}catch(t){return ue.error=t,ue}}function g(e,t,n,r){try{e.call(t,n,r)}catch(o){return o}}function w(e,t,n){Q(function(e){var r=!1,o=g(n,t,function(n){r||(r=!0,t!==n?T(e,n):P(e,n))},function(t){r||(r=!0,D(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&o&&(r=!0,D(e,o))},e)}function E(e,t){t._state===ae?P(e,t._result):t._state===se?D(e,t._result):S(t,void 0,function(t){return T(e,t)},function(t){return D(e,t)})}function O(e,t,r){t.constructor===e.constructor&&r===p&&t.constructor.resolve===m?E(e,t):r===ue?D(e,ue.error):void 0===r?P(e,t):n(r)?w(e,t,r):P(e,t)}function T(e,n){e===n?D(e,y()):t(n)?O(e,n,_(n)):P(e,n)}function N(e){e._onerror&&e._onerror(e._result),C(e)}function P(e,t){e._state===ie&&(e._result=t,e._state=ae,0!==e._subscribers.length&&Q(C,e))}function D(e,t){e._state===ie&&(e._state=se,e._result=t,Q(N,e))}function S(e,t,n,r){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+ae]=n,o[i+se]=r,0===i&&e._state&&Q(C,e)}function C(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r=void 0,o=void 0,i=e._result,a=0;a<t.length;a+=3)r=t[a],o=t[a+n],r?I(n,r,o,i):o(i);e._subscribers.length=0}}function j(){this.error=null}function x(e,t){try{return e(t)}catch(n){return ce.error=n,ce}}function I(e,t,r,o){var i=n(r),a=void 0,s=void 0,u=void 0,c=void 0;if(i){if(a=x(r,o),a===ce?(c=!0,s=a.error,a=null):u=!0,t===a)return void D(t,b())}else a=o,u=!0;t._state!==ie||(i&&u?T(t,a):c?D(t,s):e===ae?P(t,a):e===se&&D(t,a))}function k(e,t){try{t(function(t){T(e,t)},function(t){D(e,t)})}catch(n){D(e,n)}}function R(){return le++}function A(e){e[oe]=le++,e._state=void 0,e._result=void 0,e._subscribers=[]}function F(e,t){this._instanceConstructor=e,this.promise=new e(v),this.promise[oe]||A(this.promise),W(t)?(this._input=t,this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?P(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&P(this.promise,this._result))):D(this.promise,M())}function M(){return new Error("Array Methods must be provided an Array")}function U(e){return new F(this,e).promise}function B(e){var t=this;return new t(W(e)?function(n,r){for(var o=e.length,i=0;i<o;i++)t.resolve(e[i]).then(n,r)}:function(e,t){return t(new TypeError("You must pass an array to race."))})}function L(e){var t=this,n=new t(v);return D(n,e),n}function q(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function H(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function G(e){this[oe]=R(),this._result=this._state=void 0,this._subscribers=[],v!==e&&("function"!=typeof e&&q(),this instanceof G?k(this,e):H())}function J(){var e=void 0;if("undefined"!=typeof o)e=o;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(t){}if("[object Promise]"===r&&!n.cast)return}e.Promise=G}var K=void 0;K=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var W=K,X=0,z=void 0,Y=void 0,Q=function(e,t){ne[X]=e,ne[X+1]=t,X+=2,2===X&&(Y?Y(d):re())},V="undefined"!=typeof window?window:void 0,$=V||{},Z=$.MutationObserver||$.WebKitMutationObserver,ee="undefined"==typeof self&&"undefined"!=typeof r&&"[object process]"==={}.toString.call(r),te="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ne=new Array(1e3),re=void 0;re=ee?s():Z?c():te?l():void 0===V&&"function"==typeof e?h():f();var oe=Math.random().toString(36).substring(16),ie=void 0,ae=1,se=2,ue=new j,ce=new j,le=0;return F.prototype._enumerate=function(){for(var e=this.length,t=this._input,n=0;this._state===ie&&n<e;n++)this._eachEntry(t[n],n)},F.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,r=n.resolve;if(r===m){var o=_(e);if(o===p&&e._state!==ie)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(n===G){var i=new n(v);O(i,e,o),this._willSettleAt(i,t)}else this._willSettleAt(new n(function(t){return t(e)}),t)}else this._willSettleAt(r(e),t)},F.prototype._settledAt=function(e,t,n){var r=this.promise;r._state===ie&&(this._remaining--,e===se?D(r,n):this._result[t]=n),0===this._remaining&&P(r,this._result)},F.prototype._willSettleAt=function(e,t){var n=this;S(e,void 0,function(e){return n._settledAt(ae,t,e)},function(e){return n._settledAt(se,t,e)})},G.all=U,G.race=B,G.resolve=m,G.reject=L,G._setScheduler=i,G._setAsap=a,G._asap=Q,G.prototype={constructor:G,then:p,"catch":function(e){return this.then(null,e)}},J(),G.polyfill=J,G.Promise=G,G})}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:12}],12:[function(e,t,n){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(f===setTimeout)return setTimeout(e,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(e,0);try{return f(e,0)}catch(t){try{return f.call(null,e,0)}catch(t){return f.call(this,e,0)}}}function a(e){if(d===clearTimeout)return clearTimeout(e);if((d===o||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(t){try{return d.call(null,e)}catch(t){return d.call(this,e)}}}function s(){v&&p&&(v=!1,p.length?m=p.concat(m):y=-1,m.length&&u())}function u(){if(!v){var e=i(s);v=!0;for(var t=m.length;t;){for(p=m,m=[];++y<t;)p&&p[y].run();y=-1,t=m.length}p=null,v=!1,a(e)}}function c(e,t){this.fun=e,this.array=t}function l(){}var f,d,h=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(e){f=r}try{d="function"==typeof clearTimeout?clearTimeout:o}catch(e){d=o}}();var p,m=[],v=!1,y=-1;h.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||v||i(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=l,h.addListener=l,h.once=l,h.off=l,h.removeListener=l,h.removeAllListeners=l,h.emit=l,h.binding=function(e){
throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(e){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},{}],13:[function(e,t,n){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function n(e){return"string"!=typeof e&&(e=String(e)),e}function r(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return m.iterable&&(t[Symbol.iterator]=function(){return t}),t}function o(e){this.map={},e instanceof o?e.forEach(function(e,t){this.append(t,e)},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function i(e){return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function a(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function s(e){var t=new FileReader;return t.readAsArrayBuffer(e),a(t)}function u(e){var t=new FileReader;return t.readAsText(e),a(t)}function c(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,"string"==typeof e)this._bodyText=e;else if(m.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(m.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(m.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(e){if(!m.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e))throw new Error("unsupported BodyInit type")}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):m.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},m.blob?(this.blob=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var e=i(this);return e?e:Promise.resolve(this._bodyText)},m.formData&&(this.formData=function(){return this.text().then(d)}),this.json=function(){return this.text().then(JSON.parse)},this}function l(e){var t=e.toUpperCase();return v.indexOf(t)>-1?t:e}function f(e,t){t=t||{};var n=t.body;if(f.prototype.isPrototypeOf(e)){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new o(e.headers)),this.method=e.method,this.mode=e.mode,n||(n=e._bodyInit,e.bodyUsed=!0)}else this.url=e;if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new o(t.headers)),this.method=l(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function d(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(o))}}),t}function h(e){var t=new o,n=(e.getAllResponseHeaders()||"").trim().split("\n");return n.forEach(function(e){var n=e.trim().split(":"),r=n.shift().trim(),o=n.join(":").trim();t.append(r,o)}),t}function p(e,t){t||(t={}),this.type="default",this.status=t.status,this.ok=this.status>=200&&this.status<300,this.statusText=t.statusText,this.headers=t.headers instanceof o?t.headers:new o(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){var m={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};o.prototype.append=function(e,r){e=t(e),r=n(r);var o=this.map[e];o||(o=[],this.map[e]=o),o.push(r)},o.prototype["delete"]=function(e){delete this.map[t(e)]},o.prototype.get=function(e){var n=this.map[t(e)];return n?n[0]:null},o.prototype.getAll=function(e){return this.map[t(e)]||[]},o.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},o.prototype.set=function(e,r){this.map[t(e)]=[n(r)]},o.prototype.forEach=function(e,t){Object.getOwnPropertyNames(this.map).forEach(function(n){this.map[n].forEach(function(r){e.call(t,r,n,this)},this)},this)},o.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),r(e)},o.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),r(e)},o.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),r(e)},m.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var v=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];f.prototype.clone=function(){return new f(this)},c.call(f.prototype),c.call(p.prototype),p.prototype.clone=function(){return new p(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},p.error=function(){var e=new p(null,{status:0,statusText:""});return e.type="error",e};var y=[301,302,303,307,308];p.redirect=function(e,t){if(y.indexOf(t)===-1)throw new RangeError("Invalid status code");return new p(null,{status:t,headers:{location:e}})},e.Headers=o,e.Request=f,e.Response=p,e.fetch=function(e,t){return new Promise(function(n,r){function o(){return"responseURL"in a?a.responseURL:/^X-Request-URL:/m.test(a.getAllResponseHeaders())?a.getResponseHeader("X-Request-URL"):void 0}var i;i=f.prototype.isPrototypeOf(e)&&!t?e:new f(e,t);var a=new XMLHttpRequest;a.onload=function(){var e={status:a.status,statusText:a.statusText,headers:h(a),url:o()},t="response"in a?a.response:a.responseText;n(new p(t,e))},a.onerror=function(){r(new TypeError("Network request failed"))},a.ontimeout=function(){r(new TypeError("Network request failed"))},a.open(i.method,i.url,!0),"include"===i.credentials&&(a.withCredentials=!0),"responseType"in a&&m.blob&&(a.responseType="blob"),i.headers.forEach(function(e,t){a.setRequestHeader(t,e)}),a.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)},{}]},{},[8]);
//# sourceMappingURL=node.js.map
