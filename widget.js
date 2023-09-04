/*

  # WIDGET.JS

  Show/hide different areas on the page depending on where the user clicks. Super useful.

  ### Example
  
  ```
  <head>
    <script src="https://cdn.jsdelivr.net/gh/panphora/widget.js@main/widget.js"></script>
  </head>
  <body widget-status="mobile-sidebar:off">
    <button widget-on="mobile-sidebar">OPEN MOBILE MENU</button>
    <aside widget="mobile-sidebar" widget-clickaway="mobile-sidebar">
      <button widget-off="mobile-sidebar">CLOSE MOBILE MENU</button>
      <div>MOBILE MENU</div>
    </aside>
  </body>
  ```

  ### Attributes
  - `[widget]` element to show/hide when another element is clicked
  - `[widget-status]` store on/off status of multiple widgets
  - `[widget-on]` click to show widget
  - `[widget-off]` click to hide widget
  - `[widget-clickaway]` click anything else to hide widget

  ### Notes
  - this script should be executed immediately, without a defer or async attribute
    - or this line should be added to your css: `[widget] {display: none;}`
  - limitation: can't change more than one `[widget-status]` per click
    - this means you can't attach `[widget-status]` to more than one element in triggered element's ancestors
*/

(function () {
  function getValuesFromAttr (elem, attrName) {
    let attrValue = elem.getAttribute(attrName);
    if (attrValue) {
      return attrValue.split(" ");
    } else {
      return [];
    }
  }

  function addValueToAttr (elem, attrName, value) {
    let attrValue = elem.getAttribute(attrName);
    let attrValues = attrValue.split(" ");
    if (!attrValues.includes(value)) {
      attrValues.push(value);
      let attrValuesAsString = attrValues.join(" ");
      elem.setAttribute(attrName, attrValuesAsString);
    }
  }

  function removeValueFromAttr (elem, attrName, value) {
    let attrValue = elem.getAttribute(attrName);
    let attrValues = attrValue.split(" ");
    if (attrValues.includes(value)) {
      let filteredArr = attrValues.filter(val => val !== value);
      let attrValuesAsString = filteredArr.join(" ");
      elem.setAttribute(attrName, attrValuesAsString);
    }
  }

  // add this style before page loadsimmediately
  document.head.insertAdjacentHTML("beforeend", "<style>[widget] {display: none;}</style>");


  // insert DOM-dependent styles
  function onDomReady (callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback)
    } else {
      callback();
    }
  }

  onDomReady(() => {
    let allClickAwayElems = Array.from(document.querySelectorAll("[widget-clickaway]"));

    document.addEventListener("click", event => {
      let targetElem = event.target;
      
      let offActionElem = targetElem.closest("[widget-off]");
      if (offActionElem) {
        let widgetNamesToTurnOff = getValuesFromAttr(offActionElem, "widget-off");
        widgetNamesToTurnOff.forEach(widgetNameToTurnOff => {
          let widgetTurnedOnElem = targetElem.closest(`[widget-status~="${widgetNameToTurnOff}\:on"]`);
          if (widgetTurnedOnElem) {
            removeValueFromAttr(widgetTurnedOnElem, "widget-status", `${widgetNameToTurnOff}\:on`);
            addValueToAttr(widgetTurnedOnElem, "widget-status", `${widgetNameToTurnOff}\:off`);
          }
        });
      }

      let clickedClickAwayElems = getAncestors(targetElem, "[widget-clickaway]");
      let activatedClickAwayElems = allClickAwayElems.filter(clickAwayElem => !clickedClickAwayElems.includes(clickAwayElem));
      activatedClickAwayElems.forEach(activatedClickAwayElem => {
        let widgetNamesToTurnOff = getValuesFromAttr(activatedClickAwayElem, "widget-clickaway");
        widgetNamesToTurnOff.forEach(widgetNameToTurnOff => {
          let widgetTurnedOnElem = targetElem.closest(`[widget-status~="${widgetNameToTurnOff}\:on"]`);
          if (widgetTurnedOnElem) {
            removeValueFromAttr(widgetTurnedOnElem, "widget-status", `${widgetNameToTurnOff}\:on`);
            addValueToAttr(widgetTurnedOnElem, "widget-status", `${widgetNameToTurnOff}\:off`);
          }
        });
      });
      
      let onActionElem = targetElem.closest("[widget-on]");
      if (onActionElem) {
        let widgetNamesToTurnOn = getValuesFromAttr(onActionElem, "widget-on");
        widgetNamesToTurnOn.forEach(widgetNameToTurnOn => {
          let widgetTurnedOffElem = targetElem.closest(`[widget-status~="${widgetNameToTurnOn}\:off"]`);
          if (widgetTurnedOffElem) {
            removeValueFromAttr(widgetTurnedOffElem, "widget-status", `${widgetNameToTurnOn}\:off`);
            addValueToAttr(widgetTurnedOffElem, "widget-status", `${widgetNameToTurnOn}\:on`);
          }
        });
      }

    });

    let styles = Array.from(document.querySelectorAll("[widget]")).map(widgetElem => {
      let widgetNames = getValuesFromAttr(widgetElem, "widget");
      return widgetNames.map(widgetName => {
        return `[widget-status~="${widgetName}\\:off"] [widget~="${widgetName}"] { display: none; }
  [widget-status~="${widgetName}\\:on"] [widget~="${widgetName}"] { display: block; }`;
      }).join("");
    }).join("");


    document.head.insertAdjacentHTML("beforeend", "<style>" + styles + "</style>");
  });

  function getAncestors (elem, selector) {
    var ancestors = [];
    while (elem) {
      if (elem.matches(selector)) {
        ancestors.unshift(elem);
      }
      elem = elem.parentElement;
    }
    return ancestors;
  }
})();