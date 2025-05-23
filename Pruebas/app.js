const itemInput = document.getElementById("itemInput");
const quantityInput = document.getElementById("quantityInput");
const shoppingList = document.getElementById("shoppingList");
const btn = document.getElementById("addBtn");
const totalItems = document.getElementById("totalItems")
const showAll = document.getElementById("showAll");
const showCompleted = document.getElementById("showCompleted");
const showNoCompleted = document.getElementById("showPending");

function addItem() {
    const userValue = itemInput.value;
    const quantity = quantityInput.value || 1;

    if (!userValue.trim()) {
        alert("Debes escribir un producto")
    } else {
        const newLi = document.createElement("li");
        newLi.innerHTML = `<span class="item">${quantity} x ${userValue}</span>
    <div>
        <button class="complete-btn"><i class="fas fa-check"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`

        shoppingList.appendChild(newLi)

        itemInput.value = "";
        quantityInput.value = "";
    }
    updateCounter()
}

btn.addEventListener("click", addItem);

[itemInput, quantityInput].forEach(input => {
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            addItem()
        }
    })
})


function handleListClick(event) {
    const clickedIcon = event.target;
    if (clickedIcon.classList.contains("fa-trash")) {
        if (confirm("¿Seguro que quieres eliminar este artículo?")) {

            const btnToDelete = clickedIcon.closest("li");
            btnToDelete.remove()
        }

    } else {
        if (clickedIcon.classList.contains("fa-check")) {
            const checkItem = clickedIcon.closest("li");
            checkItem.classList.toggle("completed")
        }
    }
    itemInput.focus()

    updateCounter()

}

shoppingList.addEventListener("click", handleListClick)

function updateCounter() {
    let shoppingListCounter = shoppingList.querySelectorAll("li").length;

    totalItems.textContent = shoppingListCounter

}

function showCompletedItems() {
    const allItems = shoppingList.querySelectorAll("li");

    allItems.forEach((item) => {
        if (item.classList.contains("completed")) {
            item.style.display = "flex"
        } else {
            item.style.display = "none"
        }
    })
}

function showNoCompletedItems() {
    const allItems = shoppingList.querySelectorAll("li");

    allItems.forEach((item) => {
        if (item.classList.contains("completed")) {
            item.style.display = "none"
        } else {
            item.style.display = "flex"
        }
    })
}


function showAllItems() {
    const allItems = shoppingList.querySelectorAll("li");

    allItems.forEach((item) => {
        item.style.display = "flex"
    })
}

showAll.addEventListener("click", showAllItems);
showCompleted.addEventListener("click", showCompletedItems);
showNoCompleted.addEventListener("click", showNoCompletedItems)