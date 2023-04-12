# ki-ref

## Custom element HTML markup

```
<ki-cite ref="@3"></ki-cite>
<ki-cite ref="@3">An optional desciption for the citation.</ki-cite>
<ki-cite ref="/some/uri"></ki-cite>
<ki-cite ref="https://example.com">An optional desciption for the citation.</ki-cite>
```

## Optional attributes

- `ref`: Either a uri describing the location of a link to follow, or an `@` character followed by an integer number "n" describing the nth reference item for the current topic.

## Child HTML/DOM content

Optional. A description for this citation item. If not given and the `ref` attribute has a value, the content displayed will be either the uri specified by the attribute's value or the number following the `@` character specified by the attribute's value.
