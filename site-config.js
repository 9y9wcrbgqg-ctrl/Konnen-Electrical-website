window.KONNEN_CONFIG = {
  company: "Können Electrical LLC",
  legalName: "Konnen Electrical LLC",
  displayName: "KÖNNEN ELECTRICAL",
  phone: "",
  phoneHref: "",
  email: "",
  ccb: "",
  electricalContractorLicense: "",
  serviceArea: "Southern Oregon"
};

(() => {
  const replaceBrand = (value) => value
    .replace(/\bKonnen Electrical\b/g, "Können Electrical")
    .replace(/\bKonnen\b/g, "Können");

  const applyBrandSpelling = () => {
    document.title = replaceBrand(document.title);

    document.querySelectorAll('meta[content]').forEach((meta) => {
      const content = meta.getAttribute('content');
      if (content && /\bKonnen\b/.test(content)) {
        meta.setAttribute('content', replaceBrand(content));
      }
    });

    document.querySelectorAll('[aria-label]').forEach((el) => {
      const label = el.getAttribute('aria-label');
      if (label && /\bKonnen\b/.test(label)) {
        el.setAttribute('aria-label', replaceBrand(label));
      }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName)) return;
      if (/\bKonnen\b/.test(node.nodeValue || '')) {
        node.nodeValue = replaceBrand(node.nodeValue);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBrandSpelling, { once: true });
  } else {
    applyBrandSpelling();
  }
})();
