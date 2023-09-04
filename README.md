# WIDGET.JS

Show/hide different areas on the page depending on where the user clicks. Super useful.

![widget.js]([Isolated.png "Title"](https://github.com/panphora/widget.js/assets/364330/48892627-0e84-449e-9145-66c082142934))

### Example

```
<head>
  <script src="https://cdn.jsdelivr.net/npm/widget-area@1.12.26/widget.js"></script>
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
- limitations (for now -- pull requests accepted)
  - can't change more than one `[widget-status]` per click
    - this means you can't attach `[widget-status]` to more than one element in triggered element's ancestors
    - this means only one `[widget-status]` will change if two `[widget-clickaway]`s are activated
