const date = new Date();
export const getRandom = (max) => Math.ceil(Math.random() * max);
export const displayCurrentTime = () => `${date.getHours()}:${date.getMinutes()<10?'0':''}${date.getMinutes()}`;
export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    };
    return $tag;
};