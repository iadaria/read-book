import EPub from "epub2";
import * as parser2 from "htmlparser2";
import { Paragraph, TagName } from "@/types/chapter";
import { TocElement } from "epub2/lib/epub/const";

//const { DomUtils } = parser2;

const currentDir = process.cwd() + "/dist";
//const fileName = "2d921902.epub";
//const fileName = "test1.epub";
const fileName = "solidity1.epub";

interface ITocElement extends TocElement {
  properties?: "nav" | string;
}

export async function readChapter(): Promise<Paragraph[]> {
  let paragraphs: Paragraph[] = [];

  try {
    const epub = await EPub.createAsync(`${currentDir}/${fileName}`, null, "");

    console.log("**star readChapter **\n");

    //console.log(epub.toc);
    //console.log(epub.flow);

    const chapters = epub.flow;

    const contentChapters = chapters.filter(
      (chapter: ITocElement) => chapter?.properties !== "nav"
    );

    //console.log({ contentChapters });

    const ids = chapters
      .filter((chapter: ITocElement) => chapter?.properties !== "nav")
      .map((chapter) => chapter.id);

    //console.log(ids);

    const chapter = await epub.getChapterAsync(ids[0]);

    let currentTagName = "";
    const tags = ["p", "h1", "h2", "h3", "code", "span", "li", "a", "strong"];
    console.log("\n");

    const parser = new parser2.Parser({
      onopentag(name, attributes) {
        currentTagName = name;
      },
      ontext(content) {
        if (tags.includes(currentTagName)) {
          const tagName = currentTagName as TagName;
          /* paragraphs.push({
            content: text.trimStart(),
            tagName: currentTagName as TagName,
            includes: [],
          }); */
          if (
            ["span", "code", "a", "strong"].includes(currentTagName) &&
            paragraphs.length
          ) {
            const prevTag = paragraphs.pop();
            const include = { content, tagName } as Paragraph;
            prevTag.includes.push(include);
            paragraphs.push(prevTag);
          } else if (!["a"].includes(currentTagName)) {
            paragraphs.push({
              content: content.trimStart(),
              tagName,
              includes: [],
            });
          }
        }
      },
      onclosetag(tagname) {
        currentTagName = tagname;
      },
      onend() {
        console.log("* finish(onend) **");
        //return paragraphs;
      },
    });

    parser.write(chapter);
    parser.end();

    const found = paragraphs.find((p) => p.content.includes("Take care"));
    console.log(found);
  } catch (error) {
    console.log("error=>", error);
  } finally {
    //console.log("Returning paragraphs", paragraphs.splice(0, 10));
    //return paragraphs.filter((p) => p.content.trim());
    return paragraphs;
  }
}
