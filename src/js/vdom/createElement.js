// 仮想DOMを作成する h
export default (tagName, { attrs = {}, children = [] }) => {
    const vElement = Object.create(null);

    Object.assign(vElement, {
        tagName,
        attrs,
        children,
    });

    return vElement;
}