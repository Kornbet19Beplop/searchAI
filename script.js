const dataAi = [
    { keywords: ["chatgpt", "ai", "chat"], link: "https://chat.openai.com/" },
    { keywords: ["claude", "ai", "chat"], link: "https://claude.ai/chat" },
    { keywords: ["cody", "programming"], link: "https://cody.md/" },
    { keywords: ["bard", "google"], link: "https://bard.google.com" },
    { keywords: ["gencraft", "game"], link: "https://gencraft.com/" }
];

function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const words = searchInput.split(' ');
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results

    for (const entry of dataAi) {
        const keywords = entry.keywords.map(keyword => keyword.toLowerCase());

        // Check if any word matches at least one keyword for an entry
        const anyWordMatches = words.some(word => {
            return keywords.some(keyword => {
                return keyword.includes(word);
            });
        });

        if (anyWordMatches) {
            const linkElement = document.createElement("a");
            linkElement.href = entry.link;

            const image = document.createElement("img");
            image.src = getImagePath(entry.keywords); // Assuming a function to get the image path
            image.alt = entry.keywords.join(", "); // Use all keywords as alt text

            linkElement.appendChild(image);
            resultDiv.appendChild(linkElement);
            resultDiv.appendChild(document.createElement("br"));
        }
    }

    if (resultDiv.children.length === 0) {
        resultDiv.textContent = "No results found";
    }
}

// Function to construct image path based on multiple keywords
function getImagePath(keywords) {
    // Assuming images are stored in a folder named "img"
    // Constructing a simple image path using the first keyword
    return `img/${keywords[0]}.png`;
}
