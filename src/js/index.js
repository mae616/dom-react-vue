import h from './vdom/createElement';
import { render } from './vdom/render';
import { app } from './vdom/app';

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

// Action
// (acctionsオブジェクトにtoggleFollowの関数を作る)
const actions = {
    toggleFollow(state, id) {
        // stateを（新しいオブジェクトで）変更する
        const accounts = state.accounts.map((account) => {
            if (account.id === id) {
                return { ...account, isFollow: !account.isFollow };
            } else {
                return account;
            }
        });

        // stateが増えた時のために、こういう書き方をしている
        return { ...state, accounts };
    }
};

// アカウントの仮想DOMを作成するViewのコード
// (ReactやVueでいうコンポーネント)
// UI を独立した再利用できる部品として使うことができる！
const accountItem = (account, action) => {
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
                            class: `followBtn ${account.isFollow ? 'isFollow' : ''}`,
                            onclick: () => action.toggleFollow(account.id)  // actionの実行
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

// View（Stateをpropsという名前で受け取る）
// propsから仮想DOMを作成する
const view = (
    props,
    action
) =>
    h('ul', {
        attrs: {
            class: 'accountList'
        },
        children: props.accounts.map((account) => {
            return h('li', {
                attrs: {
                    class: 'accountList__item'
                },
                children: [accountItem(account, action)]
            })
        })
    });

// コントローラの実行
app({
    root: '#app',
    initialState: INITIAL_STATE,
    view,
    actions
});
