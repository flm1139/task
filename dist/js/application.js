/*
 * Bindows 1.10
 * http://www.bindows.net/
 * Copyright (c) 2003-2004 MB Technologies
 *
 * Bindows(tm) belongs to MB Technologies (Georgia, USA). All rights reserved.
 * You are not allowed to copy or modify this code. Commercial use requires
 * license.
 */
Array.prototype.indexOf=function(o){
for(var i=0;i<this.length;i++){
if(this[i]==o)
return i;
}
return-1;
};Array.prototype.lastIndexOf=function(o){
for(var i=this.length-1;i>=0;i--){
if(this[i]==o)
return i;
}
return-1;
};Array.prototype.contains=function(o){
return this.indexOf(o)!= -1;
};Array.prototype.copy=function(o){
return this.concat();
};Array.prototype.insertAt=function(o,i){
this.splice(i,0,o);
};Array.prototype.insertBefore=function(o,o2){
var i=this.indexOf(o2);if(i== -1)
this.push(o);else this.splice(i,0,o);
};Array.prototype.removeAt=function(i){
this.splice(i,1);
};Array.prototype.remove=function(o){
var i=this.indexOf(o);if(i!= -1)
this.splice(i,1);
};String.prototype.trim=function(){
return this.replace(/(^\s+)|\s+$/g,"");
};Function.READ=1;Function.WRITE=2;Function.READ_WRITE=3;Function.prototype.addProperty=function(sName,nReadWrite){
nReadWrite=nReadWrite||Function.READ_WRITE;var capitalized=sName.charAt(0).toUpperCase()+sName.substr(1);if(nReadWrite&Function.READ)
this.prototype["get"+capitalized]=new Function("","return this._"+sName+";");if(nReadWrite&Function.WRITE)
this.prototype["set"+capitalized]=new Function(sName,"this._"+sName+" = "+sName+";");
};function BiObject(){
this._hashCode=BiObject._hashCodePrefix+Math.round(Math.random()*1000)+BiObject._hashCodePrefix+BiObject._hashCodeCounter++;
}
BiObject._hashCodeCounter=1;BiObject._hashCodePrefix="hc";BiObject.toHashCode=function(o){
if(o._hashCode!=null)
return o._hashCode;return o._hashCode=BiObject._hashCodePrefix+Math.round(Math.random()*1000)+BiObject._hashCodePrefix+BiObject._hashCodeCounter++;
};var _p=BiObject.prototype;_p._className="BiObject";_p._disposed=false;_p._id=null;BiObject.prototype.getDisposed=function(){
return this._disposed;
};BiObject.prototype.getId=function(){
return this._id;
};BiObject.prototype.setId=function(v){
this._id=v;
};BiObject.prototype.getUserData=function(){
return this._userData;
};BiObject.prototype.setUserData=function(v){
this._userData=v;
};_p.toHashCode=function(){
return BiObject.toHashCode(this);
};_p.dispose=function(){
this._disposed=true;delete this._userData;
};_p.toString=function(){
if(this._className)
return"[object "+this._className+"]";return"[object Object]";
};_p.getProperty=function(sPropertyName){
var getterName="get"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);if(typeof this[getterName]=="function")
return this[getterName]();throw new Error("No such property, "+sPropertyName);
};_p.setProperty=function(sPropertyName,oValue){
var setterName="set"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);if(typeof this[setterName]=="function")
this[setterName](oValue);else throw new Error("No such property, "+sPropertyName);
};_p.setAttribute=function(sName,sValue,oXmlResourceParser)
{
var v;if(sValue=="true")
v=true;else if(sValue=="false")
v=false;else if(parseFloat(sValue)==sValue)
v=parseFloat(sValue);else v=sValue;this.setProperty(sName,v);
};_p.getAttribute=function(sName)
{
return String(this.getProperty(sName));
};_p.addXmlNode=function(oNode,oXmlResourceParser)
{
if(oNode.nodeType==1)
oXmlResourceParser.fromNode(oNode);
};function BiBrowserCheck(){
if(BiBrowserCheck._singleton)
return BiBrowserCheck._singleton;var ua=navigator.userAgent;this._ie= /msie/i.test(ua);this._moz=navigator.product=="Gecko";if(this._moz)
{
/rv\:([^\);]+)(\)|;)/.test(ua);this._version=RegExp.$1;this._ie55=false;this._ie6=false;
}
else {
/MSIE([^\);]+)(\)|;)/.test(ua);this._version=RegExp.$1;this._ie55= /msie 5\.5/i.test(ua);this._ie6= /msie 6/i.test(ua);
}
BiBrowserCheck._singleton=this;
}
BiBrowserCheck.prototype=new BiObject;BiBrowserCheck.prototype.getIe=function(){
return this._ie;
};BiBrowserCheck.prototype.getIe55=function(){
return this._ie55;
};BiBrowserCheck.prototype.getIe6=function(){
return this._ie6;
};BiBrowserCheck.prototype.getMoz=function(){
return this._moz;
};BiBrowserCheck.prototype.getVersion=function(){
return this._version;
};var _br=new BiBrowserCheck;BiBrowserCheck.ie=_br.getIe();BiBrowserCheck.ie55=_br.getIe55();BiBrowserCheck.ie6=_br.getIe6();BiBrowserCheck.moz=_br.getMoz();BiBrowserCheck.version=_br.getVersion();_br=null;function BiUri(sBase,sRel)
{
this._params={
 
};if(sBase)
{
this.setHref(sBase);if(sRel)
this._setRelative(sRel)
}
}
_p=BiUri.prototype=new BiObject;_p._className="BiUri";_p._scheme="";_p._userInfo="";_p._port="";_p._host="";_p._path="";_p._dirPath="";_p._fragment="";_p._query="";_p._hrefCache=null;BiUri.prototype.getScheme=function(){
return this._scheme;
};BiUri.prototype.getPath=function(){
return this._path;
};BiUri.prototype.getDirPath=function(){
return this._dirPath;
};BiUri.prototype.getHost=function(){
return this._host;
};BiUri.prototype.getPort=function(){
return this._port;
};BiUri.prototype.getFragment=function(){
return this._fragment;
};BiUri.prototype.getQuery=function(){
return this._query;
};BiUri.prototype.getUserInfo=function(){
return this._userInfo;
};BiUri.regExps={
scheme:/^([^:]+)\:.+$/,user:/^([^@\/]+)@.+$/,host:/^([^:\/\?\#]+).*$/,port:/^:(\d+)/,path:/^([^\?#]*)/,dirPath:/^(.*\/)[^\/]*$/,fragment:/^[^#]*#(.*)$/,absUri:/^\w(\w|\d|\+|\-|\.)*:/i
};_p.toString=function()
{
return this.getHref();
};_p.setHref=function(s)
{
this._hrefCache=null;s=String(s);this._scheme="";this._userInfo="";this._host="";this._port=null;this._path="";this._dirPath="";this._query="";this._fragment="";this._params={
 
};var err=new Error("Not a well formatted URI");var ok=BiUri.regExps.scheme.test(s);if(!ok)throw err;this._scheme=RegExp.$1;if(this._scheme=="mailto"||this._scheme=="news"||this._scheme=="view-source")
s=s.substring(this._scheme.length+1);else s=s.substring(this._scheme.length+3);ok=BiUri.regExps.user.test(s);if(ok)
{
this._userInfo=RegExp.$1;s=s.substring(this._userInfo.length+1);
}
if(this._scheme!="file"||s.charAt(0)!="/")
{
ok=BiUri.regExps.host.test(s);if(!ok)
throw err;this._host=RegExp.$1;s=s.substring(this._host.length);
}
ok=BiUri.regExps.port.test(s);if(ok)
{
this._port=Number(RegExp.$1);s=s.substring(RegExp.$1.length+1);
}
this._parsePathAndRest(s);
};_p._parsePathAndRest=function(s)
{
var err=new Error("Not a well formatted URI");var ok=BiUri.regExps.path.test(s);if(!ok)
throw err;this._path=RegExp.$1;s=s.substring(this._path.length);if(this._path==""&&(this._scheme=="file"||this._scheme=="http"||this._scheme=="https"||this._scheme=="ftp"))
{
this._path="/";
}
var segments=this._path.split("/");var sb=[];var j=0;for(var i=0;i<segments.length;i++)
{
if(segments[i]==".")
continue;if(segments[i]=="..")
{
j--;delete sb[j];sb.length=j
continue;
}
sb[j++]=segments[i];
}
this._path=sb.join("/");if(this._path.length>0)
{
ok=BiUri.regExps.dirPath.test(this._path);if(!ok)
throw err;this._dirPath=RegExp.$1;
}
ok=BiUri.regExps.fragment.test(s);if(ok)
{
this._fragment=RegExp.$1;s=s.substring(0,s.length-this._fragment.length-1);this._fragment="#"+this._fragment.replace("#","%23");
}
this._query=s;s=s.substring(1);if(this._query!="")
{
var pairs=s.split(/\;|\&/);var parts;for(var i=0;i<pairs.length;i++)
{
parts=pairs[i].split("=");if(parts.length==2)
this._params[parts[0]]=decodeURIComponent(parts[1]);else this._params[pairs[i]]=null;
}
}
};_p._setRelative=function(s)
{
this._hrefCache=null;s=String(s);var isAbsolute=BiUri.regExps.absUri.test(s);if(isAbsolute)
{
this.setHref(s);return;
}
var dirPath=this._dirPath;this._path="";this._dirPath="";this._query="";this._fragment="";this._params={
 
};if(s.charAt(0)=="/")
{
this._parsePathAndRest(s)
}
else this._parsePathAndRest(dirPath+s);
};_p.getHref=function()
{
if(this._hrefCache!=null)
return this._hrefCache;var s=this._scheme+(this._scheme=="mailto"||this._scheme=="news"||this._scheme=="view-source"?":":"://")+this._userInfo+(this._userInfo==""?"":"@")+this._host+(this._port!=null?":"+this._port:"")+this._path;var sb=[];for(var name in this._params)
{
if(this._params[name]!=null)
sb.push(name+"="+encodeURIComponent(this._params[name]));else sb.push(name);
}
return this._hrefCache=s+this.getQuery()+this._fragment;
};_p.getParam=function(sName)
{
return this._params[sName];
};_p.setParam=function(sName,sValue)
{
this._hrefCache=null;return this._params[sName]=String(sValue);
};_p.removeParam=function(sName)
{
this._hrefCache=null;delete this._params[sName];
};_p.getQuery=function()
{
var sb=[];for(var name in this._params)
{
if(this._params[name]!=null)
sb.push(name+"="+encodeURIComponent(this._params[name]));else sb.push(name);
}
return(sb.length>0?"?"+sb.join("&"):"");
};function BiEventTarget(){
BiObject.call(this);this._listeners={
 
};
}
_p=BiEventTarget.prototype=new BiObject;_p._className="BiEventTarget";_p.addEventListener=function(sType,fHandler,oObject){
if(typeof fHandler!="function")
throw new Error(this+" addEventListener: "+fHandler+" is not a function");if(this._listeners[sType]==undefined)
this._listeners[sType]={
 
};var key=BiObject.toHashCode(fHandler)+(oObject?BiObject.toHashCode(oObject):"");this._listeners[sType][key]={
handler:fHandler,object:oObject
};
};_p.removeEventListener=function(sType,fHandler,oObject){
if(this._disposed||this._listeners[sType]==undefined)
return;var key=BiObject.toHashCode(fHandler)+(oObject?BiObject.toHashCode(oObject):"");delete this._listeners[sType][key];
};_p.dispatchEvent=function(oEvent){
if(this._disposed)return;oEvent._target=this;oEvent.initDispatch();this._dispatchEvent(oEvent);return!oEvent._defaultPrevented;
};_p._dispatchEvent=function(oEvent){
if(this._disposed)return;oEvent._currentTarget=this;if(!(oEvent instanceof BiMouseEvent)&&!(oEvent instanceof BiKeyboardEvent)||this.getIsEnabled())
{
var fs=this._listeners[oEvent.getType()];if(fs){
var f,o;for(var hc in fs){
f=fs[hc].handler;o=fs[hc].object;if(typeof f=="function"){
if(typeof o=="object")
{
f.call(o,oEvent);
}
else f.call(this,oEvent);
}
}
}
}
if(oEvent._bubbles&&!oEvent._propagationStopped&&this._parent){
this._parent._dispatchEvent(oEvent);
}
};_p.setAttribute=function(sName,sValue,oXmlResourceParser)
{
if(sName.substring(0,2)=="on")
{
var type=sName.substring(2);this.addEventListener(type,new Function("event",sValue),oXmlResourceParser);
}
else BiObject.prototype.setAttribute.call(this,sName,sValue,oXmlResourceParser);
};_p.dispose=function(){
if(this._disposed)return;BiObject.prototype.dispose.call(this);for(var sType in this._listeners)
this._listeners[sType]=null;this._listeners=null;
};function BiEventManager(){
BiObject.call(this);var oThis=this;this.__onmouseevent=function(e){
return oThis._onmouseevent(e);
};this.__onkeyevent=function(e){
return oThis._onkeyevent(e);
};this.__onselectevent=function(e){
return oThis._onselectevent(e);
};this.__onwindowblur=function(e){
return oThis._onwindowblur(e);
};this.__ondragevent=function(e){
return oThis._ondragevent(e);
};this.__onactivateevent=function(e){
return oThis._onactivateevent(e);
};this.__onresizeevent=function(e){
return oThis._onresizeevent(e);
};this._mozActiveElement=null;
}
var _p=BiEventManager.prototype=new BiObject;_p._className="BiEventManager";_p._lastFocused=null;_p._lastMouseEventType=null;_p._lastMouseEventDate=0;_p._allowBrowserContextMenu=false;BiEventManager.prototype.getAllowBrowserContextMenu=function(){
return this._allowBrowserContextMenu;
};BiEventManager.prototype.setAllowBrowserContextMenu=function(v){
this._allowBrowserContextMenu=v;
};_p.attachToWindow=function(oWindow){
this._window=oWindow;this.attachMouseEvents();this.attachKeyboardEvents();var doc=oWindow.document;doc.body.onselect=doc.onselectstart=doc.onselectionchange=this.__onselectevent;doc.ondragstart=this.__ondragevent;doc.body.onactivate=this.__onactivateevent;oWindow.onblur=this.__onwindowblur;if(BiBrowserCheck.moz)
{
oWindow.addEventListener("resize",this.__onresizeevent,false);
}
};BiEventManager._mouseEventTypes=["mouseover","mousemove","mouseout","mousedown","mouseup","click","dblclick","contextmenu"];if(BiBrowserCheck.ie)
BiEventManager._mouseEventTypes.push("mousewheel");else BiEventManager._mouseEventTypes.push("DOMMouseScroll");_p.attachMouseEvents=function(){
var doc=this._window.document;var types=BiEventManager._mouseEventTypes;if(BiBrowserCheck.ie)
{
for(var i=0;i<types.length;i++)
doc.attachEvent("on"+types[i],this.__onmouseevent);
}
else {
for(var i=0;i<types.length;i++)
doc.addEventListener(types[i],this.__onmouseevent,false);
}
};_p.detachMouseEvents=function(){
var doc=this._window.document;var types=BiEventManager._mouseEventTypes
if(BiBrowserCheck.ie)
{
for(var i=0;i<types.length;i++)
doc.detachEvent("on"+types[i],this.__onmouseevent);
}
else {
if(doc)
for(var i=0;i<types.length;i++)
doc.removeEventListener(types[i],this.__onmouseevent,false);
}
};BiEventManager._keyboardEventTypes=["keydown","keypress","keyup"];_p.attachKeyboardEvents=function(){
var doc=this._window.document;var types=BiEventManager._keyboardEventTypes;if(BiBrowserCheck.ie)
{
for(var i=0;i<types.length;i++)
doc.body.attachEvent("on"+types[i],this.__onkeyevent);
}
else {
for(var i=0;i<types.length;i++)
doc.addEventListener(types[i],this.__onkeyevent,false);
}
};_p.detachKeyboardEvents=function(){
var doc=this._window.document;var types=BiEventManager._keyboardEventTypes;if(BiBrowserCheck.ie)
{
for(var i=0;i<types.length;i++)
doc.body.detachEvent("on"+types[i],this.__onkeyevent);
}
else {
if(doc)
{
for(var i=0;i<types.length;i++)
doc.removeEventListener(types[i],this.__onkeyevent,false);
}
}
};_p._onmouseevent=function(e)
{
if(!e)
e=this._window.event;var type=e.type;if(BiBrowserCheck.ie)
{
if(type=="mouseup"&&(this._lastMouseEventType=="click"||this._lastMouseEventType=="contextmenu"||this._lastMouseEventType=="mouseup")&&new Date-this._lastMouseEventDate<250)
{
this._onmouseevent2(e,"mousedown");
}
else if(type=="dblclick"&&this._lastMouseEventType=="mouseup"&&new Date-this._lastMouseEventDate<250)
{
this._onmouseevent2(e,"click");
}
switch(type){
case"mousedown":case"mouseup":case"click":case"dblclick":case"contextmenu":this._lastMouseEventType=type;this._lastMouseEventDate=(new Date).valueOf();
}
}
else {
switch(type)
{
case"DOMMouseScroll":type="mousewheel";break;case"click":case"dblclick":if(e.button!=BiMouseEvent.LEFT)
return;
}
}
this._onmouseevent2(e,type);
};_p._onmouseevent2=function(e,type)
{
if(type=="contextmenu"&&!this._allowBrowserContextMenu)
{
if(BiBrowserCheck.moz)
e.preventDefault();e.returnValue=false;
}
else if(type=="mousedown"&&BiBrowserCheck.moz)
this._onactivateevent(e);var target;if(this._captureComponent){
target=this._captureComponent;
}
else{
var el=e.target||e.srcElement;while(el!=null&&el._biComponent==null)
el=el.parentNode;if(el==null)return;target=el._biComponent;
}
if(target==null)
return;var enabledAncestor=null;var c=target;while(c)
{
if(!c.getEnabled())
enabledAncestor=null;else if(enabledAncestor==null)
enabledAncestor=c;c=c._parent;
}
target=enabledAncestor;if(target==null)
return;var biEvent=new BiMouseEvent(type,e);BiMouseEvent._storeEventState(biEvent);switch(type)
{
case"mousedown":(new BiPopupManager).hideAutoHiding(target);var tmp=target;while(tmp!=null&&!tmp.getCanFocus())
tmp=tmp._parent;if(tmp!=null&&tmp.getCanFocus())
{
if(BiBrowserCheck.ie)
{
try
{
tmp._element.setActive();
}
catch(ex){
 
}
}
else {
 
}
}
break;case"mouseover":try
{
var tmp=e.relatedTarget||e.fromElement;while(tmp!=null&&tmp._biComponent==null)
tmp=tmp.parentNode;if(tmp&&tmp._biComponent==target)
{
biEvent.dispose();return;
}
}catch(ex){
 
}
break;case"mouseout":try
{
var tmp=e.relatedTarget||e.toElement;while(tmp!=null&&tmp._biComponent==null)
tmp=tmp.parentNode;if(tmp&&tmp._biComponent==target)
{
biEvent.dispose();return;
}
}catch(ex){
 
}
break;
}
var rv=target.dispatchEvent(biEvent);switch(type)
{
case"mouseover":(new BiToolTipManager).handleMouseOver(biEvent);break;case"mouseout":(new BiToolTipManager).handleMouseOut(biEvent);break;case"contextmenu":if(!rv)break;var cm;while(target&&!(cm=target.getContextMenu()))
target=target._parent;if(cm)
{
cm._component=target;cm.setLocation(biEvent.getScreenX(),biEvent.getScreenY());cm._component=target;cm.setVisible(true);
}
break;
}
biEvent.dispose();return rv;
};_p._onkeyevent=function(e)
{
if(!e)
e=this._window.event;var el=this._mozActiveElement||e.target||e.srcElement;while(el!=null&&el._biComponent==null)
el=el.parentNode;if(el==null)return;var target=el._biComponent;while(target&&!target.getEnabled())
target=target._parent;if(target==null)
return;return target.dispatchEvent(new BiKeyboardEvent(e.type,e));
};_p._onactivateevent=function(e){
if(!e)
e=this._window.event
var el=e.target||e.srcElement;while(el!=null&&el._biComponent==null)
el=el.parentNode;if(el==null)return;var target=el._biComponent;while(target!=null&&!target.getCanFocus())
target=target._parent;if(target==null)return;this._setFocusedComponent(target);
};_p._setFocusedComponent=function(oComponent)
{
if(this._lastFocused==oComponent)
return;var blurComp=this._lastFocused;var focusComp=oComponent;while(blurComp&&blurComp._anonymous)
blurComp=blurComp.getParent();while(focusComp&&focusComp._anonymous)
focusComp=focusComp.getParent();if(blurComp==focusComp)
return;if(oComponent)
{
var fr=oComponent.getFocusRoot();fr._activeComponent=oComponent;
}
else if(this._lastFocused)
{
var fr=this._lastFocused.getFocusRoot();fr._activeComponent=null;
}
this._lastFocused=oComponent;(new BiPopupManager).hideAutoHiding(focusComp);if(blurComp)
{
blurComp._focused=false;var e=new BiFocusEvent("focusout");e._relatedTarget=focusComp;blurComp.dispatchEvent(e);
}
if(focusComp)
{
focusComp._focused=true;var e=new BiFocusEvent("focusin");e._relatedTarget=blurComp;focusComp.dispatchEvent(e);
}
if(blurComp)
{
var e=new BiFocusEvent("blur");e._relatedTarget=focusComp;blurComp.dispatchEvent(e);(new BiToolTipManager).handleBlur(e);
}
if(focusComp)
{
var e=new BiFocusEvent("focus");e._relatedTarget=blurComp;focusComp.dispatchEvent(e);(new BiToolTipManager).handleFocus(e);
}
if(BiBrowserCheck.moz&&blurComp)
blurComp._blurComponent();
};_p._onwindowblur=function(e)
{
if(!BiBrowserCheck.moz)
(new BiPopupManager).hideAutoHiding();
};_p._onresizeevent=function(e)
{
var c=this._window.document.body._biComponent;c.dispatchEvent(new BiEvent("resize"));
};_p._onselectevent=function(e){
if(!e)
e=this._window.event;var el=e.target||e.srcElement;while(el!=null&&el._biComponent==null)
el=el.parentNode;if(el==null)return;var target=el._biComponent;if(!target.getCanSelect())
{
if(BiBrowserCheck.moz)
e.preventDefault();e.returnValue=false;
}
};_p._ondragevent=function(e){
if(!e)
e=this._window.event;if((e.target||e.srcElement).tagName=="IMG")
this._onselectevent();
};_p.setCaptureComponent=function(oComponent){
this._captureComponent=oComponent;
};_p.dispose=function(){
if(this._disposed)return;BiObject.prototype.dispose.call(this);if(this._window){
this.detachMouseEvents();this.detachKeyboardEvents();var doc=this._window.document;doc.body.onselect=doc.onselectstart=doc.onselectionchange=doc.ondragstart=doc.body.onactivate=null;this._window.onblur=null;if(BiBrowserCheck.moz)
{
window.removeEventListener("resize",this.__onresizeevent,false);
}
}
this.__onmouseevent=this.__onkeyevent=this.__onselectevent=this.__onwindowblur=this.__ondragevent=this.__onactivateevent=this.__onresizeevent=null;this._mozActiveElement=null;
};_p._mozOnFocus=function(e,c,el)
{
var old=this._mozActiveElement;this._mozActiveElement=el;this._mozUpdateFocusVisuals(el);if(old&&old!=el)
this._mozUpdateFocusVisuals(old);this._setFocusedComponent(c);if(e)
e.stopPropagation();
};_p._mozOnBlur=function(e,c,el)
{
if(this._mozActiveElement==el)
this._mozActiveElement=null;this._mozUpdateFocusVisuals(el);
};_p._mozUpdateFocusVisuals=function(el)
{
if(el==this._mozActiveElement)
el.setAttribute("bi-moz-focused","true");else el.removeAttribute("bi-moz-focused");
};function BiEvent(sType){
BiObject.call(this);this._type=sType;
}
var _p=BiEvent.prototype=new BiObject;_p._className="BiEvent";_p._bubbles=false;_p._propagationStopped=true;_p._defaultPrevented=false;BiEvent.prototype.getType=function(){
return this._type;
};BiEvent.prototype.getTarget=function(){
return this._target;
};BiEvent.prototype.getCurrentTarget=function(){
return this._currentTarget;
};BiEvent.prototype.getBubbles=function(){
return this._bubbles;
};_p.initDispatch=function(){
 
};_p.stopPropagation=function(){
this._propagationStopped=true;
};_p.preventDefault=function(){
this._defaultPrevented=true;
};_p.dispose=function(){
this._target=null;this._currentTarget=null;
};_p.getDefaultPrevented=function(){
return this._defaultPrevented;
};function BiErrorEvent(sType,oException){
BiEvent.call(this,sType);this._exception=oException;
}
var _p=BiErrorEvent.prototype=new BiEvent;_p._className="BiErrorEvent";BiErrorEvent.prototype.getException=function(){
return this._exception;
};_p.dispose=function(){
BiEvent.prototype.dispose.call(this);this._exception=null;
};function BiMouseEvent(sType,oEvent){
BiEvent.call(this,sType);this._event=oEvent;
}
var _p=BiMouseEvent.prototype=new BiEvent;_p._className="BiMouseEvent";_p._bubbles=true;_p._propagationStopped=false;if(BiBrowserCheck.ie)
{
BiMouseEvent.LEFT=1;BiMouseEvent.RIGHT=2;BiMouseEvent.MIDDLE=4;
}
else {
BiMouseEvent.LEFT=0;BiMouseEvent.MIDDLE=1;BiMouseEvent.RIGHT=2;
}
_p.getClientX=function(){
return this._event.clientX;
};_p.getClientY=function(){
return this._event.clientY;
};_p.getScreenX=function(){
return this._event.screenX;
};_p.getScreenY=function(){
return this._event.screenY;
};_p.getOffsetX=function(){
return this.getScreenX()-this.getTarget()._getScreenClientArea().left;
};_p.getOffsetY=function(){
return this.getScreenY()-this.getTarget()._getScreenClientArea().top;
};_p.getCtrlKey=function(){
return this._event.ctrlKey;
};_p.getShiftKey=function(){
return this._event.shiftKey;
};_p.getAltKey=function(){
return this._event.altKey;
};_p.getRelatedTarget=function()
{
var relEl;if(BiBrowserCheck.ie)
{
if(this._type=="mouseover")
relEl=this._event.fromElement;else if(this._type=="mouseout")
relEl=this._event.toElement;
}
else relEl=this._event.relatedTarget;try
{
while(relEl!=null&&relEl._biComponent==null)
relEl=relEl.parentNode;
}
catch(ex)
{
return null;
}
if(relEl==null)
return null;return relEl._biComponent;
};_p.getButton=function(){
return this._event.button;
};_p.getWheelDelta=function()
{
if(BiBrowserCheck.ie)
return this._event.wheelDelta?this._event.wheelDelta/40:0;else {
var v=this._event.detail||0;if(v>1000)
v=3;else if(v< -1000)
v= -3
return-v;
}
};_p.getTarget=function()
{
var el=this._event.target||this._event.srcElement;while(el!=null&&el._biComponent==null)
el=el.parentNode;return el==null?this._target:el._biComponent||this._target;
};_p.preventDefault=function()
{
this._defaultPrevented=true;if(BiBrowserCheck.moz)
this._event.preventDefault();this._event.returnValue=false;
};_p.dispose=function(){
BiEvent.prototype.dispose.call(this);this._event=null;
};BiMouseEvent._storeEventState=function(biEvent)
{
BiMouseEvent._screenX=biEvent.getScreenX();BiMouseEvent._screenY=biEvent.getScreenY();BiMouseEvent._clientX=biEvent.getClientX();BiMouseEvent._clientY=biEvent.getClientY();BiMouseEvent._button=biEvent.getButton();
};BiMouseEvent.getScreenX=function(){
return BiMouseEvent._screenX;
};BiMouseEvent.getScreenY=function(){
return BiMouseEvent._screenY;
};BiMouseEvent.getClientX=function(){
return BiMouseEvent._clientX;
};BiMouseEvent.getClientY=function(){
return BiMouseEvent._clientY;
};BiMouseEvent.getButton=function(){
return BiMouseEvent._button;
};BiMouseEvent._screenX=BiMouseEvent._screenY=BiMouseEvent._clientX=BiMouseEvent._clientY=BiMouseEvent._button=0;if(BiBrowserCheck.moz)
BiMouseEvent._button= -1;function BiKeyboardEvent(sType,oEvent){
BiEvent.call(this,sType);this._event=oEvent;this._keyCode=oEvent.keyCode||oEvent.charCode;
}
var _p=BiKeyboardEvent.prototype=new BiEvent;_p._className="BiKeyboardEvent";_p._bubbles=true;_p._propagationStopped=false;_p.getCtrlKey=function(){
return this._event.ctrlKey;
};_p.getShiftKey=function(){
return this._event.shiftKey;
};_p.getAltKey=function(){
return this._event.altKey;
};_p.getKeyCode=function(){
return this._keyCode;
};_p.preventDefault=function()
{
this._defaultPrevented=true;if(BiBrowserCheck.moz)
this._event.preventDefault();this._event.returnValue=false;if(BiBrowserCheck.ie)
this._event.keyCode=0;
};_p.dispose=function(){
BiEvent.prototype.dispose.call(this);this._event=null;
};BiKeyboardEvent.ENTER=13;BiKeyboardEvent.TAB=9;BiKeyboardEvent.UP=38;BiKeyboardEvent.DOWN=40;BiKeyboardEvent.LEFT=37;BiKeyboardEvent.RIGHT=39;BiKeyboardEvent.SPACE=32;BiKeyboardEvent.SHIFT=16;BiKeyboardEvent.CTRL=17;BiKeyboardEvent.CONTROL=17;BiKeyboardEvent.ALT=18;BiKeyboardEvent.ESC=27;BiKeyboardEvent.F1=112;BiKeyboardEvent.F2=113;BiKeyboardEvent.F3=114;BiKeyboardEvent.F4=115;BiKeyboardEvent.F5=116;BiKeyboardEvent.F6=117;BiKeyboardEvent.F7=118;BiKeyboardEvent.F8=119;BiKeyboardEvent.F9=120;BiKeyboardEvent.F10=121;BiKeyboardEvent.F11=122;BiKeyboardEvent.F12=123;BiKeyboardEvent.DEL=46;BiKeyboardEvent.DELETE=46;BiKeyboardEvent.BACKSPACE=8;BiKeyboardEvent.INSERT=45;BiKeyboardEvent.HOME=36;BiKeyboardEvent.END=35;BiKeyboardEvent.PAGE_UP=33;BiKeyboardEvent.PAGE_DOWN=34;BiKeyboardEvent.NUM_LOCK=144;BiKeyboardEvent.NUMPAD0=96;BiKeyboardEvent.NUMPAD1=97;BiKeyboardEvent.NUMPAD2=98;BiKeyboardEvent.NUMPAD3=99;BiKeyboardEvent.NUMPAD4=100;BiKeyboardEvent.NUMPAD5=101;BiKeyboardEvent.NUMPAD6=102;BiKeyboardEvent.NUMPAD7=103;BiKeyboardEvent.NUMPAD8=104;BiKeyboardEvent.NUMPAD9=105;BiKeyboardEvent.NUMPAD_DIVIDE=111;BiKeyboardEvent.NUMPAD_MULTIPLY=106;BiKeyboardEvent.NUMPAD_MINUS=109;BiKeyboardEvent.NUMPAD_PLUS=107;function BiFocusEvent(sType){
BiEvent.call(this,sType);if(sType=="focusin"||sType=="focusout"){
this._bubbles=true;this._propagationStopped=false;
}
}
var _p=BiFocusEvent.prototype=new BiEvent;_p._className="BiFocusEvent";BiFocusEvent._lastFocused=null;_p.initDispatch=function(){
 
};BiFocusEvent.prototype.getRelatedTarget=function(){
return this._relatedTarget;
};function BiXmlHttp()
{
if(window.XMLHttpRequest)
return new XMLHttpRequest();else if(window.ActiveXObject)
return new ActiveXObject(BiXmlHttp._activeXName);
}
BiXmlHttp.create=function(){
return new BiXmlHttp();
};function BiXmlDocument(){
if(document.implementation&&document.implementation.createDocument)
{
var doc=document.implementation.createDocument("","",null);doc.addEventListener("load",function(e){
this.readyState=4;
},false);doc.readyState=4;return doc;
}
else if(window.ActiveXObject)
return new ActiveXObject(BiXmlDocument._activeXName);
}
BiXmlDocument.create=function(){
return new BiXmlDocument();
};BiXmlDocument._biGetActiveXName=BiXmlHttp._biGetActiveXName=function(sType){
var servers=["MSXML2","Microsoft","MSXML","MSXML3"];var o;for(var i=0;i<servers.length;i++){
try{
o=new ActiveXObject(servers[i]+"."+sType);return servers[i]+"."+sType;
}
catch(ex){
 
};
}
throw new Error("Could not find an installed XML parser");
};if(window.ActiveXObject)
{
BiXmlDocument._activeXName=BiXmlDocument._biGetActiveXName("DomDocument");BiXmlHttp._activeXName=BiXmlHttp._biGetActiveXName("XmlHttp");
}
function BiWebService(){
var el=document.createElement("meta");if(el.addBehavior)
{
el.addBehavior(application.getPath()+""+BiWebService.HTC_PATH);document.getElementsByTagName("head")[0].appendChild(el);return el;
}
throw new Error("Not yet implemented");
}
BiWebService.HTC_PATH="js/biwebservice.htc";BiWebService.create=function(){
return new BiWebService;
};if(window.XMLHttpRequest)
{
XMLDocument.prototype.__realLoad=XMLDocument.prototype.load;XMLDocument.prototype.load=function(sUri)
{
this.readyState=0;this.__realLoad(sUri);
};XMLDocument.prototype.__defineSetter__("onreadystatechange",function(f)
{
if(this._onreadystatechange)
this.removeEventListener("load",this._onreadystatechange,false);this._onreadystatechange=f;if(f)
this.addEventListener("load",f,false);return f;
});XMLDocument.prototype.__defineGetter__("onreadystatechange",function()
{
return this._onreadystatechange;
});XMLDocument.prototype.loadXML=function(s)
{
var doc2=(new DOMParser).parseFromString(s,"text/xml");while(this.hasChildNodes())
this.removeChild(this.lastChild);var cs=doc2.childNodes;var l=cs.length;for(var i=0;i<l;i++)
this.appendChild(this.importNode(cs[i],true));
};BiXmlDocument._mozHasParseError=function(oDoc)
{
return!oDoc.documentElement||oDoc.documentElement.localName=="parsererror"&&oDoc.documentElement.getAttribute("xmlns")=="http://www.mozilla.org/newlayout/xml/parsererror.xml";
};XMLDocument.prototype.__defineGetter__("parseError",function()
{
var hasError=BiXmlDocument._mozHasParseError(this);var res={
errorCode:0,filepos:0,line:0,linepos:0,reason:"",srcText:"",url:""
};if(hasError)
{
res.errorCode= -1;try
{
res.srcText=this.getElementsByTagName("sourcetext")[0].firstChild.data;res.srcText=res.srcText.replace(/\n\-\^$/,"");
}
catch(ex)
{
res.srcText="";
}
try
{
var s=this.documentElement.firstChild.data;var re= /XML Parsing Error\:(.+)\nLocation\:(.+)\nLine Number(\d+)\,Column(\d+)/;var a=re.exec(s);res.reason=a[1];res.url=a[2];res.line=a[3];res.linepos=a[4];
}
catch(ex)
{
res.reason="Uknown";
}
}
return res;
});Node.prototype.__defineGetter__("xml",function()
{
return(new XMLSerializer).serializeToString(this);
});Attr.prototype.__defineGetter__("xml",function()
{
var nv=(new XMLSerializer).serializeToString(this);return this.nodeName+"=\""+nv.replace(/\"/g,"&quot;")+"\"";
});Text.prototype.__defineGetter__("text",function()
{
return this.nodeValue;
});Node.prototype.__defineGetter__("text",function()
{
var cs=this.childNodes;var l=cs.length;var sb=new Array(l);for(var i=0;i<l;i++)
sb[i]=cs[i].text;return sb.join("");
});Node.prototype.selectNodes=function(sExpr)
{
var doc=this.nodeType==9?this:this.ownerDocument;var nsRes=doc.createNSResolver(this.nodeType==9?this.documentElement:this);var xpRes=doc.evaluate(sExpr,this,nsRes,5,null);var res=[];var item;while((item=xpRes.iterateNext()))
res.push(item);return res;
};Node.prototype.selectSingleNode=function(sExpr)
{
var doc=this.nodeType==9?this:this.ownerDocument;var nsRes=doc.createNSResolver(this.nodeType==9?this.documentElement:this);var xpRes=doc.evaluate(sExpr,this,nsRes,9,null);return xpRes.singleNodeValue;
};Node.prototype.transformNode=function(oXsltNode)
{
var doc=this.nodeType==9?this:this.ownerDocument;var processor=new XSLTProcessor();processor.importStylesheet(oXsltNode);var df=processor.transformToFragment(this,doc);return df.xml;
};Node.prototype.transformNodeToObject=function(oXsltNode,oOutputDocument)
{
var doc=this.nodeType==9?this:this.ownerDocument;var outDoc=oOutputDocument.nodeType==9?oOutputDocument:oOutputDocument.ownerDocument;var processor=new XSLTProcessor();processor.importStylesheet(oXsltNode);var df=processor.transformToFragment(this,doc);while(oOutputDocument.hasChildNodes())
oOutputDocument.removeChild(oOutputDocument.lastChild);var cs=df.childNodes;var l=cs.length;for(var i=0;i<l;i++)
oOutputDocument.appendChild(outDoc.importNode(cs[i],true));
};
}
function biExec(sRootPath,sAdfRelPath,bUseCurrentWindow)
{
var left,top,width,height,centered,resizable,fullScreen;var adfPath,adfName;function _toPixel(s,sAxis)
{
if(String(s).indexOf("%")!= -1)
{
var n=Number(s.replace(/\%/g,""));return n/100*(sAxis=="x"?screen.availWidth:screen.availHeight);
}
return s;
}
function _getAttr(el,name,def,tp)
{
var res;if(!el||!el.getAttribute(name))
res=def;else res=el.getAttribute(name);if(tp)
return _toPixel(res,tp);return res;
}
sRootPath=String(sRootPath);sAdfRelPath=String(sAdfRelPath);if(sRootPath.charAt(sRootPath.length-1)!="/")
sRootPath=sRootPath+"/";var re= /([^\/]+\/)?(\w+)(\.[^\/]*)?$/;var ok=re.test(sAdfRelPath);if(ok)
adfName=RegExp.$2;else errorMessage="The ADF argument cannot be parsed";if(/(^http\:)|(^https\:)|(^file\:)|(^\/)/.test(sAdfRelPath)){
adfPath=sAdfRelPath;
}
else{
var curPath=document.location.href;slashIndex=curPath.lastIndexOf("/");curPath=curPath.substring(0,slashIndex);adfPath=curPath+"/"+sAdfRelPath;
}
var uri=sRootPath+"bimain.html?Adf="+encodeURIComponent(adfPath)+";AdfName="+adfName+";Params="+Math.max(0,(arguments.length-3));for(var i=3;i<arguments.length;i++){
uri+=";Param"+(i-3)+"="+encodeURIComponent(arguments[i]);
}
var fs= /^file\:/.test(adfPath);var error=false;var errorMessage="";var xmlHttp=new BiXmlHttp();xmlHttp.open("GET",adfPath,false);try{
xmlHttp.send(null);
}
catch(ex){
error=true;errorMessage="File not found"
}
if(!error)
{
if(fs)
{
var s=String(xmlHttp.responseText).replace(/<\?xml[^\?]*\?>/,"");xmlHttp.responseXML.loadXML(s);
}
else if(xmlHttp.status!=200)
{
error=true;errorMessage=xmlHttp.status+": "+xmlHttp.statusText;
}
}
if(!error)
{
if(xmlHttp.responseXML.parseError.errorCode!=0){
error=true;errorMessage=xmlHttp.responseXML.parseError.reason;
}
}
if(!error)
{
var doc=xmlHttp.responseXML;var n=doc.selectSingleNode("/application/window | /Application/Window");left=_getAttr(n,"left","","x");right=_getAttr(n,"right","","x");top=_getAttr(n,"top","","y");bottom=_getAttr(n,"bottom","","y");width=_getAttr(n,"width","","x");height=_getAttr(n,"height","","y");centered=_getAttr(n,"centered","false")=="true";resizable=_getAttr(n,"resizable","true")!="false";fullScreen=_getAttr(n,"fullScreen","false")=="true";var sw=screen.width;var sh=screen.height;if(right!=""&&width!="")
left=sw-width-right;else if(left!=""&&right!="")
width=sw-left-right;if(bottom!=""&&height!="")
top=sh-height-bottom;else if(top!=""&&bottom!="")
height=sh-top-bottom;if(left==""&&right==""&&centered)
left=(sw-width)/2;if(top==""&&bottom==""&&centered)
top=(sh-height)/2;if(!bUseCurrentWindow)
{
var w=window.open(uri,adfName,"menubar=0,location=0,status=0,toolbar=0,scrollbars=1"+(left?",left="+left:"")+(top?",top="+top:"")+(width?",width="+(width-8):"")+(height?",height="+(height-32):"")+(fullScreen?",fullscreen=1":"")+(resizable?",resizable=1":""),false);w.focus();
}
else {
document.location.href=uri;window.focus();
}
}
else alert(errorMessage);return!error;
}
function BiTextLoader(){
BiEventTarget.call(this);this._xmlHttp=new BiXmlHttp();var oThis=this;this.__onreadystatechange=function(){
oThis._onreadystatechange();
};
}
var _p=BiTextLoader.prototype=new BiEventTarget;_p._className="BiTextLoader";_p._method="GET";_p._async=false;_p._uri=null;_p._user="";_p._password="";_p._loadCount=0;BiTextLoader.load=function(oUri){
var tl=new BiTextLoader;tl.load(oUri);var s=tl.getText();tl.dispose();return s;
};BiTextLoader.prototype.getMethod=function(){
return this._method;
};BiTextLoader.prototype.setMethod=function(v){
this._method=v;
};BiTextLoader.prototype.getUri=function(){
return this._uri;
};BiTextLoader.prototype.getAsync=function(){
return this._async;
};BiTextLoader.prototype.setAsync=function(v){
this._async=v;
};BiTextLoader.prototype.getUser=function(){
return this._user;
};BiTextLoader.prototype.setUser=function(v){
this._user=v;
};BiTextLoader.prototype.getPassword=function(){
return this._password;
};BiTextLoader.prototype.setPassword=function(v){
this._password=v;
};_p.setUri=function(oUri)
{
if(oUri instanceof BiUri)
this._uri=oUri;else this._uri=new BiUri(application.getAdfPath(),oUri);
};_p.load=function(oUri){
this.open("GET",oUri||this._uri,this._async);this.send();
};_p.post=function(oUri,oXmlDocument){
this.open("POST",oUri||this._uri,this._async);this.send(oXmlDocument);
};_p.open=function(sMethod,oUri,bAsync,sUser,sPassword){
this._method=sMethod;this.setUri(oUri);this._async=bAsync!=null?bAsync:true;this._user=sUser;this._password=sPassword;this._xmlHttp.abort();this._xmlHttp.onreadystatechange=this.__onreadystatechange;this._xmlHttp.open(this._method,String(this._uri),this._async,this._user,this._password);
};_p.send=function(oObject){
this._loadCount=0;this._xmlHttp.send(oObject);
};_p.abort=function(){
this._xmlHttp.abort();
};_p.getLoaded=function(){
return this._xmlHttp.readyState==4;
};_p.getLoading=function(){
return this._xmlHttp.readyState<4;
};_p.getText=function(){
return String(this._xmlHttp.responseText);
};_p.getXmlHttp=function(){
return this._xmlHttp;
};_p.getError=function(){
if(this.getUri().getScheme()=="file"){
return this._xmlHttp.status!=0;
}
return this._xmlHttp.status!=200;
};_p.dispose=function(){
if(this._disposed)return;BiEventTarget.prototype.dispose.call(this);this.__onreadystatechange=null;this._xmlHttp.onreadystatechange=function(){
 
};this._xmlHttp=null;
};_p._onreadystatechange=function(){
if(this._xmlHttp.readyState==4)
{
if(this._loadCount==0)
{
this._loadCount++;this.dispatchEvent(new BiEvent("load"));
}
}
};function BiXmlLoader(){
BiTextLoader.call(this);this.addEventListener("load",BiXmlLoader._onLoad);
}
_p=BiXmlLoader.prototype=new BiTextLoader;_p._className="BiXmlLoader";_p.dispose();_p._disposed=false;BiXmlLoader.load=function(oUri){
var xl=new BiXmlLoader();xl.load(oUri);var doc=xl.getDocument();xl.dispose();return doc;
};_p.getDocument=function(){
return this.getXmlHttp().responseXML;
};_p.getError=function(){
return BiTextLoader.prototype.getError.call(this)||this.getDocument().parseError.errorCode!=0;
};BiXmlLoader._onLoad=function(e)
{
var xl=e.getTarget();if(BiBrowserCheck.ie&&xl.getUri().getScheme()=="file"&&!xl.getError())
{
var s=xl.getText();s=s.replace(/<\?xml[^\?]*\?>/,"");var d=xl.getXmlHttp().responseXML;d.loadXML(s);
}
};function BiScriptLoaderQueue(){
BiEventTarget.call(this);this._items=[];
};_p=BiScriptLoaderQueue.prototype=new BiEventTarget;_p._className="BiScriptLoaderQueue";_p._async=true;BiScriptLoaderQueue.prototype.getAsync=function(){
return this._async;
};BiScriptLoaderQueue.prototype.setAsync=function(v){
this._async=v;
};_p._allExecuted=true;_p.add=function(oUri){
this._allExecuted=false;var tl=new BiTextLoader();tl.setUri(oUri);tl.addEventListener("load",this._onProgress,this);this._items.push({
src:oUri,textLoader:tl
});
};_p.addInline=function(sText){
this._allExecuted=false;this._items.push({
text:sText
});
};_p.load=function()
{
if(this._getAllLoaded())
this._onAllLoaded();else {
for(var i=0;i<this._items.length;i++)
{
if(this._items[i].textLoader)
{
this._items[i].textLoader.setAsync(this._async);this._items[i].textLoader.load();
}
}
if(this._getAllLoaded())
this._onAllLoaded();
}
};_p.abort=function(){
for(var i=0;i<this._items.length;i++){
if(this._items[i].textLoader)
this._items[i].textLoader.abort();
}
};_p.getLoaded=function()
{
if(this._allExecuted)
return true;return this._allExecuted&&this._getAllLoaded()
};_p._getAllLoaded=function(){
var items=this._items;var tl;for(var i=0;i<items.length;i++){
tl=items[i].textLoader;if(tl&&!tl.getLoaded())
return false;
}
return true;
};_p.getLoadedCount=function(){
if(this.getLoaded())
return this.getScriptCount();var n=0;var items=this._items;var tl;for(var i=0;i<items.length;i++){
tl=items[i].textLoader;if(!tl||tl.getLoaded())
n++
}
return n;
};_p.getScriptCount=function(){
return this._items.length;
};_p._onProgress=function(e){
if(e.getTarget().getError()){
alert("Error loading file \""+e.getTarget().getUri()+"\"");throw new Error("Error loading file \""+e.getTarget().getUri()+"\"");
}
if(this._getAllLoaded())
this._onAllLoaded();else this.dispatchEvent(new BiEvent("progress"));
};_p._onAllLoaded=function(){
if(this._allExecuted)return;this.dispatchEvent(new BiEvent("progress"));var ok=true;var items=this._items;for(var i=0;i<items.length;i++){
try{
if(items[i].textLoader){
try{
if(window.execScript)
window.execScript(items[i].textLoader.getText());else window.eval(items[i].textLoader.getText());
}
catch(ex){
ok=false;alert("Error in script\n"+"Name: "+ex.name+"\n"+"Number: "+ex.number+"\n"+"Decription: "+ex.description+"\n"+"URI: "+items[i].textLoader.getUri());
}
}
else{
try{
if(window.execScript)
window.execScript(items[i].text);else window.eval(items[i].text);
}
catch(ex){
ok=false;alert("Error in script\n"+"Name: "+ex.name+"\n"+"Number: "+ex.number+"\n"+"Decription: "+ex.description+"\n"+"Text: "+items[i].text);
}
}
}
catch(ex){
ok=false;break;
}
}
if(ok)
{
this._allExecuted=true;this.dispatchEvent(new BiEvent("load"));
}
};_p.dispose=function(){
if(this._disposed)return;BiEventTarget.prototype.dispose.call(this);if(this._items){
for(var i=0;i<this._items.length;i++){
if(this._items[i].textLoader)
this._items[i].textLoader.dispose();this._items[i].textLoader=null;this._items[i].text=null;this._items[i]=null;
}
}
};function BiXmlResourceParser()
{
BiXmlLoader.call(this);this._componentsById={
 
};
}
_p=BiXmlResourceParser.prototype=new BiXmlLoader;_p.dispose();_p._disposed=false;_p._className="BiXmlResourceParser";_p._rootNode=null;BiXmlResourceParser.getClassFromUri=function(oUri)
{
return BiXmlResourceParser.getClassFromDocument(BiXmlLoader.load(oUri));
};BiXmlResourceParser.getClassFromDocument=function(oDoc)
{
return BiXmlResourceParser.getClassFromNode(oDoc.documentElement);
};BiXmlResourceParser.getClassFromNode=function(oNode)
{
if(oNode==null||oNode.nodeType!=1)
return null;var tagName=oNode.tagName;var constr=window["Bi"+tagName]||window[tagName];if(typeof constr=="function")
{
var newConstr=function(){
constr.call(this);this._xmlResourceParser=new BiXmlResourceParser;this._xmlResourceParser.setRootNode(this._rootXmlNode);this._xmlResourceParser.processAttributes(this,this._rootXmlNode);this._xmlResourceParser.processChildNodes(this,this._rootXmlNode);
};var p=newConstr.prototype=new constr;p._rootXmlNode=oNode;p.dispose();p._disposed=false;p.dispose=function()
{
if(this.getDisposed())return;constr.prototype.dispose.call(this);this._xmlResourceParser.dispose();this._rootXmlNode=null;
};p.getComponentById=function(sId)
{
return this._xmlResourceParser.getComponentById(sId);
};p.getXmlResourceParser=function()
{
return this._xmlResourceParser;
};application.addEventListener("dispose",function(){
newConstr.prototype._rootXmlNode=null;newConstr=null;
});return newConstr;
}
throw new Error("BiXmlResourceParser getClassFromNode. Cannot create object from \""+oNode.tagName+"\"");
};_p.fromNode=function(oNode)
{
if(oNode==null||oNode.nodeType!=1)
return null;var id=oNode.getAttribute("id");if(id&&this._componentsById[id])
return this._componentsById[id];var tagName=oNode.tagName;var o;var constr=window["Bi"+tagName]||window[tagName];if(typeof constr=="function")
{
var o=new constr;this.processAttributes(o,oNode);this.processChildNodes(o,oNode);if(id)
this._componentsById[id]=o;return o;
}
throw new Error("BiXmlResourceParser fromNode. Cannot create object from \""+oNode.tagName+"\"");
};_p.processAttributes=function(o,oNode)
{
var attrs=oNode.attributes;var l=attrs.length;var name,value;for(var i=0;i<l;i++)
{
name=attrs[i].nodeName;value=attrs[i].nodeValue;o.setAttribute(name,value,this);
}
};_p.processChildNodes=function(obj,oNode)
{
var tagName=oNode.tagName;var re=new RegExp("^"+tagName+"\\.(.+)$");var cs=oNode.childNodes;var l=cs.length;var fc,s;var emptyRe= /^\s*$/;for(var i=0;i<l;i++)
{
if(re.test(cs[i].tagName))
{
var propertyName=RegExp.$1;var cs2=cs[i].childNodes;var l2=cs2.length;for(var j=0;j<l2;j++)
{
if(cs2[j].nodeType==3)
{
s=cs2[j].data;if(emptyRe.test(s))
continue;obj.setAttribute(propertyName,s,this);break;
}
else {
obj.setProperty(propertyName,this.fromNode(cs2[j]));break;
}
}
}
else obj.addXmlNode(cs[i],this);
}
};_p.getComponentById=function(sId)
{
var o=this._componentsById[sId];if(o)
return o;if(this.getLoaded())
{
var rn=this.getRootNode();var n=rn.selectSingleNode("//*[@id='"+sId+"']");if(!n)
return null;o=this.fromNode(n);if(o)
return o;
}
return null;
};BiXmlResourceParser.prototype.setRootNode=function(v){
this._rootNode=v;
};_p.getRootNode=function()
{
if(this._rootNode)
return this._rootNode;else {
if(this.getLoaded())
return this.getDocument();return null;
}
};_p.getLoaded=function()
{
return this._rootNode!=null||BiXmlLoader.prototype.getLoaded.call(this);
};_p.dispose=function()
{
if(this.getDisposed())return;BiXmlLoader.prototype.dispose.call(this);for(var id in this._componentsById)
{
this._componentsById[id].dispose();this._componentsById[id]=null;
}
this._rootNode=null;
};function BiResourceLoader()
{
BiEventTarget.call(this);this._resources=[];this._resourcesById=[];
}
_p=BiResourceLoader.prototype=new BiEventTarget;_p._className="BiResourceLoader";_p._lastLoaded= -1;_p._lastStarted= -1;_p._count=0;_p._loaded=false;_p.getResourceById=function(sId)
{
if(sId in this._resourcesById)
return this._resourcesById[sId].object;return null;
};_p.addResource=function(sType,oData,sId)
{
var lastRes=this._resources[this._resources.length-1];if((sType=="script"||sType=="inlinescript")&&!(lastRes instanceof BiScriptLoaderQueue))
{
lastRes=new BiScriptLoaderQueue;lastRes.addEventListener("load",this.load,this);lastRes.addEventListener("progress",this._onprogress,this);lastRes.addEventListener("error",this._onerror,this);this._resources.push(lastRes);
}
if(sType=="script")
lastRes.add(oData);else if(sType=="inlinescript")
lastRes.addInline(oData);else {
var item={
name:sType,node:oData,id:sId
};this._resources.push(item);if(sId)
this._resourcesById[sId]=item;
}
this._count++;
};_p._createGeneralObject=function(oItem)
{
var node=oItem.node;if(!this._xmlResourceParser)
{
this._xmlResourceParser=new BiXmlResourceParser;this._xmlResourceParser.setRootNode(node.parentNode);
}
var o=this._xmlResourceParser.fromNode(node);oItem.object=o;oItem.node=null;if(o instanceof BiEventTarget)
{
o.addEventListener("load",this.load,this);o.addEventListener("error",this._onerror,this);
}
if(typeof o.load=="function")
o.load();
};_p.load=function()
{
if(this._loaded)return;var allLoaded=true;if(this._lastStarted== -1)
{
allLoaded=false;this._lastStarted=0;this._startLoad(this._resources[0]);
}
else {
for(var i=this._lastStarted;i<this._resources.length;i++)
{
var obj=this._resources[i];if(this._isLoaded(obj))
{
this._lastLoaded=i;this._removeListeners(obj);this._onprogress();continue;
}
else {
if(i==this._lastStarted)
{
allLoaded=false;break;
}
this._lastStarted=i;this._startLoad(obj);if(!this._isLoaded(obj))
{
allLoaded=false;break;
}
else {
this._lastLoaded=i;this._removeListeners(obj);this._onprogress();
}
}
}
}
if(allLoaded)
this._onAllLoaded();
};_p._startLoad=function(obj)
{
if(obj instanceof BiScriptLoaderQueue)
obj.load();else this._createGeneralObject(obj);
};_p._isLoaded=function(obj)
{
if(obj instanceof BiScriptLoaderQueue)
return obj.getLoaded();else if(obj.object==null)
return false;else if(typeof obj.object.getLoaded=="function")
return obj.object.getLoaded();else return true;
};_p._removeListeners=function(obj)
{
if(obj instanceof BiScriptLoaderQueue)
{
obj.removeEventListener("load",this.load,this);obj.removeEventListener("progress",this._onprogress,this);obj.removeEventListener("error",this._onerror,this);
}
else if(obj.object!=null&&obj.object instanceof BiEventTarget)
{
obj.object.removeEventListener("load",this.load,this);obj.object.removeEventListener("error",this._onerror,this);
}
};_p.abort=function()
{
var items=this._resources;var l=items.length;for(var i=0;i<l;i++)
{
if(items[i]instanceof BiScriptLoaderQueue)
items[i].abort()
else if(items[i].object&&typeof items[i].object.abort=="function")
items[i].object.abort();
}
};_p.getLoaded=function()
{
return this._lastLoaded==this._resources.length-1;
};_p.getLoadedCount=function()
{
var n=0;var items=this._resources;var l=items.length;for(var i=0;i<l;i++)
{
if(items[i]instanceof BiScriptLoaderQueue)
n+=items[i].getLoadedCount();else if(this._isLoaded(items[i]))
n++;
}
return n;
};_p.getCount=function()
{
return this._count;
};_p.dispose=function()
{
if(this._disposed)return;BiEventTarget.prototype.dispose.call(this);var item;for(var i=this._resources.length-1;i>=0;i--)
{
item=this._resources[i];if(item instanceof BiScriptLoaderQueue)
item.dispose();else if(item.object&&typeof item.object.dispose=="function")
item.object.dispose();item.object=null;item.uri=null;item.constr=null;
}
this._resources=null;this._resourcesId=null;
};_p._onprogress=function()
{
if(this._loaded)return;this.dispatchEvent(new BiEvent("progress"));
};_p._onerror=function(e)
{
var t=e.getTarget();throw new Error("Error loading "+t+"\nURI: "+t.getUri());
};_p._onAllLoaded=function()
{
if(this._loaded)return;this._loaded=true;this._onprogress();this.dispatchEvent(new BiEvent("load"));
};function LoadingStatus()
{
this._element=document.createElement("DIV");this._element.className="bi-loading-status";this._htmlElement=document.createElement("DIV");this._htmlElement.className="bi-loading-status-html";this._element.appendChild(this._htmlElement);this._textElement=document.createElement("DIV");this._textElement.className="bi-loading-status-text";this._element.appendChild(this._textElement);this._pbElement=document.createElement("DIV");this._pbElement.className="bi-loading-status-progress-bar";this._element.appendChild(this._pbElement);this._fillElement=document.createElement("DIV");this._pbElement.appendChild(this._fillElement);document.body.appendChild(this._element);var oThis=this;this._onresize=function(){
oThis.fixSize();
};if(BiBrowserCheck.ie)
window.attachEvent("onresize",this._onresize);else window.addEventListener("resize",this._onresize,false);this.fixSize();this.setHtmlText(LoadingStatus._defaultHtml);
}
_p=LoadingStatus.prototype;_p.dispose=function(nValue)
{
if(this._disposed)return;if(BiBrowserCheck.ie)
window.detachEvent("onresize",this._onresize);else window.removeEventListener("resize",this._onresize,false);this._element.style.filter="none";if(document.body&&!(application&&application._disposed))
document.body.removeChild(this._element);this._element=this._htmlElement=this._fillElement=this._onresize=null;this._disposed=true;
};_p.setValue=function(nValue)
{
this._fillElement.style.width=(nValue==null?"10":nValue)+"%";
};_p.setText=function(s)
{
while(this._textElement.hasChildNodes())
this._textElement.removeChild(this._textElement.lastChild);this._textElement.appendChild(document.createTextNode(s));
};_p.fixSize=function()
{
this._element.style.left=Math.max(0,(document.body.clientWidth-this._element.offsetWidth)/2)+"px";this._element.style.top=Math.max(0,(document.body.clientHeight-this._element.offsetHeight)/2)+"px";
};_p.setHtmlText=function(sHtml,sStyle)
{
if(typeof application!="undefined")
{
sHtml=sHtml.replace("%VERSION%",application.getVersion());
}
this._htmlElement.innerHTML=sHtml;if(sStyle)
this._htmlElement.style.cssText=sStyle;
};_p.setStyle=function(sStyle)
{
if(!/visibility/i.test(sStyle)&&this._element.style.visibility!="")
{
sStyle="visibility:"+this._element.style.visibility+";"+sStyle;
}
this._element.style.cssText=sStyle;this.fixSize();
};_p.setStatusTextStyle=function(sStyle)
{
if(sStyle)
this._textElement.style.cssText=sStyle;
};_p.setProgressBarStyle=function(sStyle)
{
if(sStyle)
this._pbElement.style.cssText=sStyle;
};_p.setVisible=function(b)
{
this._element.style.visibility=b?"visible":"hidden";
};LoadingStatus._defaultHtml='<div style="position:absolute;top: 5px;left:10px;width:280px;"><h1 style="font-size:350%;margin:0;">Bindows&#8482;</h1><p style="font-size:80%;margin:5px 0;">Bindows&#8482; belongs to MB Technologies (Georgia, USA). All rights reserved. You are not allowed to copy or modify this code. Commercial use requires license.</p></div>'+'<div style="position:absolute;bottom:5px;left:10px">Version %VERSION%</div>'+'<div style="position:absolute;bottom:5px;right:10px">&#x00A9; 2003-2004 MB Technologies Inc.</div>';function BiAdf()
{
BiXmlLoader.call(this);this._async=true;this._caption="";this._scripts=[];this._xmlResourceParser=new BiXmlResourceParser;
}
_p=BiAdf.prototype=new BiXmlLoader;_p._className="BiAdf";_p.dispose();_p._disposed=false;BiAdf.prototype.getCaption=function(){
return this._caption;
};BiAdf.prototype.setCaption=function(v){
this._caption=v;
};BiAdf.prototype.getXmlResourceParser=function(){
return this._xmlResourceParser;
};_p._interpret=function()
{
var doc=this.getDocument();var node=doc.selectSingleNode("/application/window/@caption | /Application/Window/@caption");if(node)
{
this._caption=String(node.text);document.title=this._caption;
}
this._createSplashScreen();
};_p._addResources=function()
{
var doc=this.getDocument();var n=doc.selectSingleNode("/application/resources | /Application/Resources");if(n)
{
var nl=n.childNodes;var l=nl.length;var uri;var rl=application.getResourceLoader();for(var i=0;i<l;i++)
{
if(nl[i].nodeType!=1)
continue;uri=nl[i].getAttribute("uri")||nl[i].getAttribute("src");if(nl[i].tagName=="script"||nl[i].tagName=="Script")
{
if(uri)
rl.addResource("script",uri);else if(nl[i].text!="")
{
rl.addResource("inlinescript",nl[i].text);
}
}
else rl.addResource(nl[i].tagName,nl[i],nl[i].getAttribute("id"));
}
}
};_p._createSplashScreen=function()
{
var doc=this.getDocument();var el=doc.selectSingleNode("/application/splashScreen | /Application/SplashScreen");application._loadStatus.setVisible(true);if(el&&application._loadStatus&&!application._loadStatus._disposed)
{
if(el.getAttribute("style"))
application._loadStatus.setStyle(el.getAttribute("style"));var html=el.selectSingleNode("html | Html");if(html)
{
var style=html.getAttribute("style");var cs=html.childNodes;var l=cs.length;var sb=new Array(l);for(var i=0;i<l;i++)
sb.push(cs[i].xml);application._loadStatus.setHtmlText(sb.join(""),style);
}
var pb=el.selectSingleNode("progressBar | ProgressBar");if(pb&&pb.getAttribute("style"))
application._loadStatus.setProgressBarStyle(pb.getAttribute("style"));var st=el.selectSingleNode("statusText | StatusText");if(st&&st.getAttribute("style"))
application._loadStatus.setStatusTextStyle(st.getAttribute("style"));
}
};_p.parseXmlResources=function()
{
var doc=this.getDocument();var windowEl=doc.selectSingleNode("/application/window | /Application/Window");if(!windowEl)
return;this._xmlResourceParser.setRootNode(windowEl);var win=application.getWindow();var adfAttrs=["left","right","top","bottom","width","height","centered","resizable","fullScreen"];var adfAttrsSet={
 
};for(var i=0;i<adfAttrs.length;i++)
adfAttrsSet[adfAttrs[i]]=true;var attrs=windowEl.attributes;for(var i=0;i<attrs.length;i++)
{
if(!(attrs[i].nodeName in adfAttrsSet))
win.setAttribute(attrs[i].nodeName,attrs[i].nodeValue,this._xmlResourceParser);
}
var cs=windowEl.childNodes;var l=cs.length;for(var i=0;i<l;i++)
{
win.addXmlNode(cs[i],this._xmlResourceParser);
}
};function BiApplication(){
if(typeof application=="object")
return application;BiEventTarget.call(this);this._progressStatus="";this._coreScriptFiles=[];this._adf=new BiAdf;
}
var _p=BiApplication.prototype=new BiEventTarget;_p._className="BiApplication";_p._version=1.10;BiApplication.prototype.getVersion=function(){
return this._version;
};_p.start=function(){
this.addEventListener("progressstatus",this._onprogressstatus);this._loadStatus=new LoadingStatus();this._loadStatus.setValue(2);if(arguments.length!=0)
this._buildArgumentsMapFromArguments(arguments);this._loadAdf();this._onunload=function(){
application.dispose();
};if(BiBrowserCheck.ie)
window.attachEvent("onunload",this._onunload);else window.addEventListener("unload",this._onunload,false);
};_p.getProtocol=function(){
throw new Error("Depreciated! Use getUri().getScheme() instead");
};_p._uri=new BiUri(document.location.href);_p._uriParams=new BiUri(document.location.href);_p._systemRootPath=new BiUri(document.location.href,"./");_p.getPath=function(){
return this._systemRootPath;
};_p.getAdfPath=function(){
if(this._adfPath)
return this._adfPath;var p=this._uriParams.getParam("Adf");return this._adfPath=new BiUri(p,"./");
};BiApplication.prototype.getProgressStatus=function(){
return this._progressStatus;
};BiApplication.prototype.setProgressStatus=function(v){
this._progressStatus=v;
};BiApplication.prototype.getWindow=function(){
return this._window;
};BiApplication.prototype.getAdf=function(){
return this._adf;
};BiApplication.prototype.getUri=function(){
return this._uri;
};_p._buildArgumentsMapFromArguments=function(oArguments)
{
var adfName="";var adfPath;var a0=oArguments[0];if(a0.charAt(a0.length-1)!="/")
a0+="/";this._systemRootPath=String(new BiUri(this._uri,a0));var re= /([^\/]+\/)?(\w+)(\.[^\/]*)?$/;var ok=re.test(oArguments[1]);if(ok)
adfName=RegExp.$2;else this._reportError("The ADF argument is incorrect");adfPath=String(new BiUri(this._uri,oArguments[1]));var uri=this._uriParams;uri.setParam("AdfName",adfName);uri.setParam("Adf",adfPath);uri.setParam("Params",oArguments.length-1);for(var i=2;i<oArguments.length;i++){
uri.setParam("Param"+(i-2),oArguments[i]);
}
};_p._loadAdf=function(){
this._progressStatus="Loading Application Description File";this.dispatchEvent(new BiEvent("progressstatus"));this._resourceLoader=new BiResourceLoader;this._adf.addEventListener("load",this._onAdfLoaded,this);var adf=this._uriParams.getParam("Adf");if(adf!=null)
this._adf.load(adf);else{
this._reportError("No ADF specified");
}
};_p._onAdfLoaded=function(){
this._progressStatus="Application Description File Loaded";this.dispatchEvent(new BiEvent("progressstatus"));if(this._adf.getError()){
this._reportError("Error loading ADF","Error loading ADF\n"+"URI: "+this._uriParams.getParam("Adf")+"\nStatus: "+this._adf.getXmlHttp().status+", "+this._adf.getXmlHttp().statusText);
}
else{
this._adf._interpret();window.setTimeout("application._loadResources()",1);
}
};_p.getResourceLoader=function()
{
if(this._resourceLoader==null)
return null;return this._resourceLoader;
};_p.getResourceById=function(sId)
{
if(this._resourceLoader==null)
return null;return this._resourceLoader.getResourceById(sId);
};_p.getComponentById=function(sId)
{
if(this._adf&&this._adf.getXmlResourceParser())
return this._adf.getXmlResourceParser().getComponentById(sId);return null;
};_p._loadResources=function(){
var systemRootPath=this.getPath();for(var i=0;i<this._coreScriptFiles.length;i++)
this._resourceLoader.addResource("script",new BiUri(systemRootPath,this._coreScriptFiles[i]));this._adf._addResources();this._resourceLoader.addEventListener("progress",this._onprogressstatus,this);this._resourceLoader.addEventListener("load",this._onResourcesLoaded,this);this._progressStatus="Loading Resources";this._resourceLoader.load();
};_p._onprogressstatus=function(e){
if(!this._resourceLoader||this._resourceLoader.getCount()==0)
this._loadStatus.setValue(5);else{
this._loadStatus.setValue(Math.max(5,Math.min(95,this._resourceLoader.getLoadedCount()/this._resourceLoader.getCount()*100)));this._progressStatus="Loading Resources ("+this._resourceLoader.getLoadedCount()+"/"+this._resourceLoader.getCount()+")";
}
this._loadStatus.setText(this.getProgressStatus());
};_p._onResourcesLoaded=function(e){
this._loadStatus.setText("Loading completed");this._loadStatus.setValue(100);this._window=new BiApplicationWindow;this._window._create();this._adf.parseXmlResources();var appClassName=this._uriParams.getParam("AdfName");window.setTimeout("application._onResourcesLoaded2(\""+appClassName+"\")",1);
};_p._onResourcesLoaded2=function(appClassName)
{
var uri=this._uriParams;var argc=Number(uri.getParam("Params"));var argv=new Array(argc);for(var i=0;i<argc;i++)
argv[i]=uri.getParam("Param"+i);if(application._loadStatus){
application._loadStatus.dispose();application._loadStatus=null;
}
window.focus();if(window[appClassName]&&typeof window[appClassName].main=="function")
{
window[appClassName].main.apply(window[appClassName],argv);
}
appClassName=null;argv=null;
};_p._reportError=function(s,s2){
if(this._loadStatus)
this._loadStatus.setText(s);throw new Error(s2||s);
};_p.dispose=function(){
this.dispatchEvent(new BiEvent("dispose"));if(this._disposed)return;BiEventTarget.prototype.dispose.call(this);if(BiBrowserCheck.ie)
window.detachEvent("onunload",this._onunload);else window.removeEventListener("unload",this._onunload,false);if(this._window)
this._window.dispose();this._window=null;if(this._loadStatus)
this._loadStatus.dispose();this._loadStatus=null;if(this._resourceLoader)
this._resourceLoader.dispose();this._resourceLoader=null;this._adf.dispose();this._adf=null;this._onunload=null;
};application=new BiApplication;application._coreScriptFiles_ie=["js/coreclasses.js","js/guicomponents.js","js/gauge.ie.js","js/menu.ie.js","js/window.js","js/grids.js","js/databinding.js","js/chartingbase.js","js/charting.js","js/charting2.js"];application._coreScriptFiles_moz=["js/coreclasses.js","js/guicomponents.js","js/menu.moz.js","js/window.js","js/grids.js","js/databinding.js","js/chartingbase.js","js/charting2.js"];if(BiBrowserCheck.ie)
application._coreScriptFiles=application._coreScriptFiles_ie;else application._coreScriptFiles=application._coreScriptFiles_moz;
