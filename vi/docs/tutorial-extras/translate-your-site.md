---
sidebar_position: 2
---

# Dịch trang web của bạn

Hãy dịch `docs/intro.md` sang tiếng Pháp.

## Cấu hình i18n

Sửa đổi `docusaurus.config.js` để thêm hỗ trợ cho ngôn ngữ `fr`:

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

## Khởi chạy trang web đã được bản địa hóa

Khởi chạy trang web của bạn bằng tiếng Pháp:

```bash
npm run start -- --locale fr
```

Bạn có thể truy cập trang web đã bản địa hóa của mình tại [http://localhost:3000/fr/](http://localhost:3000/fr/) và trang `Bắt đầu` đã được dịch.

:::cảnh báo

Trong giai đoạn phát triển, mỗi lần bạn chỉ có thể dùng một ngôn ngữ.

:::

## Thêm danh sách ngôn ngữ thả xuống

Để điều hướng giữa các ngôn ngữ một cách liền mạch, hãy thêm một danh sách ngôn ngữ thả xuống.

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

Đến đây, danh sách ngôn ngữ thả xuống đã xuất hiện trong thanh điều hướng:

![Danh sách ngôn ngữ thả xuống](./img/localeDropdown.png)

## Xây dựng trang web đã được bản địa hóa

Xây dựng trang web cho một ngôn ngữ cụ thể:

```bash
npm run build -- --locale fr
```

Hoặc xây dựng trang web để gộp đồng thời tất cả các ngôn ngữ:

```bash
npm run build
```
