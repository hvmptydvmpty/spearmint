"use strict";

async function notify(title, message) {
    await browser.notifications.create({
        type: "basic",
        title: title,
        message: message
    });
}

browser.runtime.onInstalled.addListener(function(details) {
    console.log(`Extension install event: ${details.reason}, temporary: ${details.temporary}`);
    browser.browserAction.disable();
});

async function import_csv(tab, click_data) {
    fetch(`${tab.url}/post`, {
        credentials: "include"
    }).then(
        (response) => response.json()
    ).then(
        (data) => console.log(data)
    );

    navigator.clipboard.writeText("hello").then(
        async function() {
            await notify("Copied", "Clipboard contains your info");
        },
        async function() {
            await notfy("Failure", "Failed to copy to clipboard");
        }
    );
}

browser.browserAction.onClicked.addListener(import_csv);

function on_tab_activated(active_info) {
    browser.browserAction.disable();
};

browser.tabs.onActivated.addListener(on_tab_activated);

function on_navigation_completed(details) {
    browser.browserAction.enable();
}

browser.webNavigation.onCompleted.addListener(on_navigation_completed, {
    url: [{
        hostEquals: "mint.intuit.com"
    }]
});
