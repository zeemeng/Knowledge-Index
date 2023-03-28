# ki-load

## Custom element HTML markup

```
<ki-load type="html" path="/path/relative/to/origin.cpp" retry="2"></ki-load>
```

## Required attributes

- `type`: Specifies the type of the resource located at `path`. Currently allowed values are `"html"` and `"text"`.

- `path`: Specifies the path to a resource relative to the **document origin**. The way that the content of the resource is handled depends on the specified `type`.

## Optional attributes

- `retry`: Maximum number of times to attempt to fetch resource located at `path`. Defaults to 3.

## Child HTML/DOM content

None.
