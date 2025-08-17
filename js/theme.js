const themeToggleBtn = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const darkIcon = document.getElementById('theme-toggle-dark-icon');

if (localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', function() {
    lightIcon.classList.toggle('hidden');
    darkIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});