import EPub from "epub2";
import { TocElement } from "epub2/lib/epub/const";
import { CURRENT_DIR, FILE_NAME } from "../../constants/epub.constants";
import { Title } from "@/types";

interface ITocElement extends TocElement {
  properties?: "nav" | string;
}

export async function readTitles(): Promise<Title[]> {
  try {
    const epub = await EPub.createAsync(
      `${CURRENT_DIR}/${FILE_NAME}`,
      null,
      ""
    );

    const allChaptersTitles = epub.toc;
    const allChaptersIds = epub.flow;

    console.log({ allChaptersIds });
    console.log({ allChaptersTitles });

    const chapters = allChaptersIds
      .map((id) => {
        const chapter = allChaptersTitles.find((ch) =>
          ch.href.includes(id.href)
        );
        return { ...id, title: chapter.title, order: chapter.order };
      })
      .sort((ch1, ch2) => (ch1.order <= ch2.order ? -1 : 1));

    console.log("***", { chapters });

    /*
    const chapters = allChapters
      .filter((chapter: ITocElement) => chapter?.properties !== "nav"); */

    return chapters as Title[];
  } catch (error) {
    console.log("error=>", error);
  }
}
