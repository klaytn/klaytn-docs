---
sidebar_position: 2
---

# Tạo tài liệu

Tài liệu là **các nhóm trang** được kết nối thông qua:

- **thanh bên**
- **điều hướng trước/tiếp**
- **lập phiên bản**

## Tạo tài liệu đầu tiên của bạn

Tạo một tập tin Markdown tại `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

Đến đây, một tài liệu mới đã có tại [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## Cấu hình thanh bên

Docusaurus sẽ tự động **tạo một thanh bên** từ thư mục `docs`.

Thêm siêu dữ liệu để tùy chỉnh nhãn và vị trí của thanh bên:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

Bạn còn có thể tạo thanh bên trực tiếp trong `sidebars.js`:

```js title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```
