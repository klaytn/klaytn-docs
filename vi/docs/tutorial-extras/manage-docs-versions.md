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
- `current` tại `http://localhost:3000/docs/next/` dành cho **các tài liệu sắp tới, chưa được phát hành**

## Thêm danh sách phiên bản thả xuống

Để điều hướng giữa các phiên bản một cách trơn tru, hãy thêm một danh sách phiên bản thả xuống.

Chỉnh sửa tập tin `docusaurus.config.js`:

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

Danh sách phiên bản thả xuống sẽ xuất hiện trong thanh điều hướng:

![Danh sách phiên bản tài liệu thả xuống](./img/docsVersionDropdown.png)

## Cập nhật một phiên bản có sẵn

Bạn có thể chỉnh sửa các tài liệu đã được lập phiên bản tại thư mục tương ứng của chúng:

- `versioned_docs/version-1.0/hello.md` cập nhật `http://localhost:3000/docs/hello`
- `docs/hello.md` cập nhật `http://localhost:3000/docs/next/hello`
