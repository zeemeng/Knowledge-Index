# ki-code

## Custom element HTML markup

```
<ki-code path="/path/relative/to/origin.cpp" retry="2"></ki-code>
```

## Required attributes

- `path`: Specifies the path to a resource relative to the **document origin**. The content of the resource is treated as text.

## Optional attributes

- `retry`: Maximum number of times to attempt to fetch resource located at `path`. Defaults to 3.

## Child HTML/DOM content

None.
