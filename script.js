const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("tree-container").classList.add("hidden")
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("tree-container").classList.remove("hidden")
    }
}

const loadTreeCategory = () => {
    manageSpinner(true)
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayTreeCategory(data.categories))
}

const displayTreeCategory = (categories) => {
    categories.forEach(category => {
        const categoriesContainer = document.getElementById("categories-container")
        const categoryName = document.createElement("p")
        categoryName.innerHTML = `
            <button id="category-btn-${category.id}" onclick="categoryTree(${category.id})" class="text-[#1F2937] hover:bg-[#15803D] hover:text-white rounded-sm w-full text-start p-2 category-btn">${category.category_name}</button>
        `
        categoriesContainer.append(categoryName)
    })
}

loadTreeCategory()

const loadAllTree = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            removeAllActiveBtn()
            document.getElementById("all-tree-btn").classList.add("active")
            displayAllTree(data.plants)
        })
}

const displayAllTree = (plants) => {

    const treeContainer = document.getElementById("tree-container")
    treeContainer.innerHTML = "";

    plants.forEach(plant => {
        const newTree = document.createElement("div")
        newTree.innerHTML = `
                <div class="w-[98%] h-full bg-white pt-0.5 pb-4 rounded-lg">
                    <div onclick="loadPlantDetails(${plant.id})" class="w-[90%] h-[170px] mx-auto my-4">
                        <img class="w-full h-full rounded-lg object-cover" src="${plant.image}" alt="" />
                    </div>
                    <div class="px-4">
                        <div class="h-[130px]">
                            <h4 class="text-sm text-[#1F2937] font-semibold pb-2">${plant.name}</h4>
                            <p class="text-[12px] text-[#71717A] pb-3">
                                ${plant.description}
                            </p>
                        </div>
                        <div class="flex justify-between items-center pb-3">
                            <button
                                class="btn bg-[#DCFCE7] outline-none border-none rounded-4xl text-[#15803D] text-sm"
                            >
                            ${plant.category}
                            </button>
                            <p class="text-sm font-semibold"> ৳${plant.price}</p>
                        </div>
                            <button onclick="displayPlantCart('${plant.name}', '${plant.price}')" class="btn btn-wide bg-[#15803D] text-white rounded-[50px]">Add to Cart</button>
                    </div>
                </div>
        `
        treeContainer.append(newTree)
    })
    manageSpinner(false)
}

loadAllTree()

const removeAllActiveBtn = () => {
    const activeBtn = document.querySelectorAll(".category-btn")
    document.getElementById("all-tree-btn").classList.remove("active")
    activeBtn.forEach(btn => {
        btn.classList.remove("active")
    })
}


const categoryTree = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeAllActiveBtn()
            const categoryBtn = document.getElementById(`category-btn-${id}`)
            categoryBtn.classList.add("active")
            displayCategoryTree(data.plants)
        })
}

const displayCategoryTree = (categoryTrees) => {

    const categoryTreeContainer = document.getElementById("tree-container")
    categoryTreeContainer.innerHTML = ""

    categoryTrees.forEach(categoryTree => {
        const categoryAllTree = document.createElement("div")
        categoryAllTree.innerHTML = `
                    <div class="w-[98%] h-full bg-white pt-0.5 pb-4 rounded-lg">
                        <div onclick="loadPlantDetails(${categoryTree.id})" class="w-[90%] h-[170px] mx-auto my-4">
                            <img class="w-full h-full rounded-lg object-cover" src="${categoryTree.image}" alt="" />
                        </div>
                        <div class="px-4">
                            <div class="h-[130px]">
                                <h4 class="text-sm text-[#1F2937] font-semibold pb-2">${categoryTree.name}</h4>
                                <p class="text-[12px] text-[#71717A] pb-3">
                                    ${categoryTree.description}
                                </p>
                            </div>
                            <div class="flex justify-between items-center pb-3">
                                <button
                                    class="btn bg-[#DCFCE7] outline-none border-none rounded-4xl text-[#15803D] text-sm"
                                >
                                ${categoryTree.category}
                                </button>
                                <p class="text-sm font-semibold"> ৳${categoryTree.price}</p>
                            </div>
                                <button onclick="displayPlantCart('${categoryTree.name}', '${categoryTree.price}')" class="btn btn-wide bg-[#15803D] text-white rounded-[50px]">Add to Cart</button>
                        </div>
                    </div>
        `
        categoryTreeContainer.append(categoryAllTree)
    })

}

const loadPlantDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then((data) => displayPlantDetails(data.plants))
}

const displayPlantDetails = (plant) => {
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = "";

    document.getElementById("plant_modal").showModal()
    const details = document.createElement("div")
    details.innerHTML = `
            <div class="bg-white w-[450px] mx-auto space-y-2">
              <h2 class="text-lg font-semibold">${plant.name}</h2>
              <div class="h-[200px]">
                <img class="w-full h-full rounded-sm object-cover" src="${plant.image}" alt="">
              </div>
              <p class="font-bold">Category: <span class="font-normal">${plant.category}</span></p>
              <p class="font-bold">price: <span class="font-normal">${plant.price}</span></p>
              <p class="font-bold">Description: <span class="font-normal">${plant.description}</span></p>
            </div>
    `
    detailsContainer.append(details)
}

let sum = 0;

const displayPlantCart = (name, price) => {
    const cartDetailContainer = document.getElementById("cart-detail-container")

    const newCart = document.createElement("div")
    newCart.innerHTML = `
            <div id="cart-item">
                <div class="flex justify-between items-center bg-[#F0FDF4] p-2">
                    <div>
                    <h5 class="text-sm text-[#1F2937] font-medium">${name}</h5>
                    <p class="text-sm text-[#8C8C8C]">৳ ${price}</p>
                    </div>
                    <i onclick="removeItem(${price}, this)" class="fa-solid fa-xmark cursor-pointer"></i>
                </div>
            </div>
    `
    cartDetailContainer.append(newCart)

    const displayTotalPrice = document.getElementById("total-price-count")
    displayTotalPrice.innerHTML = "";

    sum = sum + parseInt(price);

    const totalPrice = document.createElement("div")
    totalPrice.innerHTML = `
            <div class="flex justify-between items-center border-t-2 border-gray-100 mt-2 pt-2">
                <p>Total:</p>
                <p>৳ ${sum}</p>
            </div>
    `
    displayTotalPrice.append(totalPrice)
    
}

const removeItem = (price, item) => {
    const parentItem = item.closest("#cart-item")
    if (parentItem) {
        parentItem.innerHTML = "";

        const displayTotalPrice = document.getElementById("total-price-count")
        displayTotalPrice.innerHTML = ""
        sum = sum - price;

        const totalPrice = document.createElement("div")
        totalPrice.innerHTML = `
                <div class="flex justify-between items-center border-t-2 border-gray-100 mt-2 pt-2">
                    <p>Total:</p>
                    <p>৳ ${sum}</p>
                </div>
        `
        displayTotalPrice.append(totalPrice)
    }
}