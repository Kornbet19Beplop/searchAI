// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwMlqQ63_8YLE7Gm-HTeFxGjA8WMRkT10",
    authDomain: "searchai-a4b8d.firebaseapp.com",
    projectId: "searchai-a4b8d",
    storageBucket: "searchai-a4b8d.appspot.com",
    messagingSenderId: "301180826333",
    appId: "1:301180826333:web:75150fced3537601326134",
    measurementId: "G-5JBBEE3HW9",
    databaseURL: "https://searchai-a4b8d-default-rtdb.asia-southeast1.firebasedatabase.app", // Update this line
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const database = getDatabase(app);

async function getDataFromFirebase() {
    const aiLinksRef = ref(database, 'aiLinks');
    try {
        const snapshot = await get(aiLinksRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            // Transform data into an array
            const dataArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
            return dataArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Ensure that you return a default value in case of an error
    }
}



async function search() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const words = searchInput.split(' ');
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results

    const dataAi = await getDataFromFirebase();

    for (const entry of dataAi) {
        const keywords = entry.keywords.map(keyword => keyword.toLowerCase());

        // Check if at least one word in the user input is present in at least one keyword for an entry
        const atLeastOneWordPresent = words.some(word => {
            return keywords.some(keyword => {
                return keyword.includes(word);
            });
        });

        console.log(`Entry: ${JSON.stringify(entry)}, At Least One Word Present: ${atLeastOneWordPresent}`);

        if (atLeastOneWordPresent) {
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




document.getElementById("searchButton").addEventListener("click", search);
// Function to construct image path based on multiple keywords
function getImagePath(keywords) {
  // Assuming images are stored in a folder named "img"
  // Constructing a simple image path using the first keyword
  return `img/${keywords[0]}.png`;
}
