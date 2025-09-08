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
            <button class="text-[#1F2937] hover:bg-[#15803D] hover:text-white rounded-sm w-full text-start p-2">${category.category_name}</button>
        `
        categoriesContainer.append(categoryName)
    })
}

loadTreeCategory()