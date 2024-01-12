> [!IMPORTANT]  
> Attention content contributors! Klaytn docs has shifted platforms, migrating from Gitbook to **Docusaurus**. For key information about this transition and its impact on your contributions, please refer to [the Klaytn docs 2.0 announcement](https://klaytn.foundation/announcing-klaytn-docs-2-0-streamlined-searchable-and-community-powered/).

This website is built using Docusaurus v3.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
