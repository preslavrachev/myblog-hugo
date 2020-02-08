window.cookieconsent.initialise({
  container: document.getElementById("content"),
  palette: {
    popup: { background: "#fff" },
    button: { background: "#26a8ed", text: "#fff" }
  },
  revokable: false,
  onStatusChange: function(status) {
    if (this.hasConsented()) {
      // consented;
    }
  },
  law: {
    regionalLaw: true
  },
  location: true,
  content: {
    message:
      "This blog uses cookies and collects limited analytics, to ensure you get the best reading experience."
  },
  position: "bottom-right"
});
