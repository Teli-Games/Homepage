const baseApiUrl = 'https://api.teli.games/games';

function fetchGames() {
    return fetch(`${baseApiUrl}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format received');
            }
            return data;
        })
        .catch(error => {
            console.error('Error fetching games:', error);
            throw error;
        });
}

function renderGames(games) {
    const gamesGrid = document.getElementById('games-grid');
    gamesGrid.innerHTML = '';

    if (!games || games.length === 0) {
        gamesGrid.innerHTML = '<p class="col-span-full text-center">Looks like we\'re fresh out of games. Maybe check the couch cushions?</p>';
        return;
    }

    games.forEach(game => {
        let statusColor = game.statusColour;

        const gameCard = `
                    <div class="bg-white dark:bg-dark-secondary rounded-lg overflow-hidden border-4 border-light-text dark:border-dark-text pixel-shadow transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                        <img src="${game.imageUrl}" alt="Promotional art for ${game.title}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Lost+in+Space';">
                        <div class="p-6 flex flex-col flex-grow">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-pixel text-lg">${game.title}</h3>
                                <span class="text-xs font-bold px-2 py-1 rounded-md ${statusColor}">${game.status}</span>
                            </div>
                            <p class="text-sm leading-relaxed flex-grow">${game.description}</p>
                            <a href="${game.gameUrl}" target="_blank" rel="noopener noreferrer" class="mt-4 self-start inline-block bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-pixel text-xs px-4 py-2 rounded-md pixel-shadow-sm hover:scale-105 transition-transform">
                                Learn More
                            </a>
                        </div>
                    </div>
                `;
        gamesGrid.innerHTML += gameCard;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const games = await fetchGames();
        renderGames(games);
    } catch (error) {
        console.error("Failed to fetch games:", error);
        const gamesGrid = document.getElementById('games-grid');
        gamesGrid.innerHTML = '<p class="col-span-full text-center text-red-500">Oops! Our game-fetching-goblins are on strike. Please try again later.</p>';
    }
});