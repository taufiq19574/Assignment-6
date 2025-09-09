const loadTreeCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayTreeCategory(data.categories))
}

const displayTreeCategory = (categories) => {
    categories.forEach(category => {
        const categoriesContainer = document.getElementById("categories-container")
        const categoryName = document.createElement("p")
        categoryName.innerHTML = `
            <button onclick="categoryTree(${category.id})" class="text-[#1F2937] hover:bg-[#15803D] hover:text-white rounded-sm w-full text-start p-2">${category.category_name}</button>
        `
        categoriesContainer.append(categoryName)
    })
}

loadTreeCategory()

const loadAllTree = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => displayAllTree(data.plants))
}

const displayAllTree = (plants) => {
    
    const treeContainer = document.getElementById("tree-container")
    treeContainer.innerHTML = "";

    plants.forEach(plant => {
        const newTree = document.createElement("div")
        newTree.innerHTML = `
                <div class="w-[98%] h-full bg-white pt-0.5 pb-4 rounded-lg">
                    <div class="w-[90%] h-[170px] mx-auto my-4">
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
                            <button class="btn btn-wide bg-[#15803D] text-white rounded-[50px]">Add to Cart</button>
                    </div>
                </div>
        `
        treeContainer.append(newTree)
    })
}

loadAllTree()

const categoryTree = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
     .then((res) => res.json())
     .then((data) => displayCategoryTree(data.plants))
}

const displayCategoryTree = (categoryTrees) => {

    const categoryTreeContainer = document.getElementById("tree-container")
    categoryTreeContainer.innerHTML = ""

    categoryTrees.forEach(categoryTree => {
        const categoryAllTree = document.createElement("div")
        categoryAllTree.innerHTML = `
                    <div class="w-[98%] h-full bg-white pt-0.5 pb-4 rounded-lg">
                        <div class="w-[90%] h-[170px] mx-auto my-4">
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
                                <button class="btn btn-wide bg-[#15803D] text-white rounded-[50px]">Add to Cart</button>
                        </div>
                    </div>
        `
        categoryTreeContainer.append(categoryAllTree)
    })
    
}


