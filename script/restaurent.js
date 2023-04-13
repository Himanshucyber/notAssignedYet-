


// Restaurent API
let url="https://test-h-8359.onrender.com/restaurants"

// User API
const apiUrl = 'https://test-h-8359.onrender.com/users';
// User Details
let userDetails= JSON.parse(localStorage.getItem("userDetails"));
console.log(userDetails);
// Login Status
let isLogin= JSON.parse(localStorage.getItem("loginstatus"));
const userId =  userDetails.id;

// User To Update
const userToUpdate = userDetails.username;

// All details will Append here
let productTemp = document.getElementById("product");
// All dish will be Appended here
let menuRender= document.getElementById("menu");

// Get data of single Restaurent 
let RestaurentName=JSON.parse(localStorage.getItem("RestaurentName"));

// Button for Add to Cart
let renderCartData=document.getElementById("addtocartBtn");
// 
let userData; 
// console.log(userDetails);

var RestaurentData;
let cartDetails=userDetails.cart ;
// console.log(cartDetails)


let menu=[];

let userName =document.getElementById("user")

let logoutBtn=document.getElementById("logout");


if(isLogin.status){
  console.log(userName)
  userName.innerText=userDetails.username;
  userName.style.backgroundColor="#80CBC4";
  logoutBtn.innerText="Logout"
}





window.addEventListener("load",()=>{
   
       fetch(`${url}`)
       .then((res)=>{
         return res.json();
        })
      .then((data)=>{
        console.log(RestaurentName)
        console.log(data)
        
        let allRestroData =data;
      
       console.log(allRestroData)
       for(let i=0;i<allRestroData.length;i++){
         if(RestaurentName == allRestroData[i].title){
           RestaurentData=allRestroData[i]
         }
       }
       console.log(RestaurentData)
       renderDish(RestaurentData.menu);
       renderTop(RestaurentData)

       JSON.stringify(localStorage.setItem("singleProduct",JSON.stringify(RestaurentData)));

      let addToCart=document.querySelectorAll(".AddtoCart");
   // console.log(addToCart)
      
      addToCart.forEach((item)=>{
        item.addEventListener("click",()=>{
   
        if(!isLogin.status){
         Swal.fire(
         'Login?',
         'LogIn First',
         'question'
         )
        }
        else{
         let flag=false;
          let DisDetails={};
          DisDetails.name=item.dataset.name;
          DisDetails.serve=item.dataset.serve;
          DisDetails.price=item.dataset.price;
          DisDetails.image=item.dataset.img;
          DisDetails.description=item.dataset.desc;
          DisDetails.quantity=1;

           console.log(RestaurentData);
           for(let i=0;i<cartDetails.length;i++){
              if(DisDetails.name == cartDetails[i].name){
                flag=true;
                break;
              }
            }
          if(flag){
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Item allready added to cart!',
            footer: '<a href="">Why do I have this issue?</a>'
            })
          }
         else{
          
         cartDetails.push(DisDetails);
         console.log(cartDetails)
         localStorage.setItem("cartData",JSON.stringify(cartDetails));
         }
   
   
         let cartPrice =0;
         for(let i=0;i<cartDetails.length;i++){
            cartPrice+=+cartDetails[i].price;
           }
            if(cartDetails.length>0){
          renderCartData.innerHTML=`
          <div id="cart">  
          <h3>${userDetails.cart.length} Items |₹${cartPrice} </h3>
          </div>`
        
         renderCartData.addEventListener("click",()=>{
          // Fetch the current user data and update the cart
          fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
          // Find the user to update
      
           const user = data.find(user => user.username === userToUpdate);
           if (!user) {
             throw new Error(`User ${userToUpdate} not found`);
            }
   
             // Update the user's cart data
               user.cart = userDetails.cart;
   
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
    
     console.log(`User ${userToUpdate} cart updated successfully`);
    
   })
   .catch(error => {
     console.error(`Error updating user ${userToUpdate}: ${error.message}`);
   });
   Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `User ${userToUpdate} cart updated successfully`,
    showConfirmButton: false,
    timer: 1500
  })
  setTimeout(() => {
    window.location.href = "/cart.html"
  }, "2000");
       })
      }
     }
    })
    })
   })
   
    fetch(`https://test-h-8359.onrender.com/users/${userId}`)
    .then(response => response.json())
    .then((data)=>{
      console.log(data)
       userData=data;
      //  console.log(userData)
      let cartPrice =0;

      let cartData=data.cart;
      console.log(cartData)
     for(let i=0;i<cartData.length;i++){
      cartPrice+=+cartData[i].price;
     }
     if(cartData.length>0){
     renderCartData.innerHTML=`
     <div id="cart">  
     <h3>${cartData.length} Items |₹${cartPrice} </h3>
     </div>`


        renderCartData.addEventListener("click",()=>{
          console.log("ofkjdj");
          console.log(cartData)
           // Fetch the current user data and update the cart
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
           // Find the user to update
            const user = data.find(user => user.username === userToUpdate);
         if (!user) {
         throw new Error(`User ${userToUpdate} not found`);
           }
         // Update the user's cart data
         user.cart = userDetails.cart;
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
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `User ${userToUpdate} cart updated successfully`,
        showConfirmButton: false,
        timer: 1500
        }) 
        setTimeout(() => {
         window.location.href = "/cart.html"
        }, "1000");
        console.log(`User ${userToUpdate} cart updated successfully`);
        })
        .catch(error => {
        console.error(`Error updating user ${userToUpdate}: ${error.message}`);
        });
        })
     }


     })
})





                               // Functions Start from here

