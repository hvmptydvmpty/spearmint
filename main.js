async function notify(title, message) {
    await browser.notifications.create({
        type: "basic",
        title: title,
        message: message
    });
}

async function importCsv() {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    console.log({tabs});
    navigator.clipboard.writeText("hello").then(
        async function() {
            await notify("Copied", "Clipboard contains your info");
        },
        async function() {
            await notfy("Failure", "Failed to copy to clipboard");
        }
    );
}

browser.browserAction.onClicked.addListener(importCsv);

browser.runtime.onInstalled.addListener(function(details) {
    console.log(`Extension install event: ${details.reason}, temporary: ${details.temporary}`);
});
