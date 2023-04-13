
// User  Details
let userDetails= JSON.parse(localStorage.getItem("userDetails"));
console.log(userDetails);
// User ID
const userId =  userDetails.id;  
// User Name
const userToUpdate = userDetails.username;
// Address of User
let savedAddress=[];

// Restorent Details
let singleprodInfo= JSON.parse(localStorage.getItem("singleProduct"))
console.log(singleprodInfo)
// Saved Address of User
let billDetails= document.getElementById("savedAddress");
// Order Items
let dishData=document.getElementById("dish");
// Tax Amount will be append and render here
let renderTax=document.getElementById("tax");

let totalPrice= 0;

// Sum of all items price will be append and render here
let renderpriceHere=document.getElementById("itemTotal");
// Sum of all items price with tax and delevery charge will be append and render here
let renderTotalAmount=document.getElementById("Total_price")
// restorent name will be render here
let title_img=document.getElementById("title");

let cartData = JSON.parse(localStorage.getItem("cartData"));
console.log(cartData)


// login Status and userID 

 let isLogin= JSON.parse(localStorage.getItem("loginstatus"));


// event listner to add Address
 let addAddresssBtn=document.getElementById("addAddress");
 addAddresssBtn.addEventListener("click",()=>{

   document.querySelector(".popup").classList.add("active")
       })
     document.querySelector(".popup .close-btn").addEventListener("click",function(){
   document.querySelector(".popup").classList.remove("active");   
 })

 
//  window.load  EventListener

