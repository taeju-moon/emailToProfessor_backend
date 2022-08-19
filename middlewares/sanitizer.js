const sanitizeHtml = require("sanitize-html");
const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

const sanitizer = (req, res, next) => {
  //content sanitizer
  const filteredContent = sanitizeHtml(req.body.content, {
    ...sanitizeOption,
  });
  filteredContent.length < 200
    ? filteredContent
    : `${filteredContent.slice(0, 200)}...`;
  req.body.content = filteredContent;
  //title sanitizer
  const filteredTitle = sanitizeHtml(req.body.title, {
    ...sanitizeOption,
  });
  filteredTitle.length < 200
    ? filteredTitle
    : `${filteredTitle.slice(0, 200)}...`;
  req.body.title = filteredTitle;
  //escape middleware
  next();
};

module.exports = sanitizer;
