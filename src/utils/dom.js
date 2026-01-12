
export function e(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    const { style, events, ...props } = attrs;
    if (props) Object.assign(el, props);
    if (style) Object.assign(el.style, style);
    if (events) {
        for (const [name, handler] of Object.entries(events)) {
            el.addEventListener(name, handler)

        }
    }
    el.append(...children);
    return el;
}