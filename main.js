const copyDivToClipboard = (element) => {
  var range = document.createRange();
  range.selectNode(element);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

const getElementsByXPath = (xpath, parent) => {
  let results = [];
  let query = document.evaluate(xpath, parent || document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  return results;
};

const addCopyButton = () => {
  setTimeout(() => {
    var allElements = getElementsByXPath(`//div[contains(@class, 'vpl_show_hide_content')][2]/div/pre/i`);

    allElements.forEach((elem, i) => {
      let btn = document.createElement('button');
      btn.name = `copyBtn${i}`;
      btn.innerHTML = "Copy";
      btn.style = `
appearance: none;
background-color: #FAFBFC;
border: 1px solid rgba(27, 31, 35, 0.15);
border-radius: 6px;
box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
box-sizing: border-box;
color: #24292E;
cursor: pointer;
display: block;
font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
font-size: 14px;
font-weight: 500;
line-height: 20px;
list-style: none;
padding: 6px 16px;
position: relative;
transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
vertical-align: middle;
white-space: nowrap;
word-wrap: break-word;
        `
      btn.classList.add('button-3');

      elem.before(btn);

      btn.addEventListener('click', (e) => {
        var nextInfoElem = document.getElementsByName(e.target.name)[0].nextElementSibling;
        copyDivToClipboard(nextInfoElem);
      });

    });
  }, 1000);
}

addCopyButton();
