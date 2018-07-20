import { component } from 'web-cell';

import template from './index.html';

import style from './index.css';



export default  class GithubEventFlow extends HTMLElement {

    constructor() {  super().buildDOM(template, style).nextPage = 1;  }

    get URL() {

        const user = this.getAttribute('user'),
            repo = this.getAttribute('repo'),
            org = this.getAttribute('org');

        var path;

        if ( repo )
            path = `repos/${user || org || 'TechQuery'}/${repo || 'GitHub-Web-Widget'}/events`;
        else if ( user )
            path = `users/${user}/events/public`;
        else if ( org )
            path = `orgs/${org}/events`;

        if ( path )
            return `https://api.github.com/${path}?page=${this.nextPage}`;
    }

    static get observedAttributes() {  return ['user', 'org', 'repo'];  }

    async connectedCallback() {

        this.view.events.render(await this.getData());
    }

    attributeChangedCallback(name, oldValue) {

        if (oldValue != null)  this.connectedCallback();
    }

    async getData() {

        const response = await fetch( this.URL );

        const next = /page=(\d+)>; rel="next"/.exec(
            response.headers.get('Link')
        );

        this.nextPage = (next || '')[1];

        return  await response.json();
    }

    detailURLOf(event) {

        const model = event.issue || event.pull_request ||
            event.release || event.member;

        return  (model || '').html_url;
    }

    get methodMap() {

        return {
            created:    '创建',
            edited:     '编辑',
            closed:     '关闭',
            opened:     '开启',
            started:    '星标',
            published:  '发布',
            added:      '添加'
        };
    }

    get eventMap() {

        return {
            Create:                    '创建',
            Delete:                    '删除',
            Push:                      '推送',
            Watch:                     '关注',
            Issues:                    '问题',
            IssueComment:              '回复',
            Fork:                      '衍生',
            PullRequest:               '请求拉取',
            PullRequestReviewComment:  '评审',
            Release:                   '版本',
            Member:                    '成员',
            Gollum:                    '维基',
            Public:                    '公开'
        };
    }
}


component( GithubEventFlow );
