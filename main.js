"use strict";

browser.runtime.onInstalled.addListener(function(details) {
    console.log(`Extension install event: ${details.reason}, temporary: ${details.temporary}`);
});

async function notify(title, message) {
    await browser.notifications.create({
        type: "basic",
        title: title,
        message: message
    });
}
