//Variables
const courses= document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      total = document.querySelector('#total'),
      totalPrice = document.querySelector('#totalPrice'),
      deliveryPrice = document.querySelector('#deliveryPrice'),
      clearCartBtn=document.querySelector('#clear-cart');
      menuToggleBtn=document.querySelector('#menu-toggle');
      var cartItemTags = document.querySelectorAll("tr.cart-item");
      var cartItemOBJ = {};



      function checkEmpty(){
        console.log("parseInt(total.textContent): " + parseInt(total.textContent));
        if(parseInt(total.textContent) < 1){
            // hide everything and show an empty cart text
            document.querySelector('#notemptycart').setAttribute("style", "display: none;");
            document.querySelector('#emptycart').setAttribute("style", "display: inline-block;");
          }else{
            document.querySelector('#notemptycart').setAttribute("style", "display: block;");
            document.querySelector('#emptycart').setAttribute("style", "display: none;");
          }
      }
      checkEmpty();

    function onSelect_change(domEvent){
        // get the selected value :
        var selectedValue = domEvent.target[domEvent.target.selectedIndex].value;
    // you can also do it using domEvent.target.value but the other solution allows you to get every option's property you want
        console.log("Selected: " + selectedValue);
        var card = domEvent.target.parentNode.parentNode;
        var cardParent = card.parentNode;

        const itemsArray = Array.from(card.children) // make Array from his children
        const itemsParentArray = Array.from(cardParent.children) // make Array from his children
        const imageArray = ["img/course1.jpg","img/course2.jpg","img/course3.jpg","img/course4.jpg","img/course5.jpg"];

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        itemsParentArray.map(item => { // loop over his children using .map() --> see MDN for more
            if(item.classList.contains('course-image')){ // we place a test where we determine our choice
                item.src = imageArray[getRandomInt(0,4)];
            }
        })
        itemsArray.map(item => { // loop over his children using .map() --> see MDN for more
            if(item.classList.contains('price')){ // we place a test where we determine our choice
                var childsArray = Array.from(item.children); // make Array from his children
                childsArray.map(child => { // loop over his children using .map() --> see MDN for more
                    if(child.classList.contains('price-int')){ // we place a test where we determine our choice
                        child.textContent = parseInt(selectedValue);
                    }
                })
            }

            if(item.classList.contains('desc')){ // we place a test where we determine our choice
                item.textContent = "UPDATED PRICE BY PROPERTY TO: " + parseInt(selectedValue);
            }

            if(item.classList.contains('add-to-cart')){ // we place a test where we determine our choice
                item.setAttribute("data-id", "UPDATED-TITLE-BY-" + parseInt(selectedValue));
            }

            if(item.classList.contains('title')){ // we place a test where we determine our choice
                item.textContent = "UPDATED-TITLE-BY-" + parseInt(selectedValue);
            }
        })
    }

    var selectElem = document.getElementsByClassName('property');
    Array.from(selectElem).forEach(e =>{
        e.addEventListener('change', onSelect_change);
    })



//Listeners
loadEventListeners();


function loadEventListeners(){
    if(courses){
        courses.addEventListener('click', buycourse);
    }
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart);
    menuToggleBtn.addEventListener('click', toggleMenu);
}




//Functions

function buycourse(e){

    if(e.target.classList.contains('add-to-cart')){


    const course= e.target.parentElement.parentElement;

    getCourseInfo(course);

    }
}

function getCourseInfo(course){

    const courseInfo={

        image: course.querySelector('img').src,
        title:course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a.add-to-cart').getAttribute('data-id')

    }
    addIntoCart(courseInfo);
}

