// ==UserScript==
// @name         SteamMonkey
// @namespace    http://monkeytype.com/
// @version      0.1
// @description  togglable custom style for monkeytype to shrink to steamdeck screen size
// @author       n3k0lai
// @match        https://monkeytype.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=monkeytype.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // chroma config
    let useChromaKey = false;
    let chromaKey = '#0c141b';
    let chromaHeight = '370px';

    // Custom Style that goes to head
    let customPageStyle = `
    #deckToggleButton {
        position: relative;
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        background: #333;
        color: #fff;
        cursor: pointer;
    }
    #chromaBtn {
        position: relative;
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        background: #333;
        color: #fff;
        cursor: pointer;
        display: none
    }
    body.steamdeck #chromaBtn {
        display: inline-block;
    }
    #chromaBtn.active,
    #deckToggleButton.active {
        color: var(--main-color);
    }
    body.steamdeck .pageTest.active {
        display: flex !important;
    }
    body.steamdeck .pageTest.active #testConfig {
        margin-top: 30px;
    }
    body.steamdeck .pageTest.active #testConfig .row {
        flex-direction: column !important;
    }
    body.steamdeck footer {
        background-color: transparent;
        width: 100%;
        height: 0px;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    body.steamdeck.chroma footer {
        background-color: ${chromaKey};
        height: ${chromaHeight};
    }
    body.steamdeck.chroma #commandLineWrapper {
        background-color: transparent;
    }
    body.steamdeck footer .keyTips {
        position: fixed;
        top: 30px;
        left: 480px;
    }
    body.steamdeck footer .leftright {
        display: none;
    }
    body.steamdeck footer #commandLineMobileButton {
        position: fixed;
        top: 235px;
        left: 45px;
    }
    `;

    // add hardcoded style to the page
    let styleElement = document.createElement('style');
    styleElement.id = 'customStyleElement';
    styleElement.textContent = customPageStyle;
    document.head.appendChild(styleElement);

    // replace #bottom .keyTips with new content
    let keyTips = document.createElement('div');
    keyTips.className = 'keyTips';
    keyTips.innerHTML = `<key>tab</key> + <key>enter</key> - restart test<br>
    <key>steam</key>+<key>left dpad</key> - command line`;
    let bottom = document.getElementsByTagName('footer')[0];
    bottom.replaceChild(keyTips, document.querySelector('footer .keyTips'));

    // Add the steam toggle button
    let button = document.createElement('button');
    button.id = 'deckToggleButton';
    button.className = 'textButton';
    button.textContent = 'steamdeck';
    // add button inside #menu div
    let menu = document.getElementsByTagName('nav')[0];
    //const fourthChild = menu.children[2];
    //menu.insertBefore(button, fourthChild.nextSibling);
    menu.appendChild(button);

    button.addEventListener('click', function() {
        // Toggle the button's active state
        button.classList.toggle('active');
        document.body.classList.toggle('steamdeck');
    });

    // if chroma is enabled, add chroma key button
    if (useChromaKey) {

        let chromaButton = document.createElement('button');
        chromaButton.id = 'chromaBtn';
        chromaButton.className = 'textButton';
        chromaButton.textContent = 'chroma';
        // add button inside #menu div
        menu.appendChild(chromaButton);

        chromaButton.addEventListener('click', function() {
            // Toggle the button's active state
            chromaButton.classList.toggle('active');
            document.body.classList.toggle('chroma');
        });
    }

})();
