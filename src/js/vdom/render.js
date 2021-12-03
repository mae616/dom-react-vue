// 仮想DOM要素をリアルDOM要素にレンダリングする
function renderElement({ tagName, attrs, children }) {
    const $el = document.createElement(tagName);

    for (const [k, v] of Object.entries(attrs)) {
        $el.setAttribute(k, v);
    }

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