import asyncHandler from "express-async-handler";

const translateParagraph = asyncHandler(async (req, res) => {
  console.log(process.env.YANDEX_API_KEY_SA_TRANSLATE);
  const { content } = req.body;
  if (!content) {
    res.status(400);
    throw new Error("Content for translating is required");
  }

  const raw = JSON.stringify({
    targetLanguageCode: "ru",
    texts: [content],
    //folderId: yandex.folderId,
    speller: false,
  });
});

export default translateParagraph;
