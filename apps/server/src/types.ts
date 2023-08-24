export type Content = {
  id: string;
  href: string;
  mediaType: "application/xhtml+xml";
  order: number;
};

export type Title = {
  id: string;
  title: string;
  order?: number;
  level?: number;
};
