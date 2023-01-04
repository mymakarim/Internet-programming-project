//Variables
const courses= document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      total = document.querySelector('#total'),
      totalPrice = document.querySelector('#totalPrice'),
      deliveryPrice = document.querySelector('#deliveryPrice'),
      clearCartBtn=document.querySelector('#clear-cart');


    function onSelect_change(domEvent){
        // get the selected value :
        var selectedValue = domEvent.target[domEvent.target.selectedIndex].value;
    // you can also do it using domEvent.target.value but the other solution allows you to get every option's property you want
        console.log("Selected: " + selectedValue);
        var card = domEvent.target.parentNode.parentNode;

        const itemsArray = Array.from(card.children) // make Array from his children

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
        })
        // console.log("PICKONE: ", pickOne);

        // pickOne.map(child => { // loop over his children using .map() --> see MDN for more
        //     if(child.classList.contains('price-int')) // we place a test where we determine our choice
        //         console.log(child);
        //     })
    }

    var selectElem = document.getElementsByClassName('property');
    Array.from(selectElem).forEach(e =>{
        e.addEventListener('change', onSelect_change);
    })



//Listeners
loadEventListeners();


function loadEventListeners(){
    courses.addEventListener('click', buycourse);
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart);
    // document.addEventListener('DOMContentLoaded', getFromLocalStorage);
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

    // saveIntoStorage(course);
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
}

function clearCart(e){
    shoppingCartContent.innerHTML='';
    total.textContent = 0;
    totalPrice.textContent = 0;
    deliveryPrice.textContent = 0;
}

function saveIntoStorage(course){

let courses= getCoursesFromStorage();

courses.push(course);

localStorage.setItem('courses', JSON.stringify(courses));
}

function getCoursesFromStorage(){
    let courses;

    if(localStorage.getItem('courses')===null){
        courses=[];
    } else{
        course= JSON.parse(localStorage.getItem('courses'));

    }
    return courses;
}

function getFromLocalStorage(){
    let coursesLS= getCoursesFromStorage();


     coursesLS.forEach(function(course) {


        const row= document.createElement('tr');
        row.innerHTML= `
    <tr>
    <td>
    <img src="${course.image}" width=100>
    </td>
    <td> ${course.title} </td>
    <td> ${course.price} </td>
    <td> <span class="remove" data-id="${course.id}">X</span> </td>


    </tr>

    `;
        shoppingCartContent.appendChild(row);
     });

}

function checkout(){

    // get all fields, values, and errorfields
    var cvv = document.getElementById('cvv');
    var cvvValue = cvv.value;
    var cvvError = document.getElementById('cvvError');

    var cardNameRGEX = /^[A-Za-z]{1,15}$/;
    var cardNameError = document.getElementById('cardNameError');
    cardNameError.setAttribute("style", "display: none;");
    var cardNames = document.querySelectorAll('.cardName');
    cardNames.forEach(cardName=>{
        var cardNameValue = cardName.value;
        if (!cardNameRGEX.test(cardNameValue)) {
            cardNameError.setAttribute("style", "display: block;");
        }
    })

    var typeValue = document.querySelector( 'input[name="payment_method"]:checked');
    var typeError = document.getElementById('typeError');

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
    }else{
        exError.setAttribute("style", "display: none;");
    }

    if(cvvResult){
        cvv.classList.remove("error");
        cvvError.setAttribute("style", "display: none;");
    }else{
        cvv.classList.add("error");
        cvvError.setAttribute("style", "display: block;");
    }

    if(typeValue != null){
        typeError.setAttribute("style", "display: none;");
    }else{
        typeError.setAttribute("style", "display: block;");
    }

  }