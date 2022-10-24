# 7. FeedPage <a id="7-feedpage"></a>

![FeedPage](../images/klaystagram-feedpage.png)

FeedPage is consisted of 3 main components that interact with `Klaystagram` contract.

[7-2. `UploadPhoto` component](7-2.-uploadphoto-component.md)  
[7-3. `Feed` component](7-3.-feed-component.md)  
[7-4. `TransferOwnership` component](7-4.-transferownership-component.md)

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
    : <span className="Feed__empty">No Photo :D</span>
  }
</div>
)
```

To make component interact with contract, there are 3 steps.

**First**, create `KlaystagramContract` instance to connect contract with front-end. **Second**, using `KlaystagramContract` instance, make API functions that interact with contract in `redux/actions`  
**Third**, call functions in each component

Let's build it!

