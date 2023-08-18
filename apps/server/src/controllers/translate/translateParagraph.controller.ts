import asyncHandler from "express-async-handler";

const translateParagraph = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content) {
    res.status(400);
    throw new Error("Content for translating is required");
  }

  const body = JSON.stringify({
    targetLanguageCode: "ru",
    texts: [content],
    folderId: process.env.YANDEX_FOLDER_ID,
    speller: false,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Api-Key ${process.env.YANDEX_API_KEY_SA_TRANSLATE}`,
  };

  var requestOptions = {
    method: "POST",
    headers,
    body,
  };

  const response = await fetch(
    "https://translate.api.cloud.yandex.net/translate/v2/translate",
    requestOptions
  );

  const tr = await response.json();

  res.json(tr);
});

export default translateParagraph;
