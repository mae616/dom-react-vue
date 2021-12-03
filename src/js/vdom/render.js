import { isEventAttr } from './utils';

// attrs（イベントか属性）を設定する
// attrs = {onClck: function(), src: 'hoge' } とか
const setAttrs = (target, attrs) => {
    for (const attr in attrs) {
        if (isEventAttr(attr)) {
            // イベント onを消してる
            target.addEventListener(attr.slice(2), attrs[attr]);
        } else {
            // 属性
            target.setAttribute(attr, attrs[attr]);
        }
    }
}


// 仮想DOM要素をリアルDOM要素にレンダリングする
function renderElement({ tagName, attrs, children }) {
    const $el = document.createElement(tagName);

    // イベント・属性の設定
    setAttrs($el, attrs);

    for (const child of children) {
        $el.appendChild(render(child)); // レンダーを呼ぶ
    }

    return $el;
}

// 仮想DOMをレンダリングする
export function render(vNode) {
    // 今回は行わないが、数値かどうかの判定も本来は必要
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }
    return renderElement(vNode);
}