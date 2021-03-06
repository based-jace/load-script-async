"use strict";

/**
 * Allows loading html, including scripts - similar
 * to jQuery's ".html()"
 * 
 * @author: footjohnson
 */
class loadScriptAsync{
    /**
        * Replaces html on page with given html, executing scripts in the process.
        * 
        * @example
        * // html should be stringified HTML
        * // domLocation would be given via something like document.getElementById("elementId");
        * // returns true
        * loadScriptAsync.ReplaceHtml(html, domLocation)
        * 
        * @param {string} html Html to replace current html
        * @param {HTMLElement} domLocation Node whose html should be replaced
        * 
        * @returns {boolean} True if success; false if failure
    */
    ReplaceHtml(html, domLocation){
        try{
            const dp = new DOMParser();
            // parses html from DOM
            const doc = dp.parseFromString(html, "text/html");

            // Clears current element given by "domLocation"
            // Clones the dom location
            const domLocationCopy = domLocation.cloneNode(false);
            // Clears the given section of the dom
            domLocation.parentNode.replaceChild(domLocationCopy, domLocation);

            this.PlaceElems(doc.head, domLocationCopy, true);
            this.PlaceElems(doc.body, domLocationCopy, true);
        }
        catch(e){
            console.log(e);
            return false;
        }
        return true;
    }

    /**
     * Checks if there are any script tags in the node
     * 
     * @example
     * // Returns whether a node or HTMLElement has script tags as children or grandchildren
     * // returns true
     * loadScriptAsync.CheckForScripts(node)
     * 
     * @param {Node} node Node to check for scripts
     * 
     * @returns {boolean} True if it contains scripts; false if it doesn't
     */
    CheckForScripts(node){
        return (node.innerHTML.match(/<script[\s\S]*?>[\s\S]*?<\/script>/ui) ? true : false);
    }

    /**
     * Recursively places html elements on the DOM
     * 
     * @param {HTMLElement} element Element whose children should be placed on the DOM
     * @param {Node} domLocation Where to put the elements
     * @param {boolean} checkScripts If the function should first check if any scripts tags
     *                      are within the given elems. If there are, use innerHTML instead
     * @param {boolean} isHead If html should be placed in the head of the document (not yet supported)
     * 
     * @example
     * // returns true
     * loadScriptAsync.PlaceElems()
     * 
     * @returns {boolean} True if success; false if failure
     */
    PlaceElems(element, domLocation, checkScripts = true, isHead = false){
        // Checks if elems contain scripts. If not, just user innerHTML
        // Inspired by jQuery
        if(checkScripts){
            if(!this.CheckForScripts(element)){
                domLocation.innerHTML += element.innerHTML;
                return true;
            }
        }
        
        const elems = element.childNodes; // the element's nodes 
        for(let elem of elems){    
            if(elem.tagName === "SCRIPT"){ // If element is a script
                const script = document.createElement("script"); // Creates a new script element
                const src = elem.src; // Grabs src, if it exists
                if(src && src !== ""){ // If src script
                    script.src = src; // Sets src
                }
                else{ // If embedded script
                    const code = document.createTextNode(elem.innerHTML); // Creates text node
                    script.appendChild(code); // Puts embedded code inside of it
                }
                domLocation.appendChild(script); // Adds script to document
            }
            else{ // If not a script
                try{
                    // If elem contains child elements ()
                    if(elem.children !== undefined){ // If elem has the "children" property (if elem is not a textNode)
                        const elemCopy = elem.cloneNode(false); // Clone the element
                        domLocation.appendChild(elemCopy); // Append the childless element to the DOM
                        
                        // Recurse with the elems child nodes and 
                        this.PlaceElems(elem, elemCopy, isHead,  false);
                    }
                    else{ // If element is a text node
                        domLocation.appendChild(elem.cloneNode(true));
                    }
                }
                catch(e){
                    console.log(e);
                    return false;
                }
            }
        }
        return true;
    }
}
