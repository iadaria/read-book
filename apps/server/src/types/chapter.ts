export type TagName =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "code"
  | "span"
  | "li"
  | "a"
  | "strong";

export type Paragraph = {
  tagName: TagName;
  content: string;
  includes: Paragraph[];
};

export type Title = {
  id: string;
  title: string;
  order?: number;
  level?: number;
};
