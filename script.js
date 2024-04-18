const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemscontainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCount = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];
//Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

//Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    //alert("Clicou")
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    // console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price")) 

        addToCart(name, price)
        //Adicionar no carrinho

    }

})


//Funão para adicionar no carrinho
function addToCart(name, price){
   const existingItems = cart.find(item =>item.name === name)

   if(existingItems){
    //Se o item já existe aumenta a quantidade +1
    existingItems.quantity += 1;
   }

   else{
        cart.push({
        name,
        price,
        quantity: 1,
    })
   }

   updateCartModal()
}

//Actualiza o carrinho
function updateCartModal(){
    cartItemscontainer.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")


        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
            <p class="font-medium">${item.name}</p>
            <p>Qtd: ${item.quantity}</p>
            <p class="font-medium mt-2"> ${item.price.toFixed(3)} KZ</p>
            </div>
        
        
        <button class="remove-from-cart-btn" data-name="${item.name}">
        Remover
        </button>
        
        </div>
        `


        total += item.price * item.quantity;
        
        cartItemscontainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total;

    cartCount.innerHTML = cart.length;

}


//Remover item
cartItemscontainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.closest.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

//finalizar pedido
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        alert("RESTAURANTE FECHADO NO MOMENTO!")
        return;
    }

    //Enviar o pedido
    const cartItems = cart.map((item) => {
        return( 
        `${item.name} Quantidade: (${item.quantity}) Preço: KZ${item.price} |`
    
    )
    }).join("")
    
    const message = encodeURIComponent (cartItems)
    const phone = "244947449844"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();

    if(cart-length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }
})

//verificar a hora e manipular o horário
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 8 && hora < 22
    //true  = restaurante aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}
else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500")
}

