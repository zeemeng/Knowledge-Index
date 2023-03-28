# ki-section

## Custom element HTML markup

```
<ki-section id="some-id" name="Just a name" long-name="A longer name">...</ki-section>
```

## Required attributes

- `id`: Must be unique. Recognized as a path segment by the client-side navigation module when specified within the `path` attribute of a `ki-link` element.
- `name`: Name of the section.

## Optional attributes

- `long-name`: A longer version of the section name.

## Child HTML/DOM content

Any HTML/DOM content. Slotted in shadow root.
