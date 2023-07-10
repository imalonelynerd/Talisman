const matchMediaPrefDark = window.matchMedia('(prefers-color-scheme: dark)');

function startListeningToOSTheme() {
    matchMediaPrefDark.addEventListener('change', onSystemThemeChange);
}

function stopListeningToOSTheme() {
    matchMediaPrefDark.removeEventListener('change', onSystemThemeChange);
}

function onSystemThemeChange(e) {
    const isDark = e.matches;
    document.querySelector('html').dataset.theme =
        `theme-${isDark ? 'dark' : 'light'}`;
}

onSystemThemeChange(window.matchMedia('(prefers-color-scheme: dark)'));
startListeningToOSTheme();