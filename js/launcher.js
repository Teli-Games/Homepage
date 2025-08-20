const platforms = ['windows', 'macos', 'linux'];

async function fetchLauncherInfo() {
    const apiUrl = 'https://api.teli.games/launcher/latest';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        return {
            downloadUrl: null,
            version: null,
        };
    }
}

function renderLauncherButton(data) {
    const launcherContainer = document.getElementById('launcher-container');
    let platform = 'unknown';

    if (!data || !data.platforms || !data.version) {
        launcherContainer.innerHTML = `<p class="text-red-500">Could not fetch launcher info. Please try again later.</p>`;
        return;
    }

    const userPlatform = navigator.platform.toLowerCase();

    if (userPlatform.startsWith('win')) platform = 'windows-x86_64';
    else if (userPlatform.startsWith('mac')) platform = userPlatform.includes('macintel') ? 'macintel' : 'macarm';
    else if (userPlatform.startsWith('linux')) platform = 'linux-x86_64';
    else platform = 'unknown';

    if (!data.platforms[platform]) {
        launcherContainer.innerHTML = `<p class="text-red-500">We're sorry, your platform (${[platform]}) is not supported by our launcher. Keep an eye out for when we officialy launch!</p>`;
        return;
    }

    const downloadUrl = data.platforms[platform]?.url || null;

    launcherContainer.innerHTML = `
        <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" class="inline-block bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-pixel text-lg px-8 py-4 rounded-md pixel-shadow hover:scale-105 transition-transform">
            Download v${data.version}
        </a>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const launcherData = await fetchLauncherInfo();
        renderLauncherButton(launcherData);
    } catch (error) {
        console.error('Error fetching launcher info:', error);
        const launcherContainer = document.getElementById('launcher-container');
        launcherContainer.innerHTML = `<p class="text-red-500">An error occurred while fetching the launcher information.</p>`;
    }
});