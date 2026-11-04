/* Kylas Associates — disclaimer modal, mobile menu, FAQ accordion, team bios.
   Plain JavaScript, no libraries. */
(function () {
  "use strict";

  var STORAGE_KEY = "kylas-disclaimer-accepted";
  var root = document.documentElement;

  /* ---------- Entry disclaimer (Section 1) ---------- */
  function storageGet() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storageSet() {
    try { window.localStorage.setItem(STORAGE_KEY, "yes"); } catch (e) { /* storage unavailable: modal shows again next page */ }
  }

  function buildDisclaimer() {
    var wrap = document.createElement("div");
    wrap.className = "disclaimer";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "disclaimer-title");
    wrap.innerHTML =
      '<div class="disclaimer-box">' +
        '<span class="brand">Kylas Associates<small>Advocates &amp; Legal Consultants</small></span>' +
        '<h2 id="disclaimer-title">Disclaimer</h2>' +
        '<p>The Bar Council of India does not permit advocates to solicit work or advertise. By clicking “I Agree” below, you acknowledge and confirm that:</p>' +
        '<ul>' +
          '<li>You are seeking information about Kylas Associates of your own accord, and there has been no advertisement, solicitation, invitation or inducement of any sort by the firm or any of its members.</li>' +
          '<li>The information on this website is provided for general information only and does not constitute legal advice.</li>' +
          '<li>Use of this website, or any communication through it, does not create an advocate–client relationship.</li>' +
          '<li>Kylas Associates is not liable for any action taken on the basis of the information on this website.</li>' +
        '</ul>' +
        '<div class="actions">' +
          '<button type="button" class="btn" data-agree>I Agree</button>' +
          '<button type="button" class="btn secondary" data-exit>Exit</button>' +
        '</div>' +
      '</div>';
    return wrap;
  }

  function showDisclaimer() {
    var modal = buildDisclaimer();
    document.body.appendChild(modal);
    var agree = modal.querySelector("[data-agree]");
    var exit = modal.querySelector("[data-exit]");
    var focusables = [agree, exit];

    agree.addEventListener("click", function () {
      storageSet();
      modal.parentNode.removeChild(modal);
      root.classList.remove("disclaimer-pending");
    });
    exit.addEventListener("click", function () {
      if (window.history.length > 1) { window.history.back(); }
      window.setTimeout(function () { window.location.href = "about:blank"; }, 150);
    });
    // Keep keyboard focus inside the dialog.
    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var i = focusables.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
      else if (!e.shiftKey && i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
    });
    agree.focus();
  }

  if (storageGet() === "yes") {
    root.classList.remove("disclaimer-pending");
  } else {
    root.classList.add("disclaimer-pending");
    showDisclaimer();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Disclosure buttons: FAQ accordion and team bios ---------- */
  var disclosures = document.querySelectorAll("[data-disclosure]");
  Array.prototype.forEach.call(disclosures, function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    var openLabel = btn.getAttribute("data-open-label");
    var closedLabel = btn.getAttribute("data-closed-label");
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      if (openLabel && closedLabel) {
        var text = btn.querySelector(".btn-text") || btn;
        text.textContent = expanded ? closedLabel : openLabel;
      }
    });
  });

  /* ---------- Team photo fallback: show initials if a photo is missing ---------- */
  var photos = document.querySelectorAll(".photo img");
  Array.prototype.forEach.call(photos, function (img) {
    function fail() { img.parentNode.classList.add("no-photo"); }
    if (img.complete && img.naturalWidth === 0) { fail(); }
    else { img.addEventListener("error", fail); }
  });
})();
