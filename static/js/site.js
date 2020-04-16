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

/* Hotjar Tracking Code for https://preslav.me */
(function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = { hjid: 1770517, hjsv: 6 };
  a = o.getElementsByTagName("head")[0];
  r = o.createElement("script");
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
