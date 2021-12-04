import { render } from './render';

// コントローラー　app
export const app = ({ root, initialState, view, actions }) => {
    const $el = document.querySelector(root);

    let newNode;

    let state = initialState;

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
    const renderDOM = function () {
        updateNode();

        $el.appendChild(render(newNode));
    };

    renderDOM();
}