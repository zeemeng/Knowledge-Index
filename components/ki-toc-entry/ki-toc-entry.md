# ki-toc-entry

## Custom element HTML/DOM markup

```
<ki-toc-entry path="/internal#path" name="Some entry **name**">...</ki-toc-entry>
```

## Optional attributes

- `path`: A path used by the client-side navigation module. Internally, this value is assigned to the `path` attribute of a `ki-link` element.
- `name`: A name or description for the table of content entry. Internally, this value is parsed and assigned as the child content of a `ki-link` element. Any substring surrounded by 2 asterixes (`**`) is wrapped in a `em` element.

## Child HTML/DOM content

Elements and/or text. Slotted within a `div`. Intended be a list of `ki-toc-entry` elements.
