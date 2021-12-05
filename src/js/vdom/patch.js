import { render } from './render';
import { isEventAttr, isTextChild, isVNode } from "./utils";

/**
 * 何で差分があるのか判定する
 * @param newNode 新しい仮想 DOM のオブジェクト
 * @param oldNode 以前の仮想 DOM のオブジェクト
*/
const hasChanged = (oldNode, newNode) => {

    // oldNode と newNode の type が変更されている場合
    if (typeof oldNode !== typeof newNode) {
        return 'TYPE';
    }

    // 仮想 DOM オブジェクトの配列である children の 0 番目の要素がテキストであり、
    // oldNode と newNode で変更があった場合
    if (isTextChild(oldNode) && isTextChild(newNode)) {
        if (oldNode.children[0] !== newNode.children[0]) {
            return 'TEXT';
        }
    }

    // oldNode、newNode 共に isVNode 関数で仮想 DOM のオブジェクトであるかを判定
    if (isVNode(oldNode) && isVNode(newNode)) {

        // 仮想 DOM オブジェクトの tagName が変更されている場合
        if (oldNode.tagName !== newNode.tagName) {
            return 'NODE';
        }

        // 仮想 DOM オブジェクトの attrs に変更がある場合
        if (JSON.stringify(oldNode.attrs) !== JSON.stringify(newNode.attrs)) {
            return 'ATTR';
        }
    }
    return 'NONE';
};

const updateAttrs = (target, oldAttrs, newAttrs) => {
    for (const attr in oldAttrs) {
        if (!isEventAttr(attr)) {
            // イベント(onから始まる)以外が全て外す
            target.removeAttaribute(attr);
        }
    }

    for (const attr in newAttrs) {
        if (!isEventAttr(attr)) {
            // イベント(onから始まる)以外が全て設定し直す
            target.setAttribute(attr, newAttrs[attr])
        }
    }
}

/**
 *  仮想 DOM の要素一つ一つを再帰的に処理をして、差分があるかどうかを判断してリアル DOM に反映する関数
 * @param parent 基本となる要素
 * @param newNode 新しい仮想 DOM のオブジェクト
 * @param oldNode 以前の仮想 DOM のオブジェクト
 * @param index 配列である children の何番目か
*/
export const patch = (parent, newNode, oldNode, index = 0) => {

    // 初回レンダリング
    if (!oldNode) {
        parent.appendChild(render(newNode));
    }
    const childNode = parent.childNodes[index];

    // 差分で要素が消されている場合
    if (!newNode) {
        parent.removeChild(childNode);
    }

    // DOM のオブジェクトの要素一つ一つをhasChanged 関数で そもそもタグが変更されたのかや attrs のクラスに変更があったかなどを判定
    const type = hasChanged(oldNode, newNode);

    switch (type) {
        case 'TYPE':
        case 'TEXT':
        case 'NODE':
            // newNode に置き換え
            parent.replaceChild(render(newNode), childNode);
            return;

        case 'ATTR':
            updateAttrs(childNode, oldNode.attrs, newNode.attrs);
            return;
    }

    if (newNode.tagName) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            //  newNode か oldNode に、 children の要素がまだ残っているのであれば再帰的に patch 関数が呼ばれる
            patch(childNode, newNode.children[i], oldNode.children[i], i)
        }
    }
};