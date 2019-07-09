<a name="loadScriptAsync"></a>

## loadScriptAsync
Allows loading html, including scripts - similarto jQuery's ".html()"

**Kind**: global class  
**Author:**: footjohnson  

* [loadScriptAsync](#loadScriptAsync)
    * [.ReplaceHtml(html, domLocation)](#loadScriptAsync+ReplaceHtml) ⇒ <code>boolean</code>
    * [.CheckForScripts(node)](#loadScriptAsync+CheckForScripts) ⇒ <code>boolean</code>
    * [.PlaceElems(elems, domLocation)](#loadScriptAsync+PlaceElems) ⇒ <code>boolean</code>

<a name="loadScriptAsync+ReplaceHtml"></a>

### loadScriptAsync.ReplaceHtml(html, domLocation) ⇒ <code>boolean</code>
Replaces html on page with given html, executing scripts in the process.

**Kind**: instance method of [<code>loadScriptAsync</code>](#loadScriptAsync)  
**Returns**: <code>boolean</code> - True if success; false if failure  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>string</code> | Html to replace current html |
| domLocation | <code>HTMLElement</code> | Node whose html should be replaced |

<a name="loadScriptAsync+CheckForScripts"></a>

### loadScriptAsync.CheckForScripts(node) ⇒ <code>boolean</code>
Checks if there are any script tags in the node

**Kind**: instance method of [<code>loadScriptAsync</code>](#loadScriptAsync)  
**Returns**: <code>boolean</code> - True if it contains scripts; false if it doesn't  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | Node to check for scripts |

<a name="loadScriptAsync+PlaceElems"></a>

### loadScriptAsync.PlaceElems(elems, domLocation) ⇒ <code>boolean</code>
Recursively places html elements on the DOM

**Kind**: instance method of [<code>loadScriptAsync</code>](#loadScriptAsync)  
**Returns**: <code>boolean</code> - True if success; false if failure  

| Param | Type | Description |
| --- | --- | --- |
| elems | <code>HTMLCollection</code> | Elements to place on DOM |
| domLocation | <code>Node</code> | Where to put the elements |

