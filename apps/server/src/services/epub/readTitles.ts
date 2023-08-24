import EPub from "epub2";
import { TocElement } from "epub2/lib/epub/const";
import { CURRENT_DIR, FILE_NAME } from "./epub.constants";
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

    const allChapters = epub.flow;

    //console.log({ allChapters });

    const chapters = allChapters.filter(
      (chapter: ITocElement) => chapter?.properties !== "nav"
    );
    console.log({ chapters });

    return chapters as Title[];
  } catch (error) {
    console.log("error=>", error);
  }
}
