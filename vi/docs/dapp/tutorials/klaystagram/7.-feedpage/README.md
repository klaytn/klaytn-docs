# 7. FeedPage

![FeedPage](../../../../bapp/tutorials/klaystagram/images/klaystagram-feedpage.png)

FeedPage chứa 3 thành phần chính tương tác với hợp đồng `Klaystagram`.

[7-2. Thành phần](7-2.-uploadphoto-component.md)`UploadPhoto`\
[7-3. Thành phần](7-3.-feed-component.md)`Feed`\
[7-4. Thành phần](7-4.-transferownership-component.md)`TransferOwnership`

```javascript
// src/pages/FeedPage.js

const FeedPage = () => (
  <main className="FeedPage">
    <UploadButton />               // 7-2. UploadPhoto
    <Feed />                       // 7-3. Feed
  </main>
)
```

```javascript
// src/components/Feed.js

<div className="Feed">
  {feed.length !== 0
    ? feed.map((photo) => {
      // ...
      return (
        <div className="FeedPhoto" key={id}>

            // ...
            {
              userAddress.toUpperCase() === currentOwner.toUpperCase() && (
                <TransferOwnershipButton   // 7-4. TransferOwnership
                  className="FeedPhoto__transferOwnership"
                  id={id}
                  issueDate={issueDate}
                  currentOwner={currentOwner}
                />
              )
            }
            // ...
        </div>
      )
    })
    : <span className="Feed__empty">Không có ảnh :D</span>
  }
</div>
)
```

Có 3 bước để khiến thành phần tương tác với hợp đồng.

**First**, tạo phiên bản `KlaystagramContract` để kết nối hợp đồng với front-end. **Second**, dùng phiên bản `KlaystagramContract`, tạo các hàm API tương tác với hợp đồng trong `redux/actions`\
**Third**, gọi các hàm trong mỗi thành phần

Hãy cùng nhau xây dựng nào!
