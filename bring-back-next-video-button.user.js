// ==UserScript==
// @name         Bring back next video button
// @license      GNU GPLv3
// @namespace    http://tampermonkey.net/
// @version      1.1
// @author       Etshy
// @match        *://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function waitForElm(selector) {
        return new Promise(resolve => {

            //If the element already exists, resolve the Promise
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            //Or observe document.body
            const observer = new MutationObserver(mutations => {
                //as soon as the element exists, resolve the Promise
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    waitForElm('.ytp-next-button').then(elm => {
        elm.style.removeProperty("display");
    });
})();
