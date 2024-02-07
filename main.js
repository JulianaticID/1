(function() {

var isMultipage = document.documentElement.classList.contains('split');
var dfnMapDone = true;
var dfnMap = {};
var dfnPanel;

function isCrossSpecDfn(dfn) {
  return dfn.firstChild && dfn.firstChild instanceof HTMLAnchorElement;
}

function handleClick(event) {
  if (event.button !== 0) {
    return;
  }
  var current = event.target;
  var node;
  var eventInDfnPanel = false;
  while (current) {
    if (current.matches(
      "dfn, h2[data-dfn-type], h3[data-dfn-type], h4[data-dfn-type], h5[data-dfn-type], h6[data-dfn-type]"
    )) {
      node = current;
    }
    if (dfnPanel && current === dfnPanel) {
      eventInDfnPanel = true;
    }
    current = current.parentElement;
  }
  if (!eventInDfnPanel) {
    closePanel();
  }
  if (!node) {
    return;
  }
  var id = node.id || node.parentNode.id;
  var path = '';
  if (isMultipage) {
    path = location.pathname;
  }
  var specURL = '';
  if (isCrossSpecDfn(node)) {
    specURL = node.firstChild.href;
    event.preventDefault();
  }
  loadReferences(id, path, specURL);
  node.appendChild(dfnPanel);
  if (isMultipage) {
    sessionStorage.dfnId = id;
    sessionStorage.dfnPath = path;
    sessionStorage.dfnSpecURL = specURL;
  }
}
