---
sidebar_position: 5
---

# Triển khai trang của bạn

Docusaurus là một **trình tạo trang web tĩnh** (còn được gọi là **[ Jamstack](https://jamstack.org/)**).

Docusaurus xây dựng trang web của bạn dưới dạng **tệp HTML, JavaScript và CSS tĩnh** đơn giản.

## Xây dựng trang của bạn

Xây dựng trang web của bạn **dành cho môi trường sản xuất**:

```bash
npm run build
```

Các tập tin tĩnh đã được tạo trong thư mục `build`.

## Triển khai trang của bạn

Kiểm thử cục bộ phiên bản dành cho môi trường sản xuất:

```bash
npm run serve
```

Đến đây, thư mục `build` đã có tại [http://localhost:3000/](http://localhost:3000/).

Giờ thì bạn đã có thể triển khai thư mục `build` **một cách dễ dàng gần như từ bất kỳ đâu**, **và miễn phí** hoặc với một khoản phí rất nhỏ (hãy đọc phần **[Hướng dẫn triển khai](https://docusaurus.io/docs/deployment)**).
