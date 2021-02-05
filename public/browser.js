function ourHTML(item){
    return `
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">${item.text}</span>
                <div>
                    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
    </li>
    `
}
let inputField = document.getElementById('input-field')
let itemList = document.getElementById('item-list')

let itemHTML = items.map(function(item){
    return ourHTML(item)
})
//Remove duplicate code for item list
itemList.insertAdjacentHTML("beforeend",itemHTML)
//Create item
document.getElementById('create-form').addEventListener('submit', function(e){
    e.preventDefault()
    axios.post('/create-item',{textInput: inputField.value}).then(function(response){
        itemList.insertAdjacentHTML('beforeend', ourHTML(response.data))
        inputField.value = ""
        inputField.focus()
    }).catch(function(){
        console.log('Try again to create.')
    })
})

document.addEventListener('click', function(e){
    // Delete item
    if(e.target.classList.contains('delete-me')){
        if(confirm("R u sure?")){
            axios.post("/delete-item",{id: e.target.getAttribute('data-id')}).then(function(){
                e.target.parentElement.parentElement.remove()
            }).catch(function(){
                console.log("Try delete it again")
            })
        }
    }
    // Update item
    if(e.target.classList.contains('edit-me')){
        let inputField = prompt('Add your item',e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if(inputField){
            axios.post('/update-item',{text: inputField, id: e.target.getAttribute('data-id')}).then(function(){
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = inputField
            }).catch(function(){
                console.log("Try Again!!")
            })
        }
    }
})