var inputName = document.getElementById("inputName")
var inputPrice = document.getElementById("inputPrice")
var inputCategory = document.getElementById("inputCategory")
var inputDescription = document.getElementById("inputDescription")
var inputs = document.getElementsByClassName("form-control-lg")
var submitBtn = document.getElementById("submitBtn")

var products = []
var currentIndex=0;

if(JSON.parse(localStorage.getItem("productsList"))!=null){
    products= JSON.parse(localStorage.getItem("productsList"))
    displayData()
 }

inputName.onkeyup=function(){
    var nameRegex=/^[A-Z][a-z]{2,8}$/
    if(!nameRegex.test(inputName.value))
    {
        submitBtn.disabled="true"
        inputName.classList.add("is-invalid")
        inputName.classList.remove("is-valid")
        nameAlert.classList.remove("d-none")
        return false;
    }
    else{
        submitBtn.removeAttribute('disabled')
        inputName.classList.add("is-valid")
        inputName.classList.remove("is-invalid")
        nameAlert.classList.add('d-none')

        return true;
    }
   
}

 submitBtn.onclick = function () {

    if(submitBtn.innerHTML=="Add Product"){
            addProduct()
          }else{
            updateProduct()
        
        }
        clearForm();
    displayData();
  
}

function addProduct() {
    var product =
    {
        inputName: inputName.value,
        inputPrice: inputPrice.value,
        inputCategory: inputCategory.value,
        inputDescription: inputDescription.value,
    }
    products.push(product);
    localStorage.setItem("productsList",JSON.stringify(products))
        // localStorage.setItem('productList',JSON.stringify(products))

}


function displayData() {
    cartona = ""
    for (var i = 0; i < products.length; i++) {
        cartona +=
            `
            <tr>
            <td>${i + 1}</td>
                <td>${products[i].inputName}</td>
                <td>${products[i].inputPrice}</td>
                <td>${products[i].inputCategory}</td>
                <td>${products[i].inputDescription}</td> 
                <td><button onclick=deleteProduct(${i}) class="btn btn-danger">Delete</button></td>      
                <td><button onclick=getProductInfo(${i}) class="btn btn-warning">Update</button></td>
                </tr>    
        `
    }
    document.getElementById("tableBody").innerHTML = cartona;

}


function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}


function deleteProduct(index) {
    products.splice(index, 1)
    displayData()
    localStorage.setItem('productsList',JSON.stringify(products))

}


function search(val) {
    cartona = ""
    for (i = 0; i < products.length; i++) {
        if (products[i].inputName.toLowerCase().includes(val.toLowerCase())) {

            cartona +=
                `
            <tr class="soka">
            <td>${i + 1}</td>
                <td>${products[i].inputName}</td>
                <td>${products[i].inputPrice}</td>
                <td>${products[i].inputCategory}</td>
                <td>${products[i].inputDescription}</td> 
                <td><button onclick=deleteProduct(${i}) class="btn btn-danger">Delete</button></td>   
                <td><button onclick=getProductInfo(${i}) class="btn btn-warning">Update</button></td>   
            </tr>
        `
        }
       
    }
    document.getElementById("tableBody").innerHTML = cartona;
    
}


function getProductInfo(index){
    inputName.value=products[index].inputName
    inputPrice.value=products[index].inputPrice
    inputCategory.value=products[index].inputCategory
    inputDescription.value=products[index].inputDescription
    submitBtn.innerHTML=("update Product")
    currentIndex=index;
}

function updateProduct(){
    var product = {
        inputName: inputName.value,
        inputPrice: inputPrice.value,
        inputCategory: inputCategory.value,
        inputDescription: inputDescription.value,
    }
    products[currentIndex]=product;

}    