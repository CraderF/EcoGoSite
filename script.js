document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    setupShopPage();
    setupTreeInteraction();
    displayFacts();
    loadProductImages(); 
});

function setupShopPage() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const item = {
                id: product.getAttribute("data-id"),
                name: product.getAttribute("data-name"),
                price: parseFloat(product.getAttribute("data-price"))
            };

            addToCart(item);
        });
    });
}

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); 
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountElement = document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function loadProductImages() {
    const imageMap = {
        "1": "images/ecogo_waterbottle_filter_product_image.png",
        "2": "images/bamboo_bags_inuse_product_image.png",
        "3": "images/bamboo_toothbrush_product_image.png"
    };
    
    document.querySelectorAll(".product").forEach(product => {
        const productId = product.getAttribute("data-id");
        const imgElement = product.querySelector("img");
        if (imageMap[productId] && imgElement) {
            imgElement.src = imageMap[productId];
        }
    });
}

function growTreeAnimation() {
    const treeContainer = document.getElementById("tree-container");
    const treeStages = ["🌱", "🌿", "🌳"];
    let stageIndex = 0;
    treeContainer.textContent = treeStages[stageIndex];

    const interval = setInterval(() => {
        stageIndex++;
        if (stageIndex >= treeStages.length) {
            clearInterval(interval);
        } else {
            treeContainer.textContent = treeStages[stageIndex];
        }
    }, 1000); 
}

function setupTreeInteraction() {
    const growButton = document.getElementById("grow-tree-btn");
    if (growButton) {
        growButton.addEventListener("click", growTreeAnimation);
    }
}

function displayFacts() {
    const facts = [
        "Recycling one aluminum can saves enough energy to run a TV for three hours!",
        "Turning off the tap while brushing your teeth can save 8 gallons of water per day.",
        "Plastic can take up to 1,000 years to decompose in landfills!",
        "Switching to energy-efficient light bulbs can reduce greenhouse gas emissions.",
        "Trees provide oxygen for us all — plant one today!"
    ];

    let factIndex = 0;
    const factContainer = document.createElement("div");
    factContainer.id = "fact-container";
    factContainer.style.textAlign = "center";
    factContainer.style.padding = "20px";
    factContainer.style.fontSize = "18px";
    factContainer.style.color = "#2e8b57";

    document.querySelector(".hero").appendChild(factContainer);

    setInterval(() => {
        factContainer.textContent = facts[factIndex];
        factIndex = (factIndex + 1) % facts.length;
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".hero button");
    const searchBar = document.getElementById("search-bar");

    searchButton.addEventListener("click", () => {
        const query = searchBar.value.trim();
        if (query) {
            alert(`You searched for: ${query}`);
        } else {
            alert("Please enter a search term.");
        }
    });
});
