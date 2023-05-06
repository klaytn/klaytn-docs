---
sidebar_position: 2
---

# Dịch trang web của bạn

Hãy dịch `docs/intro.md` sang tiếng Pháp.

## Cấu hình i18n

Sửa đổi `docusaurus.config.js` để thêm sự hỗ trợ cho vùng `fr`:

```js title="docusaurus.config.js"
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## Dịch một tài liệu

Sao chép tập tin `docs/intro.md` vào thư mục `i18n/fr`:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

Dịch `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` bằng tiếng Pháp.

## Khởi động trang web đã được bản địa hóa của bạn

Khởi động trang web của bạn với tiếng Pháp:

```bash
npm run start -- --locale fr
```

Bạn có thể truy cập trang web đã bản địa hóa của mình tại [http://localhost:3000/fr/](http://localhost:3000/fr/) và trang `Bắt đầu` đã được dịch.

:::cảnh báo

Trong giai đoạn phát triển, mỗi lần bạn chỉ có thể dùng một vùng.

:::

## Thêm danh sách vùng thả xuống

Để điều hướng giữa các ngôn ngữ một cách trơn tru, hãy thêm một danh sách vùng thả xuống.

Chỉnh sửa tập tin `docusaurus.config.js`:

```js title="docusaurus.config.js"
module.exports = {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'localeDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

Danh sách vùng thả xuống giờ đã xuất hiện trong thanh điều hướng:

![Danh sách vùng thả xuống](./img/localeDropdown.png)

## Xây dựng trang web đã được bản địa hóa của bạn

Xây dựng trang web cho một vùng cụ thể:

```bash
npm run build -- --locale fr
```

Hoặc xây dựng một trang web để bao gồm tất cả các vùng cùng một lúc:

```bash
npm run build
```
