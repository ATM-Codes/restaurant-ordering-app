import {menuArray} from './data.js'

const feedContainer = document.getElementById('feed');
const orderContainer = document.getElementById('order');
const orderList = document.getElementById('order_list');
const totalAmount = document.getElementById('total_amount')

feedContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('add_btn')){
        let id = e.target.dataset.id;
        console.log(`Button clicked for item id: ${id}`)
        orderList.innerHTML = getOrderHtml(id)
        totalAmount.innerText = addItemsTotal(id)
    }
    })

orderContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('remove_btn')){
         const itemId = parseInt(e.target.dataset.id, 10);
         console.log(`removeButton was clicked: ${itemId}`)
         removeItem(itemId ,e)
    }
})


function getFeedHtml(){
    
    let feedHtml = ``
    
    menuArray.forEach(function(food){           
        feedHtml += `
            <div class="product_card">
                <div class="pc_left_align">
                    <h1 class="prod_emoji">${food.emoji}</h1>
                    <div class="product_details">
                        <h1 class="prod_name">${food.name}</h1>
                        <h3 class="prod_ingredients">${food.ingredients}</h4>
                        <h2 class="prod_price">${food.price}</h2>
                    </div>
                </div>
                <div class="pc_right_align">
                     <button class="add_btn" data-id=${food.id}>+</button>
                </div>
            </div>`
   })
   return feedHtml 
}

function getFoodItemById(stringId) {

    let targetId = parseInt(stringId, 10);
    console.log("Item id at getFoodByItem is:",targetId)
    return menuArray.find(function(food) {
        return food.id === targetId;
    });
}


function getOrderHtml(id){
    let orderListHtml = orderList.innerHTML
    let totalText = totalAmount.innerText
    let orderListCharCount = orderListHtml.length
    // console.log("order list count:", orderListCharCount) 
    // console.log("Id at getorderHTML", id)
    let item = getFoodItemById(id)
    // console.log("Item at getorderHtml: ",item)
    if(orderContainer.classList == 'hidden'){
            orderContainer.classList.toggle('flex')
            orderListHtml+=
            `<div class="order_line" data-price=${item.price}>
                    <div class="order_name">
                        <h2>${item.name}</h2>
                        <button class="remove_btn" data-id=${item.id}>Remove</button>
                    </div>
                    <h2>\n$ ${item.price}</h2>
                </div>`
    
    }else{
            orderListHtml+=
            `<div class="order_line" data-price=${item.price}>
                    <div class="order_name">
                        <h2>${item.name}</h2>
                        <button class="remove_btn" data-id=${item.id}>Remove</button>
                    </div>
                    <h2>\n$ ${item.price}</h2>
                </div>`
    }
        
        return orderListHtml        
}


function addItemsTotal(id){
    let tempTotal = totalAmount.innerText
    let item = getFoodItemById(id)
    if(tempTotal.length==0){
        tempTotal = item.price
     }else{
        tempTotal = parseInt(tempTotal)+item.price
     }
    console.log(`Total amount in text after assigning ${tempTotal}`)
    
    return tempTotal
}

function removeItem(id, event){
     
     let tempTotal = totalAmount.innerText
     console.log("Current Total", tempTotal)
     let targetItem = event.target.closest('.order_line')
     console.log(targetItem.dataset.price)
      if(targetItem){
        tempTotal = tempTotal - parseInt(targetItem.dataset.price, 10)
        console.log("Total after removing item:", tempTotal)
        targetItem.remove()
        totalAmount.innerText = tempTotal
        }
    if(orderList.innerHTML.trim()==="" )
    {
      orderContainer.classList.remove('flex')
      orderContainer.classList.add('hidden')
    }
}


function render(){
    feedContainer.innerHTML = getFeedHtml()
}


render()