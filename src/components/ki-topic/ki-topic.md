# ki-topic

## Custom element HTML markup

```
<ki-topic id="some-id" name="A topic **name**" long-name="A longer topic **name**" updated="28-03-2023">...</ki-topic>
```

## Required attributes

- `name`: Name of the topic. It is parsed before being rendered in the UI, whereby any substring surrounded by 2 asterixes (`**`) is wrapped in a `em` element.

## Optional attributes

- `id`: Must be unique. Recognized as a hash/document fragment value by the client-side navigation module when specified within the `path` attribute of a `ki-link` element. If omitted, it will be automatically generated based on the `name` attribute and the `id` of the element's parents.

- `long-name`: A longer version of the topic name. It is parsed before being rendered in the UI, whereby any substring surrounded by 2 asterixes (`**`) is wrapped in a `em` element.

- `updated`: Designates the moment when the content of this topic is last updated.

## Child HTML/DOM content

Any HTML/DOM content. Slotted in shadow root. Potentially consists of nested `ki-topic` elements.