function renderTop (item){

    let title = item.title; 
    let price = item.budget;
    let rating=item.rating;
    
    let cat = item.Category
    ;
  
    productTemp.innerHTML=`
    <div id="top">
    <p>Home / ${title}</p>
    
    </div>
      <div id="details">
        <div>
        <h3>${title}</h3>
        <p>${cat}</p>
        <p>less than 20km</p>
        </div>
        <div class="starPrice">
        <p class="icon-star _537e4">&star;</span><span> ${rating}</p>
        <p class="price" > 1k + ratings</p>
        </div>
    </div>
    <div id="time">
    <i class="fa-regular fa-clock"></i>
    <h3>17 MINS</h3>
    <i class="fa-solid fa-indian-rupee-sign"></i>
    <h3>${price} for two</h3>
</div>
 <div id="cuppon">
    <div>
        <h4>20% OFF UPTO ₹50</h4>
        <p>USE TRYNEW | ABOVE ₹159</p>
    </div>
    <div>
        <h4>50% OFF UPTO ₹200</h4>
        <p>USE TRYNEW | ABOVE ₹500</p>
    </div>
    <div>
        <h4>40% OFF UPTO ₹110</h4>
        <p>USE TRYNEW | ABOVE ₹199</p>
    </div>

 </div>
    `
   

  }
  

function redirecttohomepage(){
    window.location.href = "/index.html"
   }

function renderDish(data){
  let arr = data.map((el,ind)=>{
    return renderMenu(el);
 })

 menuRender.innerHTML = `
    ${ arr.join("")}
`
}

function renderMenu(item){
 
    let name=item.name;
    let price=item.price;
    let serve=item.serves;
    let desc=item.description;
    
    let img=item.image;
  

    return ` <div>
     <div>
    <h3>${name}</h3>
    <i class="fa-solid fa-indian-rupee-sign"><span>${price}</span></i>
   <p>serves ${serve} |<span> ${desc}</span></p>
 </div>
 <div>
     <img src="${img}" alt="">
     <button class="AddtoCart"   data-name="${name}"  data-serve="${serve}"  data-price="${price}" data-img="${img}" data-desc="${desc}" } >Add+</button>
     </div>
     </div>`
   
}

