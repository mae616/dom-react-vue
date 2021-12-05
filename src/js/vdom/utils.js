// イベントかどうか判定する関数
export const isEventAttr = (attr) => {
    // 先頭にonが着いてるかで判定
    return /^on/.test(attr);
};

// 仮想DOMオブジェクトかテキストかの判定 true: 仮想DOMオブジェクト
// 本来なら数値型なのかなど他も判定するが、今回は割愛
export const isVNode = (node) => {
    return typeof node !== 'string';
};

// children が配列なのでその 0 番目が文字列かどうか判定
// 上記の isVNode では配列である下記のような場合に判定が漏れてしまうため
// cildren: ["文字列"]
export const isTextChild = (node) => {
    return (
        node && // nodeがnullとかか
        node.children && // node[children]がnullとかか
        node.children.length > 0 &&
        typeof node.children[0] === 'string'
    );
};