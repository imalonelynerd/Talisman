export function switchTheme(theme) {
    switch (theme) {
        case "system":
            const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            switchTheme(isOsDark ? "dark" : "light");
            break;
        case "light":
            document.getElementById("icon").src = 'images/icon-light.png';
            document.querySelector('html').dataset.theme = `theme-light`;
            break;
        default:
            document.getElementById("icon").src = "images/icon-dark.png";
            document.querySelector('html').dataset.theme = `theme-dark`;
            break;
    }
    document.getElementById("theme").style.display = "none";
    return true;
}