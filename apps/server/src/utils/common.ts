import { TocElement } from "epub2/lib/epub/const";

export const sortIds = ({ id: id1 }: TocElement, { id: id2 }: TocElement) => {
  if (id1 < id2) return -1;
  if (id1 > id2) return 1;
  return 0; // ids must be equal
};
