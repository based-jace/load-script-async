<a name="loadScriptAsync"></a>

## loadScriptAsync
Allows loading html, including scripts - similar
to jQuery's ".html()"

https://www.danielcrabtree.com/blog/25/gotchas-with-dynamically-adding-script-tags-to-html <br/> and <br/>
https://stackoverflow.com/questions/8097026/how-to-run-javascript-in-html-loaded-via-ajax/8097325#8097325
<br/> used as a reference - thanks guys!

**Kind**: global class  
**Author:**: footjohnson  

* [loadScriptAsync](#loadScriptAsync)
    * [.ReplaceHtml(html, domLocation)](#loadScriptAsync+ReplaceHtml) ⇒ <code>boolean</code>
    * [.CheckForScripts(node)](#loadScriptAsync+CheckForScripts) ⇒ <code>boolean</code>
    * [.PlaceElems(element, domLocation, checkScripts, isHead)](#loadScriptAsync+PlaceElems) ⇒ <code>boolean</code>

<a name="loadScriptAsync+ReplaceHtml"></a>

### loadScriptAsync.ReplaceHtml(html, domLocation) ⇒ <code>boolean</code>
Replaces html on page with given html, executing scripts in the process.

**Kind**: instance method of [<code>loadScriptAsync</code>](#loadScriptAsync)  
**Returns**: <code>boolean</code> - True if success; false if failure  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>string</code> | Html to replace current html |
| domLocation | <code>HTMLElement</code> | Node whose html should be replaced |

**Example**  
```js
// html should be stringified HTML
// domLocation would be given via something like document.getElementById("elementId");
// returns true
loadScriptAsync.ReplaceHtml(html, domLocation)
```
<a name="loadScriptAsync+CheckForScripts"></a>

### loadScriptAsync.CheckForScripts(node) ⇒ <code>boolean</code>
Checks if there are any script tags in the node

**Kind**: instance method of [<code>loadScriptAsync</code>](#loadScriptAsync)  
**Returns**: <code>boolean</code> - True if it contains scripts; false if it doesn't  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | Node to check for scripts |

**Example**  
```js
// Returns whether a node or HTMLElement has script tags as children or grandchildren
// returns true
loadScriptAsync.CheckForScripts(node)
```
<a name="loadScriptAsync+PlaceElems"></a>

### loadScriptAsync.PlaceElems(element, domLocation, checkScripts, isHead) ⇒ <code>boolean</code>
Recursively places html elements on the DOM

**Kind**: instance method of [<code>loadScriptAsync</code>](#loadScriptAsync)  
**Returns**: <code>boolean</code> - True if success; false if failure  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> |  | Element whose children should be placed on the DOM |
| domLocation | <code>Node</code> |  | Where to put the elements |
| checkScripts | <code>boolean</code> | <code>true</code> | If the function should first check if any scripts tags                      are within the given elems. If there are, use innerHTML instead |
| isHead | <code>boolean</code> | <code>false</code> | If html should be placed in the head of the document (not yet supported) |

**Example**  
```js
// returns true
loadScriptAsync.PlaceElems()
```
