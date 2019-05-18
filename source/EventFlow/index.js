import { component, mapProperty, mapData, request } from 'web-cell';

import GithubElement from 'github-element';

import template from './index.html';

import style from './index.less';

@component({ template, style })
export default class GithubEventFlow extends GithubElement {
    constructor() {
        super().nextPage = 1;

        this.ready.then(() =>
            new IntersectionObserver(entry => {
                for (let item of entry)
                    if (item.isIntersecting)
                        return this.viewChangedCallback(this.view.data);
            }).observe(this.view.root.lastElementChild)
        );
    }

    @mapProperty
    static get observedAttributes() {
        return super.observedAttributes.concat('repo');
    }

    @mapData
    attributeChangedCallback() {}

    get URL() {
        const { user, repo, org } = this;

        var path;

        if (repo) {
            path = `repos/${user || org || 'TechQuery'}/${repo ||
                'GitHub-Web-Widget'}/events`;
        } else if (user) {
            path = `users/${user}/events/public`;
        } else if (org) {
            path = `orgs/${org}/events`;
        }

        if (path) return `https://api.github.com/${path}?page=${this.nextPage}`;
    }

    async viewChangedCallback({ user, org, repo }) {
        if (!user && !org && !repo) return;

        const list = await this.getData();

        if (list[0]) this.view.events = list;
    }

    async getData() {
        const {
            headers: { Link },
            body
        } = await request(this.URL);

        const { next } = Link || '';

        this.nextPage = next ? +next[1] : this.nextPage + 1;

        return body;
    }

    detailURLOf(event) {
        const model =
            event.issue || event.pull_request || event.release || event.member;

        return (model || '').html_url;
    }

    get methodMap() {
        return {
            created: '创建',
            edited: '编辑',
            closed: '关闭',
            opened: '开启',
            started: '星标',
            published: '发布',
            added: '添加'
        };
    }

    get eventMap() {
        return {
            Create: '创建',
            Delete: '删除',
            Push: '推送',
            Watch: '关注',
            Issues: '问题',
            IssueComment: '回复',
            Fork: '衍生',
            PullRequest: '请求拉取',
            PullRequestReviewComment: '评审',
            Release: '版本',
            Member: '成员',
            Gollum: '维基',
            Public: '公开'
        };
    }
}
