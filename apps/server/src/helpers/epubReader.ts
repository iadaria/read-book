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
    const tags = ["p", "h1", "h2", "h3", "code", "span", "li"];
    console.log("\n");

    const parser = new parser2.Parser({
      onopentag(name, attributes) {
        currentTagName = name;
      },
      ontext(text) {
        console.log({ currentTagName, content: text.substring(0, 10) });
        if (tags.includes(currentTagName) /*  && text.trim() != "" */) {
          if (["span", "code"].includes(currentTagName)) {
            const prevTag = paragraphs.pop();
            const content = prevTag.content + text;
            paragraphs.push({ ...prevTag, content });
          } else {
            paragraphs.push({
              content: text,
              tagName: currentTagName as TagName,
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
    //res.json({ chapter: paragraphs });
  } catch (error) {
    console.log("error=>", error);
  } finally {
    //console.log("Returning paragraphs", paragraphs.splice(0, 10));
    return paragraphs.filter((p) => p.content.trim());
  }
}
