import h from './vdom/createElement';
import { render } from './vdom/render';

// アカウント一覧のJSON
const INITIAL_STATE = {
    accounts: [
        {
            id: 1,
            name: "リオネル・メッシ",
            team: "FCバルセロナ",
            description:
                "アルゼンチンサンタフェ州ロサリオ出身のイタリア系アルゼンチン人サッカー選手。リーガ・エスパニョーラ・FCバルセロナ所属。アルゼンチン代表。ポジションはフォワード (wikipedia)",
            isFollow: false
        },
        {
            id: 2,
            name: "クリスティアーノ・ロナウド",
            team: "Juventus",
            description:
                "ポルトガル・フンシャル出身のサッカー選手。セリエA・ユヴェントスFC所属。ポルトガル代表。ポジションはフォワード (wikipedia)",
            isFollow: true,
        },
        {
            id: 3,
            name: "ネイマール",
            team: "パリサンジェルマン",
            description:
                "ブラジル・サンパウロ州モジ・ダス・クルーゼス出身のサッカー選手。ブラジル代表。リーグ・アン・パリ・サンジェルマンFC所属。ポジションはフォワード (wikipedia)",
            isFollow: false
        }
    ]
};

// アカウントの仮想DOMを作成するViewのコード
// (ReactやVueでいうコンポーネント)
// UI を独立した再利用できる部品として使うことができる！
const accountItem = (account) => {
    return h('div', {
        attrs: {},
        children: [
            h('div', {
                attrs: {
                    class: 'account__sumary'
                },
                children: [
                    h('p', {
                        attrs: {
                            class: 'account__name'
                        },
                        children: [account.name]
                    }),
                    h('p', {
                        attrs: {
                            class: 'account__team'
                        },
                        children: [account.team]
                    })
                ]
            }),
            h('div', {
                attrs: {},
                children: [
                    h('button', {
                        attrs: {
                            type: 'button',
                            class: `followBtn ${account.isFollow ? 'isFollow' : ''}`
                        },
                        children: [account.isFollow ? 'フォロー中' : 'フォローする']
                    })
                ]
            }),
            h('p', {
                attrs: {
                    class: 'account__description'
                },
                children: [account.description]
            })
        ],
    });
};

// View Stateをpropsという名前で受け取る
const view = (props) =>
    h('ul', {
        attrs: {
            class: 'accountList'
        },
        children: props.accounts.map((account) => {
            return h('li', {
                attrs: {
                    class: 'accountList__item'
                },
                children: [accountItem(account)]
            })
        })
    });

// レンダリングの実行
const $app = render(view(INITIAL_STATE));
const el = document.getElementById('app');
el.appendChild($app);