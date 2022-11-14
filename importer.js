"use strict";

const block_id = "_spearmint-importer-block";

function insert() {
    if (null == document.body) {
        return;
    }

    var current = document.getElementById(block_id);
    if (current != null) {
        current.remove();
        current = null;
    }
    const importerdiv = document.createElement("div");
    importerdiv.id = block_id;
    importerdiv.classList.add("spearmint-box");
    document.body.appendChild(importerdiv);

    const csvtext = document.createElement("textarea");
    csvtext.classList.add("spearmint-payload");
    csvtext.cols = 64;
    csvtext.rows = 16;
    csvtext.spellcheck = false;
    csvtext.wrap = "off";
    importerdiv.appendChild(csvtext);

    const csvload = document.createElement("input");
    csvload.type = "button";
    csvload.value = "Load CSV";
    importerdiv.appendChild(csvload);

    const csvfile = document.createElement("input");
    csvfile.type = "file";
    csvfile.accept = ".csv,text/csv";
    csvload.addEventListener("click", async function(event) {
        csvtext.textContent = await csvfile.files[0].text();
    });
    importerdiv.appendChild(csvfile);

    const launch = document.createElement("input");
    launch.type = "button";
    launch.value = "Import CSV";
    launch.addEventListener("click", do_import);
    importerdiv.appendChild(launch);
}

async function do_import(event) {
    const intuit_apikey = "";
    var categories;

    fetch(`${window.origin}/pfm/v1/categories`, {
        credentials: "include",
        "headers": {
            "Accept": "application/json, text/plain, */*",
            // "Accept-Language": "en-US,en;q=0.5",
            // "intuit_tid": crypto.randomUUID(),
            "Authorization": `Intuit_APIKey intuit_apikey=${intuit_apikey},intuit_apikey_version=1.0`
            // "Sec-Fetch-Dest": "empty",
            // "Sec-Fetch-Mode": "cors",
            // "Sec-Fetch-Site": "same-origin"
        },
        // "referrer": "https://mint.intuit.com/categories?from=TRANSACTIONS",
        // "method": "GET",
        "mode": "cors"
    }).then(
        (response) => response.ok
            ? response.json()
            : Promise.reject(`categories failed to download: ${response.statusText} (${response.status})`)
    ).then(
        (json) => {
            categories = json;
            console.log(`${categories.length} categories`);
            return fetch(`${window.origin}/updateTransaction.xevent`, {
                credentials: "include",
                data: {
                    // TODO
                }
            });
        }
    ).then(
        (response) => response.ok
            ? response.text()
            : Promise.reject(`submission failed: ${response.statusText} (${response.status})`)
    ).then(
        (text) => {
            window.alert(`Success\nCSV submitted. Please check transactions page\n${text}`);
            return Promise.resolve(text);
        }
    );

}

insert();
