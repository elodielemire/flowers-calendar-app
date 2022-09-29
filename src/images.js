export function getImgUrl(pic) {
    return new URL(`assets/pictures/${pic}`, import.meta.url).href
}