function addIntoCart(course){
    total.textContent = parseInt(total.textContent) + 1;
    // console.log("TOTALPRICE: ", totalPrice.textContent);
    totalPrice.textContent = parseInt(course.price) + parseInt(totalPrice.textContent);

    if(parseInt(totalPrice.textContent) < 1000){
        deliveryPrice.textContent = parseInt(totalPrice.textContent)*0.10;
    }else{
        deliveryPrice.textContent = 0;
    }

    //add new cartItem
    // if no previous record
    var found = false;
    Object.keys(cartItemOBJ).forEach(key => {
        console.log("KEY: "+ key);
        console.log("COURSE ID: "+ course.id);
        if(key == course.id){
            found = true;
            console.log("FOUND "+ key + " == "+ course.id);
            cartItemOBJ[course.id].qty += 1;
        }
    });
    console.log("OBJECT LENGTHJ: "+ Object.keys(cartItemOBJ).length);

    if(!found){
        console.log("NOT FOUND");
        if(Object.keys(cartItemOBJ).length === 0){
            cartItemOBJ = {[course.id]: {id: course.id, title: course.title, image: course.image, price: course.price, qty: 1}}
        }else{
            console.log("CART ITEM LENGTH: "+ Object.keys(cartItemOBJ).length);
            cartItemOBJ = { ...cartItemOBJ, [course.id]: {id: course.id, title: course.title, image: course.image, price: course.price, qty: 1}}
        }
    }

    //re-render cartItems
    // console.log("CART TIEM OBG IN ADDINTOCART: ");
    console.log(cartItemOBJ);
    displayCartItems(cartItemOBJ)
}

function displayCartItems(cartItemOBJ) {
    shoppingCartContent.innerHTML = "";

    // console.log("CART TIEM OBG IN DISPLAY: ");
    // console.log(cartItemOBJ);
    Object.keys(cartItemOBJ).forEach(key => {
        const row= document.createElement('tr');
        row.innerHTML= `
        <tr class="cart-item">
        <td>
        <img src="${cartItemOBJ[key].image}" class="img-100">
        </td>
        <td> ${cartItemOBJ[key].title} </td>
        <td> ${cartItemOBJ[key].price} </td>
        <td> <span class="flex-center"> <span class="minus cursor-pointer rounded flex-center" data-id="${cartItemOBJ[key].id}"  data-price="${cartItemOBJ[key].price}">-</span> ${cartItemOBJ[key].qty} <span class="plus cursor-pointer rounded flex-center" data-id="${cartItemOBJ[key].id}" data-price="${cartItemOBJ[key].price}">+</span> </span></td>
        <td> <span class="remove" data-id="${cartItemOBJ[key].id}" data-price="${cartItemOBJ[key].price}">X</span> </td>
        </tr>`;
        shoppingCartContent.appendChild(row);
      });

    //   console.log("CART TIEM OBG AFTER DISPLAY: ");
    //   console.log(cartItemOBJ);
    checkEmpty();
}

function minus(price, howmany){
    total.textContent = parseInt(total.textContent) - howmany;
    totalPrice.textContent = (parseInt(totalPrice.textContent) - (howmany * price)) ;

                if(parseInt(totalPrice.textContent) < 1000){
                    deliveryPrice.textContent = parseInt(totalPrice.textContent)*0.10;
                }else{
                    deliveryPrice.textContent = 0;
                }
}

function plus(price, howmany){
    total.textContent = parseInt(total.textContent) + howmany;
                totalPrice.textContent = (parseInt(totalPrice.textContent) + (price * howmany) );

                if(parseInt(totalPrice.textContent) < 1000){
                    deliveryPrice.textContent = parseInt(totalPrice.textContent)*0.10;
                }else{
                    deliveryPrice.textContent = 0;
                }
}

