import EPub from "epub2";
import * as parser2 from "htmlparser2";
import { Paragraph, TagName } from "@/types/chapter";
import { TocElement } from "epub2/lib/epub/const";
import { CURRENT_DIR, FILE_NAME } from "../../constants/epub.constants";

interface ITocElement extends TocElement {
  properties?: "nav" | string;
}

export async function readChapter(id: string): Promise<Paragraph[]> {
  let paragraphs: Paragraph[] = [];

  try {
    const epub = await EPub.createAsync(
      `${CURRENT_DIR}/${FILE_NAME}`,
      null,
      ""
    );
    const chapter = await epub.getChapterAsync(id);

    let currentTagName = "";
    const tags = [
      "p",
      "h1",
      "h2",
      "h3",
      "code",
      "span",
      "li",
      "a",
      "strong",
      "em",
    ];
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
            ["span", "code", "a", "strong", "em"].includes(currentTagName) &&
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
    return paragraphs;
  }
}
