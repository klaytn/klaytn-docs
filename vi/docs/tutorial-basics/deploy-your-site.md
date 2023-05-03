---
sidebar_position: 5
---

# Deploy your site

Docusaurus is a **static-site-generator** (also called **[Jamstack](https://jamstack.org/)**).

It builds your site as simple **static HTML, JavaScript and CSS files**.

## Build your site

Build your site **for production**:

```bash
npm run build
```

Các tập tin tĩnh đã được tạo trong thư mục `build`.

## Triển khai trang của bạn

Kiểm thử cục bộ phiên bản dành cho production:

```bash
npm run serve
```

Thư mục `build` giờ đã có tại [http://localhost:3000/](http://localhost:3000/).

Giờ thì bạn có thể triển khai thư mục `build` **gần như từ bất kỳ đâu** một cách dễ dàng, **và miễn phí** hoặc với một khoản phí rất nhỏ (hãy đọc **[Hướng dẫn triển khai](https://docusaurus.io/docs/deployment)**).
