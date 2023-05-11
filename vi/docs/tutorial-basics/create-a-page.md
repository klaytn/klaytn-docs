---
sidebar_position: 1
---

# Tạo trang

Thêm các tập tin **Markdown hoặc React** vào `src/pages` để tạo một **trang độc lập**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Tạo trang React đầu tiên của bạn

Tạo một tập tin tại `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

Đến đây, một trang mới đã có tại [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Tạo trang Markdown đầu tiên của bạn

Tạo một tập tin tại `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

Đến đây, một trang mới đã có tại [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page).