function removeCourse(e){
    if(e.target.classList.contains('minus')){
        Object.keys(cartItemOBJ).forEach(key => {
            if(key == e.target.getAttribute("data-id")){
                cartItemOBJ[key].qty -= 1;
                minus(parseInt(e.target.getAttribute("data-price")), 1);
            }
        });
        displayCartItems(cartItemOBJ)
    }
    if(e.target.classList.contains('plus')){
        Object.keys(cartItemOBJ).forEach(key => {
            if(key == e.target.getAttribute("data-id")){
                cartItemOBJ[key].qty += 1;
                plus(parseInt(e.target.getAttribute("data-price")), 1);
            }
        });
        displayCartItems(cartItemOBJ)
    }
    if(e.target.classList.contains('remove')){
        // var price = parseInt(e.target.getAttribute("data-price"));
        // var howmany = 1;
        // e.target.parentElement.parentElement.remove();
        // total.textContent = parseInt(total.textContent) - howmany;
        // totalPrice.textContent = parseInt(totalPrice.textContent) - (howmany * parseInt(price));

        // if(parseInt(totalPrice.textContent) < 1000){
        //     deliveryPrice.textContent = parseInt(totalPrice.textContent)*0.10;
        // }else{
        //     deliveryPrice.textContent = 0;
        // }

        Object.keys(cartItemOBJ).forEach(key => {
            if(key == e.target.getAttribute("data-id")){
                minus(parseInt(e.target.getAttribute("data-price")), cartItemOBJ[key].qty);
                // remove from html
                delete cartItemOBJ[key];
            }
        });
        displayCartItems(cartItemOBJ)

    }
    checkEmpty();
}

function toggleMenu() {
    var x = document.querySelector(".menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
  }

function clearCart(e){
    shoppingCartContent.innerHTML='';
    total.textContent = 0;
    totalPrice.textContent = 0;
    deliveryPrice.textContent = 0;
}


function checkout(){
    // get all fields, values, and errorfields
    var cvv = document.getElementById('cvv');
    var cvvValue = cvv.value;
    var cvvError = document.getElementById('cvvError');

    var typeValue = document.querySelector( 'input[name="payment_method"]:checked');
    var typeError = document.getElementById('typeError');

    if(typeValue != null){
        typeError.setAttribute("style", "display: none;");
    }else{
        typeError.setAttribute("style", "display: block;");
        return;
    }

    var cardNameRGEX = /^[A-Za-z]{1,15}$/;
    var cardNameError = document.getElementById('cardNameError');
    cardNameError.setAttribute("style", "display: none;");
    var cardNames = document.querySelectorAll('.cardName');
    cardNames.forEach(cardName=>{
        var cardNameValue = cardName.value;
        if (!cardNameRGEX.test(cardNameValue)) {
            cardNameError.setAttribute("style", "display: block;");
            return;
        }
    })

    // var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    // var postalRGEX = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    var cvvRGEX = /^[0-9]{3}$/;
    // var phoneResult = phoneRGEX.test(phoneNumber);
    // var postalResult = postalRGEX.test(postalCode);
    var cvvResult = cvvRGEX.test(cvvValue);

    var today, someday;
    var exMonth=document.getElementById("exMonth").value;
    var exYear=document.getElementById("exYear").value;
    var exError = document.getElementById('exError');
    today = new Date();
    someday = new Date();
    someday.setFullYear(exYear, exMonth, 1);

    if (someday < today) {
        exError.setAttribute("style", "display: block;");
        return;
    }else{
        exError.setAttribute("style", "display: none;");
    }

    if(cvvResult){
        cvv.classList.remove("error");
        cvvError.setAttribute("style", "display: none;");
    }else{
        cvv.classList.add("error");
        cvvError.setAttribute("style", "display: block;");
        return;
    }

    if(parseInt(total.textContent) <1){
        alert("There is no item in your basket!");
        return;
    }

    let text = prompt("Your calculated total cost is (" + (parseInt(totalPrice.textContent) + parseInt(deliveryPrice.textContent))  + ") USD Please confirm by typing " + (parseInt(totalPrice.textContent) + parseInt(deliveryPrice.textContent)) + " below!");
    if (text == (parseInt(totalPrice.textContent) + parseInt(deliveryPrice.textContent))) {
      alert(`Thank you for shopping with us!`);
      clearCart();
    } else {
      alert(`Application withdraw!`)
    }

  }