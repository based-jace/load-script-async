/**
    * Replaces html on page with given html, executing scripts in the process.
    * @author: footjohnson
    * 
    * @param {string} html Html to replace current html
    * @param {HTMLElement} domLocation Node whose html should be replaced
    * 
    * @returns {boolean} True if success; false if failure
*/
function ReplaceHtml(html, domLocation){
    try{
        const dp = new DOMParser();
        const doc = dp.parseFromString(html.toString(), "text/html");
        domLocation.innerHTML = html;
        
        scripts = doc.getElementsByTagName("script");

        for(i in scripts){
            const script = scripts[i];
            domLocation.appendChild(script);
        };

        const scriptSets = ExtractScripts(html);
        ExecuteScripts(scriptSets, domLocation);
    }
    catch(e){
        console.log(e);
        return false;
    }
    return true;
}

/**
    * Executes scripts returned from asynchronous html responses 
    * (so I never have to use jQuery again) and places html on DOM
    * @author: footjohnson
    * 
    * @param {Array<HTMLElement>} rawScripts Scripts to execute (via DOM placement)
    * @param {HTMLElement} domLocation Where to place scripts on page
    * 
    * @returns {boolean} returns true if success or false if failure 
    * 
    * @TODO Actually link this shit up
*/
function ExecuteScripts(scripts, domLocation){
    try{
        for(i in scripts){
            const scriptCouple = scripts[i];
            const script = scriptCouple[0];
            const isSrc = scriptCouple[1];
            const s = document.createElement("script");
            if(isSrc){
                s.type = "text/javascript";
                s.src = script;
            }
            else{
                const t = document.createTextNode(script);
                console.log(script);
                
                s.appendChild(t);
            }
            domLocation.appendChild(s);
        }
    } 
    catch (e){
        console.log(e);
        return false;
    }
    return true;
}

/**
    * Pulls scripts from given html
    * 
    * @param {string} html The html that you want to execute the scripts from
    * @returns {[[string, boolean]]} Index 1 contains scripts/src values; 
    * index 2 states whether it's a src (true) or an embedded script (false)
*/
function ExtractScripts(html){
    const scripts = [[,]]; // Index 1 contains scripts/src values; 
                             // index 2 states whether it's a src (true) or an embedded script (false)

    // js file extensions
    const jsExts = ["js", "ts", "es", "es6", "ls", "sjs", "eg", "json",
                         "json5", "cs", "coffee", "coffee.md", "mjs"]

    // Initial match for script src
    let srcRegEx = "";
    // To test when dividing scripts by src or embedded
    let testSrcRegEx = "";
    // Removes the "<script" fluff before the src path/url
    let rmSrcBeginning = /(?!<script.*src=)["'].*/ui;

    // Initial match for embedded script
    const embedRegEx = /<script>[\s\S]*?<\/script>/gui;
    // Only grabs actual script content (plus wrapping carats)
    const embedScriptContent = />+?[\s\S]*</ui;

    // Creates srcRegEx
    for(i = 0; i < jsExts.length; i++){
        srcRegEx += `<script.*src=["'].*.${jsExts[i]}["']?`;
        if(i != jsExts.length - 1){
            srcRegEx += "|";
        }
    }

    srcRegEx = new RegExp(srcRegEx, "gui");

    // Creates testSrcRegEx
    for(i = 0; i < jsExts.length; i++){
        testSrcRegEx += `^<script.*src=["'].*.${jsExts[i]}["'](?!.*<)`;
        if(i != jsExts.length - 1){
            testSrcRegEx += "|";
        }
    }
    testSrcRegEx = new RegExp(testSrcRegEx, "ui");

    const combinedRegEx = new RegExp("(" + srcRegEx.source + ")|(" + embedRegEx.source + ")", "gui");
    const rawScripts = html.toString().match(combinedRegEx);

    for(i in rawScripts){
        let script = rawScripts[i];
        const testScript = script.match(testSrcRegEx);

        let isSrc;

        if(testScript){ // If a script src
            script = testScript.toString().match(rmSrcBeginning).toString();
            isSrc = true;
        }
        else{
            script = script.match(embedScriptContent).toString();
            script = script.replace(/\s+/g, " ");
            isSrc = false;
        }
        script = script.trim().substring(1, script.length - 1).toString();
        scripts.push([script, isSrc]);
    }
    
    return(scripts);
}

// This was a test
// v  v  v  v  v  v  v
// fetch("/products/", {
//     headers: {
//         "X-Requested-With": "XMLHttpRequest"
//     }
// })
// .then((response)=>{
//     return response.text();
// })
// .then(html=>{
//     let dp = new DOMParser();
//     let h = dp.parseFromString(html, "text/html");

//     ReplaceHtml(html, document.getElementsByClassName("main-cont")[0]);
// });
