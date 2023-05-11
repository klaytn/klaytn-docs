---
sidebar_position: 3
---

# Tạo bài đăng blog

Docusaurus không những tạo ra một **trang cho mỗi bài đăng trên blog** mà còn sẽ tạo một **trang chỉ mục blog**, một **hệ thống thẻ**, một nguồn cấp dữ liệu **RSS**...

## Tạo bài đăng đầu tiên của bạn

Tạo một tập tin tại `blog/2021-02-28-greetings.md`:

```md title="blog/2021-02-28-greetings.md"
---
slug: greetings
title: Greetings!
authors:
  - name: Joel Marcey
    title: Co-creator of Docusaurus 1
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
  - name: Sébastien Lorber
    title: Docusaurus maintainer
    url: https://sebastienlorber.com
    image_url: https://github.com/slorber.png
tags: [greetings]
---

Congratulations, you have made your first post!

Feel free to play around and edit this post as much you like.
```

Đến đây, một bài đăng mới đã có tại [http://localhost:3000/blog/greetings](http://localhost:3000/blog/greetings).
