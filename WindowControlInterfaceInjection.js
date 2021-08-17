var fs = require("fs");

var someFile = "build/index.html";

fs.readFile(someFile, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  if (data.includes("WindowControl.js")) {
    console.log("already injected.");
    return;
  }

  var result = data.replace(
    "</body>",
    '<script src="/WindowControl.js"></script></body>'
  );

  fs.writeFile(someFile, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});
