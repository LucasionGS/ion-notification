Popup.addStyle();

function run() {
  new Popup("This is a title", [
    "This is one line",
    "This is another line"
  ],
  {
    "dieAfter":2000
  });
}