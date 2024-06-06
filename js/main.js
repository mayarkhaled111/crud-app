var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productImg = document.getElementById("productImg");
var productSearch = document.getElementById("productSearch");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var row = document.getElementById('row')
var productList ;



// To check if localStorage null or not
if(localStorage.getItem('item') == null){
    productList = [];
} else{
    productList = JSON.parse(localStorage.getItem('item'));
    display();
}


addBtn.onclick = function () {
  addProduct();
  clean();
  display();
};

// To create object , add all details about product in it and push it into productList
function addProduct() {
  if(validation(productName) && validation(productPrice) && validation(productCat) && validation(productDesc)){
    var productObj = {
      pName: productName.value,
      pPrice: productPrice.value,
      pCat: productCat.value,
      pDesc: productDesc.value,
      pImg: `./image/${productImg.files[0]?.name}`
    };
    productList.push(productObj);
    localStorage.setItem('item',JSON.stringify(productList))
  }
}

// To clean from after adding product
function clean() {
  productName.value = null;
  productPrice.value = null;
  productCat.value = null;
  productDesc.value = null;
}

// To display products in the website
function display() {
  var box = "";
  for (var i = 0; i < productList.length; i++) {
    box += `<div class="item col-md-4 p-3">
        <div class="card position-relative">
            <span class="position-absolute badge bg-info text-light end-0">${i+1}</span>
            <img src="${productList[i].pImg}" alt="" class="w-100">
            <div class="card-body">
                <h1 class="text-center">${productList[i].pName}</h1>
                <p class="text-center text-black-50">${productList[i].pDesc}</p>
                <hr>
                <div class="txt d-flex justify-content-between text-danger fw-light">
                    <span>${productList[i].pCat}</span>
                    <span>${productList[i].pPrice}$</span>
                </div>
                <div class="buttons d-flex justify-content-around mt-3">
                  <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete <i class="fa-regular fa-trash-can"></i></button>
                  <button class="btn btn-outline-warning" onclick="editForUpdate(${i})">update <i class="fa-solid fa-pencil"></i></button>
                </div>
            </div>
        </div>
    </div>`;
  }
  row.innerHTML = box
}

function deleteProduct(index){
  productList.splice(index,1);
  display();
  localStorage.setItem('item',JSON.stringify(productList))
}

function validation(ele){
  var Regex = {
    productName: /^[A-Z][a-z]{3,10}$/,
    productPrice: /^\d{3}$/,
    productCat: /^pcs|mobiles|tvs|camera$/,
    productDesc: /^\w{3,50}\s?\w{1,}?$/,
  }
  if(Regex[ele.id].test(ele.value)){
    ele.classList.add('is-valid')
    ele.classList.remove('is-invalid')
    ele.nextElementSibling.classList.replace('d-block','d-none')
    return true
  } else{
    ele.classList.add('is-invalid')
    ele.classList.remove('is-valid')
    ele.nextElementSibling.classList.replace('d-none','d-block')
    return false
  }
}

var globalIndex ;

function editForUpdate(index){
  globalIndex = index
  updateBtn.classList.remove('d-none');
  addBtn.classList.add('d-none');
  productName.value = productList[index].pName
  productPrice.value = productList[index].pPrice
  productCat.value = productList[index].pCat
  productDesc.value = productList[index].pDesc
}

function updateFun(){
  productList[globalIndex].pName = productName.value;
  productList[globalIndex].pPrice = productPrice.value;
  productList[globalIndex].pCat = productCat.value;
  productList[globalIndex].pDesc = productDesc.value;
  display();
  localStorage.setItem('item',JSON.stringify(productList))
}

updateBtn.onclick = function(){
  updateFun()
  updateBtn.classList.add('d-none');
  addBtn.classList.remove('d-none');
}

productSearch.oninput = function(){
  search();
}

function search(){
  var term = productSearch.value.trim().toLowerCase();
  var searchedBox = '';
  for (var i = 0; i<productList.length; i++){
    if(productList[i].pName.trim().toLowerCase().includes(term) == true){
      searchedBox += `<div class="item col-md-4 p-3">
        <div class="card position-relative">
            <span class="position-absolute badge bg-info text-light end-0">${i+1}</span>
            <img src="${productList[i].pImg}" alt="" class="w-100">
            <div class="card-body">
                <h1 class="text-center">${productList[i].pName}</h1>
                <p class="text-center text-black-50">${productList[i].pDesc}</p>
                <hr>
                <div class="txt d-flex justify-content-between text-danger fw-light">
                    <span>${productList[i].pCat}</span>
                    <span>${productList[i].pPrice}$</span>
                </div>
                <div class="buttons d-flex justify-content-around mt-3">
                  <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete <i class="fa-regular fa-trash-can"></i></button>
                  <button class="btn btn-outline-warning" onclick="editForUpdate(${i})">update <i class="fa-solid fa-pencil"></i></button>
                </div>
            </div>
        </div>
    </div>`;
    }
  }
  row.innerHTML = searchedBox
}