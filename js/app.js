//Variables
const courses= document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      total = document.querySelector('#total'),
      totalPrice = document.querySelector('#totalPrice'),
      deliveryPrice = document.querySelector('#deliveryPrice'),
      clearCartBtn=document.querySelector('#clear-cart');
      menuToggleBtn=document.querySelector('#menu-toggle');


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
                // return item.children;

                // item.children[2].textContent = parseInt()

                childsArray.map(child => { // loop over his children using .map() --> see MDN for more
                    if(child.classList.contains('price-int')){ // we place a test where we determine our choice
                        child.textContent = parseInt(selectedValue);
                    }
                })
            }

            if(item.classList.contains('desc')){ // we place a test where we determine our choice
                item.textContent = "UPDATED PRICE BY PROPERTY TO: " + parseInt(selectedValue);
            }
            if(item.classList.contains('title')){ // we place a test where we determine our choice
                item.textContent = "UPDATED TITLE BY: " + parseInt(selectedValue);
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
        id: course.querySelector('a').getAttribute('data-id')

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

    const row= document.createElement('tr');
    row.innerHTML= `
    <tr>
    <td>
    <img src="${course.image}" width=100>
    </td>
    <td> ${course.title} </td>
    <td> ${course.price} </td>
    <td> <span class="remove" data-id="${course.id}" data-price="${course.price}">X</span> </td>
    </tr>

    `;
    shoppingCartContent.appendChild(row);
    checkEmpty();
}

function removeCourse(e){
    if(e.target.classList.contains('remove')){
        var price = parseInt(e.target.getAttribute("data-price"));
        e.target.parentElement.parentElement.remove();
        total.textContent = parseInt(total.textContent) - 1;
        totalPrice.textContent = parseInt(totalPrice.textContent) - parseInt(price);

        if(parseInt(totalPrice.textContent) < 1000){
            deliveryPrice.textContent = parseInt(totalPrice.textContent)*0.10;
        }else{
            deliveryPrice.textContent = 0;
        }
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

    let text = prompt("Your calculated total cost is (" + totalPrice.textContent + ") USD Please confirm by typing " + totalPrice.textContent + " below!");
    if (text == totalPrice.textContent) {
      alert(`Thank you for shopping with us!`);
      clearCart();
    } else {
      alert(`Application withdraw!`)
    }

  }