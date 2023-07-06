# ki-quote

## Custom element HTML markup

```html
<ki-quote src="Some source for the quote">...</ki-quote>
<ki-quote src="@3">...</ki-quote>
```

## Optional attributes

- `src`: Indicates the source of this quote. If the value starts with an `@` character followed by an integer number "n", then the source is designated to be the nth reference item for the current topic.

## Child HTML/DOM content

The quoted material.
