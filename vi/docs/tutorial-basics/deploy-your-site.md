---
sidebar_position: 5
---

# Triển khai trang của bạn

Docusaurus là một **trình tạo trang web tĩnh** (còn được gọi là **[ Jamstack](https://jamstack.org/)**).

Docusaurus xây dựng trang web của bạn dưới dạng **tệp HTML, JavaScript và CSS tĩnh** đơn giản.

## Xây dựng trang của bạn

Xây dựng trang web của bạn **dành cho production**:

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
