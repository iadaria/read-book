const EPub = require("epub2").EPub;

EPub.createAsync("2d921902.epub", null, "")
  .then(async function (epub) {
    console.log(epub.filename);

    console.log("METADATA:\n");
    console.log(epub.metadata);

    console.log("\nSPINE:\n");
    console.log(epub.flow);

    console.log("\nTOC:\n");
    console.log(epub.toc);
  })
  .catch((error) => console.log("error=>", error));
