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

    if (!data || !data.downloadUrl || !data.version) {
        launcherContainer.innerHTML = `<p class="text-red-500">Could not fetch launcher info. Please try again later.</p>`;
        return;
    }

    launcherContainer.innerHTML = `
        <a href="${data.downloadUrl}" target="_blank" rel="noopener noreferrer" class="inline-block bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-pixel text-lg px-8 py-4 rounded-md pixel-shadow hover:scale-105 transition-transform">
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