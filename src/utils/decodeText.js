export function decodeText(text) {
    try {
        return decodeURIComponent(escape(text));
    } catch (e) {
        return text;
    }
}
