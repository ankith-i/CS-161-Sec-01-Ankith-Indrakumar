(function (d) {
  const l = (d["ca"] = d["ca"] || {});
  l.dictionary = Object.assign(l.dictionary || {}, {
    "Block quote": "Cita de bloc",
    Bold: "Negreta",
    Cancel: "Cancel·lar",
    "Cannot upload file:": "No es pot pujar l'arxiu:",
    "Choose heading": "Escull capçalera",
    Heading: "Capçalera",
    "Heading 1": "Capçalera 1",
    "Heading 2": "Capçalera 2",
    "Heading 3": "Capçalera 3",
    "Heading 4": "",
    "Heading 5": "",
    "Heading 6": "",
    Italic: "Cursiva",
    Paragraph: "Pàrraf",
    Save: "Desar",
  });
  l.getPluralForm = function (n) {
    return n != 1;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
