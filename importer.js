"use strict";

const block_id = "_spearmint-importer-block";

function insert() {
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
    window.alert("about to fetch...");
}

insert();
