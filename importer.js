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
    const intuit_apikey = window.__shellInternal.appExperience.appApiKey;
    var categories;

    fetch("/pfm/v1/categories", {
        credentials: "include",
        headers: {
            "Accept": "application/json, text/plain, */*",
            // "intuit_tid": crypto.randomUUID(),
            "Authorization": `Intuit_APIKey intuit_apikey=${intuit_apikey},intuit_apikey_version=1.0`
        },
        referrer: `${window.origin}/transactions`,
        // "method": "GET",
        mode: "cors"
    }).then(
        (response) => response.ok
            ? response.json()
            : Promise.reject(`categories failed to download: ${response.statusText} (${response.status})`)
    ).then(
        (json) => {
            categories = json.Category; // array
            console.log("categories", json.metadata);

            /* example
            {
                "type": "Category",
                "name": "Entertainment",
                "depth": 1,
                "categoryType": "EXPENSE",
                "isBusiness": false,
                "isCustom": false,
                "isUnassignable": false,
                "isUnbudgetable": false,
                "isUntrendable": false,
                "isIgnored": false,
                "isEditable": false,
                "isDeleted": false,
                "discretionaryType": "DISCRETIONARY",
                "metaData": {
                    "lastUpdatedDate": "2020-11-18T07:31:47Z",
                    "link": [
                        {
                            "otherAttributes": {},
                            "href": "/v1/categories/90767559_1",
                            "rel": "self"
                        }
                    ]
                },
                "id": "90767559_1"
            }
            */        
            
            const data = {
                "date": "2022-12-14",
                "description": "Some words",
                "category": {
                    "id": "90767559_709",
                    "name": null
                },
                "accountId": null,
                "amount": -12.34,
                "parentId": null,
                "type": "CashAndCreditTransaction",
                "id": null,
                "isExpense": true,
                "isPending": false,
                "isDuplicate": false,
                "tagData": null,
                "splitData": null,
                "manualTransactionType": "CASH",
                "checkNumber": null,
                "isLinkedToRule": false,
                "shouldPullFromAtmWithdrawals": false,
                "notes": "Notable words"
            };
            return fetch("/pfm/v1/transactions", {
                credentials: "include",
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    //"intuit_tid": "47554052-3188-41f0-8c2d-ca1f2ea7434f",
                    "Authorization": `Intuit_APIKey intuit_apikey=${intuit_apikey},intuit_apikey_version=1.0`
                },
                referrer: `${window.origin}/transactions`,
                body: window.JSON.stringify(data),
                method: "POST",
                mode: "cors"
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
