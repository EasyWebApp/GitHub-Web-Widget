import { DOMRenderer } from 'dom-renderer';
import { configure } from 'mobx';

import {
    CommandLine,
    GithubEvents,
    GithubIssue,
    GithubProfile,
    GithubRepository
} from '../source';

configure({ enforceActions: 'never' });

new DOMRenderer().render(
    <main className="container">
        <h1>GitHub Web Widget</h1>

        <section>
            <h2>Command Line</h2>
            <CommandLine text="npm install github-web-widget" />
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
                issue={2}
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
