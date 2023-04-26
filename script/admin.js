
// Get the signup form 
let form = document.querySelector("form");

// Restaurent data 
let updatadata = document.getElementById("updatadata");

// Admin side API url
let adminsidefetchurl="https://test-h-8359.onrender.com/restaurants"

// Table Data will be append here
let tbody = document.getElementById("tbody");

let btnnn1 = document.getElementById("btn1");
let btn = document.getElementById("btn");
let undateidis = document.getElementById("undateidis");
let sortbyprice = document.getElementById("sortbyprice");
let sortbyrating = document.getElementById("sortbyrating");
let searchbar = document.getElementById("searchbar");
var count = 20;
let finaldata;
var sortfetchdata ;
var length;

let adminForm = document.getElementById("updateForm")
// console.log(adminForm.innerHTML)

// window.load eventListner









window.addEventListener("load",()=>{

let fetchdata = fetch(adminsidefetchurl);
     fetchdata
     .then((data) => {
        return data.json();
       })
     .then((data) => {
      // Restaurents Data
       finaldata = data;
       console.log(data)  
       sortfetchdata = data;
       length =data.length;

       localStorage.setItem("clearsorting",JSON.stringify(data));

       renderAllRestro(data);

       sortbyprice.addEventListener("change",()=>{
        if(sortbyprice.value == "lowtohigh"){
          tbody.innerHTML="";
          let filterData =data.sort((a,b)=>{return a.budget - b.budget});
          renderAllRestro(filterData);
        }
        else if(sortbyprice.value == "hightolow"){
          tbody.innerHTML="";
          let filterData =data.sort((a,b)=>{return b.budget - a.budget});
          renderAllRestro(filterData);
        }
      })
      sortbyrating.addEventListener("change",()=>{
        if(sortbyrating.value == ">4"){
          tbody.innerHTML="";
          let filterData =data.filter((a)=> {
            return a.rating > 4; // return true for even numbers
          });
          renderAllRestro(filterData);
        }
        else if(sortbyrating.value == "hightolow"){
          tbody.innerHTML="";
          let filterData =data.sort((a,b)=>{return b.rating - a.rating});
          renderAllRestro(filterData);
        }
      })



       let DeleteRestro=document.querySelectorAll(".delete")
        console.log(DeleteRestro)
       DeleteRestro.forEach((item)=>{
       item.addEventListener("click",()=>{
           let Id= item.dataset.id;
           console.log(Id)
       let promptnum = parseInt(prompt("Please Enter product ID to Confirm"));
       if (promptnum  == Id ){
       console.log(Id);
      //  swal("Processing...");
       let newRestroData = [];
        data.forEach((item)=>{
          if(item.id != Id){
            newRestroData.push(item)
          }
       })
       console.log(newRestroData)

       fetch(`${adminsidefetchurl}/${Id}`, {
        method: 'DELETE',
        
       })
       .then(response => {
        if (response.ok) {
          console.log('Restaurant deleted successfully');
          window.location.href = "admin.html";
        } else {
          console.error('Restaurant could not be deleted');
        }
      })
      .catch(error => {
        console.error('Error deleting restaurant:', error);
      });
    

      
    }
   else {
       Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
           })

    }
  });
 })
       });
      })









      





function renderSingleRestro(data){

  return `
  <tr>
    <td>
      <div class="adminsiseimg">
        <img src="${data.imgage}">
        </div>
        </td>
        <td>${data.id}</td>
        
        <td>${data.title}</td>
        <td>${data.budget}</td>
        
        <td>${data.rating}<span>&star;</span></td>
        <td class="update"  data-rating="${data.rating}" data-title="${data.title}" data-id="${data.id}" data-budget="${data.budget}" data-img="${data.imgage}" data-cat="${data.Category}" >Update</td>
        <td class="delete" data-id="${data.id}" >Delete</td>
        </tr>`
}

function renderAllRestro(data){
  let arr = data.map((el,ind)=>{
  return renderSingleRestro(el);
    })

  tbody.innerHTML=`${arr.join("")}`;

  let updateRestro =document.querySelectorAll(".update")

  console.log(updateRestro)
  updateRestro.forEach((item)=>{
    item.addEventListener("click",function(){

      document.getElementById("updatadata").style.display = 'block';
      document.getElementById("undateId").innerText= item.dataset.id;
      document.getElementById("name").value=item.dataset.title;
      document.getElementById("img").value=item.dataset.img;
      document.getElementById("price").value=item.dataset.budget;
      document.getElementById("rating").value=item.dataset.rating;
      document.getElementById("cat").value=item.dataset.cat;

        let updateDetails=document.getElementById("btn");
          updateDetails.addEventListener("click",(e)=>{
               e.preventDefault();
               console.log("kasjfk");
               let newRestaurent={};
               newRestaurent.id=item.dataset.id;
               newRestaurent.title= adminForm.name.value;
               newRestaurent.budget= adminForm.price.value;
               newRestaurent.Category= adminForm.cat.value.split(",").map(String);
               newRestaurent.rating=adminForm.rating.value;
               newRestaurent.imgage=adminForm.img.value;
               newRestaurent.menu=[];
               console.log(newRestaurent);
               localStorage.setItem("newRestaurent",JSON.stringify(newRestaurent));
               localStorage.setItem("menu",JSON.stringify({listNo :0}));
               localStorage.setItem("opration",JSON.stringify({states :"Update"}));

               window.location.href = "addMenu.html";
        })
    })
  })
 






  let updateDetails=document.getElementById("btn");


  updateDetails.addEventListener("click",()=>{



  })
  
 

}



document.querySelector(".close-btn").addEventListener("click",function(){
  document.getElementById("updatadata").style.display = 'none';
  
      })


      let urlUser="https://test-h-8359.onrender.com/users"

      const Adminform = document.getElementById('adminForm');
    
      
    
    Adminform.addEventListener('submit', (event) => {
      event.preventDefault();
     console.log("submit");
      const name = document.getElementById('adminName').value;
      const username = document.getElementById('adminUsername').value;
      const contact = document.getElementById('contact').value;
      const password = document.getElementById('adminPassword').value;
    
      fetch("https://test-h-8359.onrender.com/users")
        .then((res) => res.json())
        .then((data) => {
          let existingUsername = data.find(user => user.username === username);
          let existingname = data.find(user => user.name === name);
          if (existingUsername) {
            // User already exists, do not allow sign up
            Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '"This username is already taken. Please choose another one."',
      footer: '<a href="">Why do I have this issue?</a>'
    })
           
    setTimeout(() => {
      window.location.href = "/admin.html"
      }, "1000");
          }
         else if(existingname) {
          Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '"This name is already taken. Please choose another one."',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    setTimeout(() => {
      window.location.href = "/admin.html"
      }, "1000");
          
         }
      else{
      const data = {
        name: name,
        username: username,
        contact: contact,
        password: password,
        cart:[],
        admin:"true",
        address:[]
        
      };
    
      fetch('https://test-h-8359.onrender.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data)=> {
        console.log(data);
        Swal.fire({
      position: 'top-end',
      icon: 'success',
      title:` Welcome! ${data.name}.You have successfully created an account with "GARDEN OF EAT'N "`,
      showConfirmButton: false,
      timer: 1500
      })
        
        window.location.href = "/admin.html"
      })
      .catch(error => console.error(error));
    
        }
    
    });
    });
