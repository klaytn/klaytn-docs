---
sidebar_position: 1
---

# Quản lý phiên bản tài liệu

Docusaurus có thể quản lý nhiều phiên bản tài liệu khác nhau của bạn.

## Tạo một phiên bản tài liệu

Phát hành phiên bản 1.0 của dự án:

```bash
npm run docusaurus docs:version 1.0
```

Thư mục `docs` được sao chép vào `versioned_docs/version-1.0` và `versions.json` được tạo.

Tài liệu của bạn giờ đây có 2 phiên bản:

- `1.0` tại `http://localhost:3000/docs/` cho phiên bản tài liệu 1.0
- `current` at `http://localhost:3000/docs/next/` for the **upcoming, unreleased docs**

## Add a Version Dropdown

To navigate seamlessly across versions, add a version dropdown.

Modify the `docusaurus.config.js` file:

```js title="docusaurus.config.js"
module.exports = {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'docsVersionDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

The docs version dropdown appears in your navbar:

![Docs Version Dropdown](./img/docsVersionDropdown.png)

## Update an existing version

It is possible to edit versioned docs in their respective folder:

- `versioned_docs/version-1.0/hello.md` updates `http://localhost:3000/docs/hello`
- `docs/hello.md` updates `http://localhost:3000/docs/next/hello`