window.addEventListener("load",()=>{
       //  fetch user Details and save it to userDetails
    // fetch(`https://test-h-8359.onrender.com/users/${userId}`)
    // .then(response => response.json())
          
    //     userDetails=data;
   

    fetch(apiUrl)
.then(response => response.json())
.then(data => {
  // Find the user to update
  
  const user = data.find(user => user.username === userToUpdate);
  userDetails=user;
  console.log(userDetails)


  for(let i=0;i< userDetails.cart.length;i++){
    let price=+userDetails.cart[i].price;
    let quantity=+userDetails.cart[i].quantity;
    totalPrice+=+price*quantity;
  }

                // calculate Tax Amount

  let taxAmount=(totalPrice*18)/100;
  
             // calculate Total Pay

  let totalAmt=totalPrice+taxAmount+55;

  localStorage.setItem("addres",JSON.stringify(userDetails.address))

   renderAll(userDetails.address);
   allDish(userDetails.cart);
   renderpriceHere.innerHTML=` <p>Item Total </p>
   <p>₹ ${totalPrice}</p>`

   renderTax.innerHTML=`
   <p>Govt Taxes (18%) </p>
   <p>₹ ${taxAmount}</p>
   `
   renderTotalAmount.innerHTML=`
   <p>TO PAY </p>
   <p>₹ ${totalAmt}</p>
   `
   title_img.innerHTML=`
   <img src="${singleprodInfo.imgage}" alt="">
         <h3>${singleprodInfo.title}</h3>
   `

 //  let decreasebtn=document.querySelectorAll(".decrease")
 //  decreasebtn.forEach((item)=>{
 //   item.addEventListener("click",()=>{
 //     let quantity=document.querySelector(".quant")
 //     quantity.innerHTML= "2"
 //   })
 //  })




 


    
   let deleteBtn=document.querySelectorAll(".delete");
   console.log(deleteBtn)
   deleteBtn.forEach((item)=>{
    item.addEventListener("click",event=>{
     
       console.log("ijsdfisj")
       const card = item.closest('.card');
       const line1 = card.querySelector('p:nth-child(2)').textContent.trim();
       const line2 = card.querySelector('p:nth-child(3)').textContent.trim();
       const dis = card.querySelector('p:nth-child(4)').textContent.trim().split(',');
       const pin = card.querySelector('p:nth-child(4) span').textContent.trim();
       const state = card.querySelector('p:nth-child(5)').textContent.trim();
       const country = card.querySelector('p:nth-child(6)').textContent.trim();

       let adressDetails={};

       adressDetails.addressLine1=line1;
       adressDetails.addressLine2=line2;
       adressDetails.distric=dis[0];
       adressDetails.state=state;
       adressDetails.pinCode=pin;
       adressDetails.country=country;

       // console.log(adressDetails);
       // console.log(userDetails.address);
       let addressIndex = -1;
       for(let i=0;i<userDetails.address.length;i++){
           if(userDetails.address[i].addressLine1 === adressDetails.addressLine1   && userDetails.address[i].addressLine2 == adressDetails.addressLine2 ){
               addressIndex=i;
           }
       }
       // console.log(addressIndex);
       // console.log(apiUrl);
       // console.log(userDetails.username);
    

       fetch(apiUrl)
       .then(response => response.json())
       .then(users => {
          // Find the user with the given username
         const user = users.find(user => user.username === userDetails.username);
         console.log(users)
         if (user) {
          // Delete the address at the given index
        user.address.splice(addressIndex, 1);
 
          //   Update the user profile on the server
         fetch(`${apiUrl}/${user.id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)
            })
        .then(response => response.json())
        .then(updatedUser => {
        console.log(`Address deleted for user ${updatedUser.username}`)
        window.location.href = "/cart.html" 
          })
        .catch(error => console.error(error));
          } 
         else {
              console.log(`User with username ${username} not found`);
           }
       })
       .catch(error => console.error(error));


      })
  })

  let deleverHere= document.querySelectorAll(".deleverHere");

   // console.log(paymentOption)
   deleverHere.forEach((deleverhere)=>{
       deleverhere.addEventListener("click",()=>{

           const card = deleverhere.closest('.card');
           const line1 = card.querySelector('p:nth-child(2)').textContent.trim();
           const line2 = card.querySelector('p:nth-child(3)').textContent.trim();
           const dis = card.querySelector('p:nth-child(4)').textContent.trim().split(',');
           const pin = card.querySelector('p:nth-child(4) span').textContent.trim();
           const state = card.querySelector('p:nth-child(5)').textContent.trim();
           const country = card.querySelector('p:nth-child(6)').textContent.trim();
          
           let adressDetails={};

           adressDetails.addressLine1=line1;
           adressDetails.addressLine2=line2;
           adressDetails.distric=dis[0];
           adressDetails.state=state;
           adressDetails.pinCode=pin;
           adressDetails.country=country;

           console.log(adressDetails)

           billDetails.innerHTML=`<div id="deleverHere">
           <h3>Home</h3>
           <p>${adressDetails.addressLine1}, ${adressDetails.addressLine1}</p>
           <p>${adressDetails.distric}, ${adressDetails.state},PinCode:- ${ adressDetails.pinCode}</p>
           <p>${adressDetails.country}</p>
           <h5>30 MINS</h5>
           <button id="changeAdd">Change</button>
           </div>`
          
           Swal.fire({
               position: 'top-end',
               icon: 'success',
               title: 'GO to Payment',
               showConfirmButton: true,
               timer: 1500
             })
         let changeAddress=document.getElementById("changeAdd");
         changeAddress.addEventListener("click",()=>{
          window.location.href = "/cart.html" 
         })
           
       })
   })

})
       
                      // calculate Totall Price
          
   
       

    
    
 })
        

  
//  Add Adress form 



let address1 = document.getElementById("addressOne");
let address2 = document.getElementById("addressTwo");

let distric =document.getElementById("Dist");
let state =document.getElementById("state");

let pinCode=document.getElementById("pinCode");

let Country=document.getElementById("Country")
   
let submitForm=document.querySelector("form")

let apiUrl = "https://test-h-8359.onrender.com/users";




submitForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let adressObj={}
    if (address1.value === "" || address2.value === "" || Dist.value === "" || state.value =="" || pinCode.value == "" || Country.value=="") {
        alert("Please fill  correct value in the input fields.");
        return;
    }
   
    adressObj.addressLine1=address1.value;
    adressObj.addressLine2=address2.value;
    adressObj.distric=Dist.value;
    adressObj.state=state.value;
    adressObj.pinCode=pinCode.value;
    adressObj.country=Country.value;
    

    userDetails.address.push(adressObj);
    console.log(userDetails);

fetch(apiUrl)
.then(response => response.json())
.then(data => {
  // Find the user to update
  
  const user = data.find(user => user.username === userToUpdate);
  
  if (!user) {
    throw new Error(`User ${userToUpdate} not found`);
  }

  // Update the user's cart data
  user.address = userDetails.address;
  console.log(user);
  // Submit the updated user data to the API
  return fetch(`${apiUrl}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
})
.then(response => {
    if (!response.ok) {
      throw new Error(`Failed to update user ${userToUpdate}: ${response.status} ${response.statusText}`);
    }
    console.log(`User ${userToUpdate} Adddress updated successfully`);
    window.location.href = "/cart.html"
  
  })
  .catch(error => {
    console.error(`Error updating user ${userToUpdate}: ${error.message}`);
  });
      
})
    

// All function start from here 



// function to render saved Address 
function renderAll(addressData){

      let dataCode= addressData.map((item)=>{
              return renderAddress(item);
          })
     billDetails.innerHTML=` ${dataCode.join("")} `;
}


// function to render one card of saved Address

function renderAddress(data){
    let line1= data.addressLine1;
    let line2=data.addressLine2;
    let distric=data.distric;
    let state=data.state;
    let Pin=data.pinCode;
    let country=data.country;
    return `
    <div class="card">
      <img src="https://i.pinimg.com/originals/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg" alt="">
        <div>
          <h4>Home</h4>
          <p>${line1}</p>
          <p>${line2}</p>
          <p>${distric},<span>${Pin}</span></p>
          <p>${state}</p>
          <p>${country}</p>
          <button class="deleverHere" data-line1="${line1}" data-line2="${line2}" data-dis="${distric}" data-pin="${Pin}" data-state="${state}" data-country="${country}" >DELEIVER HERE</button>
          <button class="delete" style="background-color: red;" data-line1="${line1}" data-line2="${line2}" data-dis="${distric}" data-pin="${Pin}" data-state="${state}" data-country="${country}" ">Delete</button>
        </div>
    </div>
    `
}




function allDish(items){
         let id=0;
          let dataCode= items.map((el)=>{
            id=id+1;
            return renderDish(el,id);
          })
          dishData.innerHTML=`${dataCode.join("")}`;


          const increaseButton = document.querySelectorAll('.increase');
          const decreaseButton = document.querySelectorAll('.decrease');
          console.log(increaseButton)

          increaseButton.forEach((button) => {
            let id=0;
            button.addEventListener("click", () => {
              
              console.log(userDetails);
              console.log(button.dataset.name)
             let  sample =userDetails.cart.find(cart => cart.name === button.dataset.name);
             sample.quantity=sample.quantity+1; 
             console.log(sample.quantity);
             console.log(userDetails)
               localStorage.setItem("userDetails",JSON.stringify(userDetails));
               allDish(userDetails.cart);


               for(let i=0;i< userDetails.cart.length;i++){
                let price=+userDetails.cart[i].price;
                let quantity=+userDetails.cart[i].quantity;

                totalPrice+=+price*quantity;
               }

                         // calculate Tax Amount

               let taxAmount=(totalPrice*18)/100;

               console.log(taxAmount)


                      // calculate Total Pay

           let totalAmt=totalPrice+taxAmount+55;
       
               renderpriceHere.innerHTML=` <p>Item Total </p>
               <p>₹ ${totalPrice}</p>`
   
               renderTax.innerHTML=`
               <p>Govt Taxes (18%) </p>
               <p>₹ ${taxAmount}</p>
                `
               renderTotalAmount.innerHTML=`
               <p>TO PAY </p>
               <p>₹ ${totalAmt}</p>`


                });
                });
          
          decreaseButton.forEach((button) => {
            button.addEventListener("click", () => {
              console.log(userDetails);
              console.log(button.dataset.name)
              let sample1 =userDetails.cart.find(cart => cart.name === button.dataset.name);

              console.log(sample1)

             if(sample1.quantity>1){
               sample1.quantity=sample1.quantity-1; 
               console.log(sample1.quantity);
               console.log(userDetails)
                 localStorage.setItem("userDetails",JSON.stringify(userDetails));
                //  window.location.href = "/cart.html"
                allDish(userDetails.cart)
              }
              else{
                  
                let newCart = [];
                for(let i=0;i<userDetails.cart.length;i++){
                  if(userDetails.cart[i].name !== sample1.name){
                    newCart.push(userDetails.cart[i]);
                  } 
                }
                userDetails.cart = newCart;
                console.log(userDetails)
                allDish(userDetails.cart);
                console.log(apiUrl);
                console.log(userDetails.id)
                fetch(`${apiUrl}/${userDetails.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(userDetails)
                     })
                 .then(response => response.json())
                 .then(updatedUser => {
                 console.log(`cart ${updatedUser.username}`)
                 window.location.href = "/cart.html" 
                   })
                 .catch(error => console.error(error));
              }

            });
          });

}

// function to render one item in cart
function renderDish(data,id){
    let name= data.name;
    let price= data.price;
    let quantity=data.quantity;
 return `
     <div>
     <div>
         <p>${name}</p>
         </div>
         <div>
             <button class="decrease" data-name="${name}" >-</button>
             <p id="quant${id}" data-name="${name}" > ${quantity}</p>
             <button class="increase" data-name="${name}" >+</button>
         </div>
         <div>
         <p id ="itemPrice${id}"> ₹ ${price*quantity}</p>
         </div>
     </div>`
}

// Payment 
let displayCard=document.getElementById("display")

let walletsPayment=document.getElementById("wallets");

let upiPayment=document.getElementById("upi");

let cardPayment =document.getElementById("cards")

walletsPayment.addEventListener("click",()=>{

   
    console.log(userDetails);
let totalAmt=0;
    for(let i=0;i<userDetails.cart.length;i++){
      let price=+userDetails.cart[i].price;
      let quantity=+userDetails.cart[i].quantity
      totalAmt+=price*quantity;
    }
    
    let tax=(totalAmt*18)/100;
    totalAmt=totalAmt+tax+55;
    upiPayment.style.backgroundColor = "#E0E0E0";

    cardPayment.style.backgroundColor = "#E0E0E0";

    walletsPayment.style.backgroundColor = "white";

    console.log("done");
    displayCard.innerHTML=`<div class="paymentCard">
    <img src="/image/logo_pay-primary-fullcolor-positive.webp" alt="">
    <h4>Amazon Pay</h4>
    <button class="placeOrder">PAY ₹ ${totalAmt}</button>
 </div>
 <div class="paymentCard">
    <img src="/image/paytm.png" alt="">
    <h4>Paytm</h4>
    <button class="placeOrder">PAY ₹ ${totalAmt}</button>
 </div>
 <div class="paymentCard">
    <img src="/image/phonepe_icon_aca9jf.png" alt="">
    <h4>Paytm</h4>
    <button class="placeOrder">PAY ₹ ${totalAmt}</button>
 </div>`


 const paymentCards = document.querySelectorAll('.placeOrder');
 console.log(paymentCards)
 paymentCards.forEach(card => {
  //  const button = card.querySelector('button');
   card.addEventListener('click', () => {
    userDetails.cart=[];
    console.log(userDetails)
    fetch(`${apiUrl}/${userDetails.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails)
         })
     .then(response => response.json())
     .then(updatedUser => {
      localStorage.setItem("userDetails",JSON.stringify(updatedUser))
     console.log(`cart ${updatedUser.username}`)
     window.location.href = "/cart.html" 
       })
     .catch(error => console.error(error));



     Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: `Order Placed`,
         showConfirmButton: false,
         timer: 1500
       })
 
       setTimeout(() => {
        window.location.href = "/index.html"
       }, "1000");

   });
 });

})

upiPayment.addEventListener("click",()=>{

    upiPayment.style.backgroundColor = "white";

    cardPayment.style.backgroundColor = "#E0E0E0";

    walletsPayment.style.backgroundColor = "#E0E0E0";

    displayCard.innerHTML=`<div class="upiPayment">
    <input type="text" placeholder="Enter UPI">
    <p><span><input type="checkbox"></span> Securely save this VPA for a faster checkout next time.</p>
    <button>VERIFY AND PAY ₹${totalAmt}</button>
  </div>
`


})


cardPayment.addEventListener("click",()=>{
    upiPayment.style.backgroundColor = "#E0E0E0";

    cardPayment.style.backgroundColor = "white";

    walletsPayment.style.backgroundColor = "#E0E0E0";


    displayCard.innerHTML=`<div class="cardPayment">
    <h3>Enter your card details</h3>
    <input type="text" id="cardNumber" placeholder="Card number">
    <input type="text" id="date" placeholder="Valid through(MM/YY)">
    <input type="number" id="cvv"placeholder="CVV">
    <input type="text" id="cardName"placeholder="Name on card" >
    
    <p><span><input type="checkbox"></span> Securely save this card for a faster checkout next time.</p>
    <button>Pay  ₹ ${totalAmt}</button>
 </div>`
})


function redirecttohomepage(){
    window.location.href = "/index.html"
   }


