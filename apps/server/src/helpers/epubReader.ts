import EPub from "epub2";
import * as parser2 from "htmlparser2";
import { Chapter } from "@/types/chapter";

//const { DomUtils } = parser2;

type Result = {
  tagName: "h1" | "h2" | "h3" | "p";
  content: string;
};

const currentDir = process.cwd() + "/dist";
//const fileName = "2d921902.epub";
//const fileName = "test1.epub";
const fileName = "solidity1.epub";

export async function readChapter(): Promise<Chapter[]> {
  let result: Chapter[] = [];
  try {
    const epub = await EPub.createAsync(`${currentDir}/${fileName}`, null, "");
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

      result = elements.map((e) => {
        const content = parser2.DomUtils.textContent(e);
        return { tagName: e.name, content } as Result;
      });
    });
    const parser = new parser2.Parser(handler);
    parser.write(chapter);
    parser.end();
    console.log(result);
  } catch (error) {
    console.log("error=>", error);
  } finally {
    return result;
  }
}
