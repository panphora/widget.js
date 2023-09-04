# widget.js

Show/hide groups of elements depending on where you click on the page

```
<head>
  <script src="https://cdn.jsdelivr.net/gh/panphora/widget.js/widget.js"></script>
</head>
<body widget-status="mobile-sidebar:off">
  <button widget-on="mobile-sidebar">OPEN MOBILE MENU</button>
  <aside widget="mobile-sidebar" widget-clickaway="mobile-sidebar">
    <button widget-off="mobile-sidebar">CLOSE MOBILE MENU</button>
    <div>MOBILE MENU</div>
  </aside>
</body>
```

- `[widget]` element to show/hide when another element is clicked
- `[widget-status]` store on/off status of multiple widgets
- `[widget-on]` click to show widget
- `[widget-off]` click to hide widget
- `[widget-clickaway]` click anything else to hide widget
