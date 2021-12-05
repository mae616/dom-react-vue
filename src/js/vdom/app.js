import { patch } from './patch';

// コントローラー　app
// 初回に実行
export const app = ({ root, initialState, view, actions }) => {
    const $el = document.querySelector(root);

    // クロージャで保持する変数
    let newNode;
    let oldNode;

    let state = initialState;

    // ディスパッチャー
    // イベントドリブンに再レンダリング処理を登録
    const dispatcher = function (actions) {
        const dispatchedActions = {};

        for (const key in actions) {
            // 要はactions内のtoggleFollowとかを取ってる
            const action = actions[key];

            dispatchedActions[key] = (option) => {
                // toggleFollowとかでstateを作り直して、setStateで更新している
                setState(action(state, option));

                // 再レンダリング
                renderDOM();
            };
        }
        // 下記のオブジェクトが作られている
        // dispatchedActions = {
        //     toggleFollow(): {
        //         setState(action(state, option));
        //          renderDOM();
        //     }
        // }
        return dispatchedActions;
    };

    // stateの更新
    const setState = function (newState) {
        if (state !== newState) {
            state = newState;
        }
    };

    // viewにstateと、dispatchさせたactionを渡す
    const updateNode = function () {
        newNode = view(state, dispatcher(actions));
    };

    // レンダリング
    // 初回とイベントドリブンで実行された時呼ばれる
    const renderDOM = function () {
        // newNodeを作る
        updateNode();

        // 差分をルートに反映する
        patch($el, newNode, oldNode);
        // oldNodeを保持
        oldNode = newNode;
    };

    renderDOM();
}