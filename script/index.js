// All restaurant card will be Apend and render here
let products=document.getElementById("products");
// NO of restaurants will be Apend and render here
let noOfRest=document.getElementById("count");
// rating will be Apend and render here
let rating=document.getElementById("rating");
// sort based on high price to low price 
let l2h=document.getElementById("l2h");
// sort based on low price to high price  
let h2l=document.getElementById("h2l");

// search bar
let search=document.getElementById("search");
// Login popup
let loginBtn=document.getElementById("login");
// Signup button
let signUpBtn=document.getElementById("signup");
// LogOut Button
let logoutBtn=document.getElementById("logout");

let userName =document.getElementById("user")

// API url
let url = "https://test-h-8359.onrender.com/";



let isLogin= JSON.parse(localStorage.getItem("loginstatus"));

let userDetails= JSON.parse(localStorage.getItem("userDetails"));




             // Logout Button EventListner

logoutBtn.addEventListener("click",()=>{
  console.log("logout");
  localStorage.setItem("loginstatus", JSON.stringify({status: false}));
  localStorage.setItem("cartData", JSON.stringify([]))
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Loged Out',
    showConfirmButton: false,
    timer: 1500
     })
    setTimeout(() => {
      redirecttohomepage();
    }, "2000");
})


let count=0;
 
// restaurants API
let ApiData=[];

// fetch url
fetch(`${url}restaurants`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
   
    ApiData= data;
   console.log(data)
   if(isLogin.status){
    console.log(userName)
    userName.innerText=userDetails.username;
    userName.style.backgroundColor="#78909C";
    userName.style.color="#FAFAFA";
    logoutBtn.innerText="Logout"
    document.querySelector("#loginidi").style.backgroundColor ="#B71C1C"
  }
  //  call renderDom function which will render all restaurants card 
    renderDOM(data);
  })
  

  //Single Card 
function renderDOMcards (item){
  let title = item.title ; 
  let price = item.budget;
  let rating=item.rating;
  let image = item.imgage;
  let cat = item.Category;
  let menu=item.menu;

  return `
  <div class="renderCards" >
      <img  src="${image}" alt="err">
      <h3>${title}</h3>
      <div class="starPrice">
      <p class="icon-star _537e4">&star;</span><span>${rating}</p>
      <p class="price" >  ₹ ${price}</p>
      </div>
      <p class="cat">  ${cat.join(" ")}</p>
      <button class="cards-buttons" data-mainc="${cat}"  data-title="${title}"  data-price="${price}" data-img1="${image}" data-rating="${rating}" data-menu=${menu}>QUICK VIEW</button>
  </div>
  `
}
  // render All card
function renderDOM(prodData){

  let arr = prodData.map((el,ind)=>{
      return renderDOMcards(el);
   })
  noOfRest.innerHTML=`<h4>${prodData.length} restaurants</h4>`;
  products.innerHTML = `
      ${ arr.join("")}
  `
  
  // catch  buttons of all cards 
  let btn=document.querySelectorAll(".cards-buttons")

 btn.forEach((item)=>{
  item.addEventListener("click",(e)=>{

    RestaurentTitle  = item.dataset.title;
    localStorage.setItem("RestaurentName",JSON.stringify(RestaurentTitle));
     window.location.href = "/restaurent.html"
  })
 })

}

// Redirect to  Home page
 function redirecttohomepage(){
  window.location.href = "/index.html"
 }

// Event Listner to sort restaurants by rating

rating.addEventListener("click",()=>{
  products.innerHTML = null;
   let filterData=ApiData.sort((a,b)=>{return b.rating - a.rating})
   renderDOM(filterData);
})

// Event Listner to sort restaurants by Low To High

l2h.addEventListener("click",()=>{
  products.innerHTML = null;
   let filterData=ApiData.sort((a,b)=>{return a.budget - b.budget})
   renderDOM(filterData);
})
// Event Listner to sort restaurants by High To Low
h2l.addEventListener("click",()=>{
  products.innerHTML = null;
   let filterData=ApiData.sort((a,b)=>{return b.budget - a.budget})
   renderDOM(filterData);
})

// Event Listner to Search
search.addEventListener("change",()=>{
  products.innerHTML = null;
  let searchText=search.value.toLowerCase();
  let filterData=ApiData.filter((item)=>{
  let title=item.title.toLowerCase();
   
   let Category=item.Category.join("").toLowerCase();

    if(title.includes(searchText) || Category.includes(searchText)){
      return true;
     }
  })
  renderDOM(filterData);
})


        // Login EventListner 



document.querySelector("#loginidi").addEventListener("click",function(){
  console.log(isLogin)
  if(isLogin.status){

    Swal.fire(
      'Login?',
      'You are still loged In? Log Out First',
      'question'
    )
  }
  else{
  document.querySelector(".popup").classList.add("active")
  }
      })
  
      document.querySelector(".popup .close-btn").addEventListener("click",function(){
  document.querySelector(".popup").classList.remove("active");
  
      })

