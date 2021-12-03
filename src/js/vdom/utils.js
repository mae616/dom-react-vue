// イベントかどうか判定する関数
export const isEventAttr = (attr) => {
    // 先頭にonが着いてるかで判定
    return /^on/.test(attr);
};