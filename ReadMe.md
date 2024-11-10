# GitHub Web Widget

[Web Components][1] library for GitHub based on [WebCell][2]

[![NPM Dependency](https://img.shields.io/librariesio/github/EasyWebApp/GitHub-Web-Widget.svg)][3]
[![CI & CD](https://github.com/EasyWebApp/GitHub-Web-Widget/actions/workflows/main.yml/badge.svg)][4]

[![NPM](https://nodei.co/npm/github-web-widget.png?downloads=true&downloadRank=true&stars=true)][5]

## Demo

https://web-cell.dev/GitHub-Web-Widget/demo/

## Components

1. [Command Line][6]
2. [Owner Profile][7] (forked from http://github-profile.com/)
3. [Repository][8] (forked from [jQuery GitHub Widget][9])
4. [Issue][10]
5. [Event Flow][11]

## Usage

### Installation

```shell
npm install dom-renderer web-cell github-web-widget
npm install parcel @parcel/config-default @parcel/transformer-typescript-tsc -D
```

### `package.json`

```json
{
    "scripts": {
        "start": "parcel source/index.html --open",
        "build": "parcel build source/index.html --public-url ."
    }
}
```

### `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "ES2020",
        "moduleResolution": "Node",
        "useDefineForClassFields": true,
        "jsx": "react-jsx",
        "jsxImportSource": "dom-renderer"
    }
}
```

### `.parcelrc`

```json
{
    "extends": "@parcel/config-default",
    "transformers": {
        "*.{ts,tsx}": ["@parcel/transformer-typescript-tsc"]
    }
}
```

### [`source/index.html`][12]

```html
<!doctype html>
<html>
    <head>
        <title>Your Blog</title>
        <link
            rel="stylesheet"
            href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
            rel="stylesheet"
            href="https://unpkg.com/github-markdown-css@5.5.0/github-markdown.css"
        />
        <link
            rel="stylesheet"
            href="https://unpkg.com/prismjs@1.29.0/themes/prism-okaidia.css"
        />
        <script src="https://polyfill.web-cell.dev/feature/ECMAScript.js"></script>
        <script src="https://polyfill.web-cell.dev/feature/WebComponents.js"></script>
        <script src="https://polyfill.web-cell.dev/feature/ElementInternals.js"></script>
        <script src="https://polyfill.web-cell.dev/feature/Detail.js"></script>
    </head>
    <body>
        <script type="module" src="index.tsx"></script>
    </body>
</html>
```

### [`source/index.tsx`][13]

```tsx
import { DOMRenderer } from 'dom-renderer';
import {
    CommandLine,
    GithubRepository,
    GithubIssue,
    GithubProfile,
    GithubEvents
} from 'github-web-widget';

new DOMRenderer().render(
    <main className="container">
        <h1>GitHub Web Widget</h1>

        <section>
            <h2>Command Line</h2>
            <CommandLine>npm install github-web-widget</CommandLine>
        </section>

        <section>
            <h2>Repository</h2>
            <GithubRepository owner="EasyWebApp" repository="WebCell" />
        </section>

        <section>
            <h2>Issue</h2>
            <GithubIssue
                owner="jsdom"
                repository="w3c-xmlserializer"
                issue="2"
            />
        </section>

        <section>
            <h2>Profile</h2>
            <GithubProfile user="TechQuery" />
        </section>

        <section>
            <h2>Event Flow</h2>
            <GithubEvents />
        </section>
    </main>
);
```

[1]: https://www.webcomponents.org/
[2]: https://web-cell.dev/
[3]: https://libraries.io/npm/github-web-widget
[4]: https://github.com/EasyWebApp/GitHub-Web-Widget/actions/workflows/main.yml
[5]: https://nodei.co/npm/github-web-widget/
[6]: https://tech-query.me/GitHub-Web-Widget/classes/commandline.commandline-1.html
[7]: https://tech-query.me/GitHub-Web-Widget/interfaces/profile.githubprofileprops.html
[8]: https://tech-query.me/GitHub-Web-Widget/interfaces/repository.githubrepositoryprops.html
[9]: http://www.newmediacampaigns.com/blog/a-beautiful-jquery-github-widget
[10]: https://tech-query.me/GitHub-Web-Widget/interfaces/issue.githubissueprops.html
[11]: https://tech-query.me/GitHub-Web-Widget/interfaces/eventflow.githubeventsprops.html
[12]: https://github.com/EasyWebApp/GitHub-Web-Widget/blob/master/test/index.html
[13]: https://github.com/EasyWebApp/GitHub-Web-Widget/blob/master/test/index.tsx
