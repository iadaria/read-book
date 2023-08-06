import EPub from "epub2";
import { sortIds } from "./utils/common";
import * as parser2 from "htmlparser2";

//const { DomUtils } = parser2;

const currentDir = process.cwd() + "/dist";
//const fileName = "2d921902.epub";
//const fileName = "test1.epub";
const fileName = "solidity1.epub";

async function start() {
  /*  */
  try {
    const epub = await EPub.createAsync(`${currentDir}/${fileName}`, null, "");
    let result = "";
    const chapter = await epub.getChapterAsync("html4");
    const handler = new parser2.DomHandler((err, dom) => {
      if (err) {
        console.log({ error: err });
      }
      const tags = ["h1", "h2", "h3", "p"];
      const elements = tags
        .map((tag) => {
          console.log({ tag });
          return parser2.DomUtils.getElementsByTagName(tag, dom);
        })
        .flat();

      elements.forEach(
        (e) => (result += "\n\n" + parser2.DomUtils.textContent(e))
      );
    });
    const parser = new parser2.Parser(handler);
    parser.write(chapter);
    parser.end();
    console.log(result);
  } catch (error) {
    console.log("error=>", error);
  }
}
start();

/* epub.spine.contents.sort(sortIds).map(async (content) => {
  //console.log(content)
  let currentTagName = "";
    const tags = ["h1", "p", "h2", "code", "span"];
    console.log("\n");
    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        currentTagName = name;
        if (tags.includes(name)) {
          //console.log({ attributes });
        }
      },
      ontext(text) {
        if (tags.includes(currentTagName) && text.trim() != "") {
          let _text = text.trim();
          console.log(_text);
        }
      },
      onclosetag(tagname) {
        currentTagName = tagname;
      },
    });
    parser.write(chapter);
    parser.end();
}); */

/* const handler = new htmlparser2.DomHandler();
const parser = new htmlparser2.Parser(handler);
parser.write(chapter);
parser.end();
const root = handler.root;
console.log(root);
 */
/* console.log(epub.filename);

console.log("METADATA:\n");
console.log(epub.metadata);

console.log("\nSPINE:\n");
console.log(epub.flow);

console.log("\nTOC:\n");
console.log(epub.toc);

console.log("contents**", epub.spine.contents);

const contentIds = await epub
  .getChapterAsync(epub.spine.contents[0].id)
  .then(function (data) {
    console.log("\nFIRST CHAPTER:\n");
    console.log(data.substr(0, 512) + "..."); // first 512 bytes
  });

console.log("\nmanifest:\n");
console.log(epub.manifest);

epub.flow.forEach(function (chapter) {
  console.log(chapter);
  console.log(chapter);
});
 */

// like spine but with subcontent
// epub.toc.forEach((nav) => console.log(nav));
