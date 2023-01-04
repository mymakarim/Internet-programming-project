var form = document.getElementById('form');
form.addEventListener('submit', function(e){
	e.preventDefault();
	var checkValid = validatInputs();
	if(checkValid){
		// console.log('No Error');
		form.submit();
	}else{
		// console.log('Error');
	}
});
function validatInputs(){
	var inputs = form.querySelectorAll('.form-control');
	var valid = [];
	inputs.forEach(function(i,j){
		if(i.getAttribute('type')){
			var checkAttr = i.getAttribute('type');
		}else{
			var checkAttr = i.tagName;
		}

		switch(checkAttr){
			case 'text':
			    var _thisVal = i.value;
				if(i.getAttribute('data-name') == 'name'){
					if(!isNaN(i.value)){
						_thisVal = '';
					}
				}
				if(_thisVal==''){
					i.parentNode.classList.add("error");
					valid.push(i.getAttribute('name'));
				}else{
					i.parentNode.classList.remove("error");
				}
			break;
			case 'tel':
				if(i.value=='' || isNaN(i.value)){
					i.parentNode.classList.add("error");
					valid.push(i.getAttribute('name'));
				}else{
					i.parentNode.classList.remove("error");
				}
			break;
			case 'email':
				var regEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				if(i.value=='' || !regEmail.test(i.value)){
					i.parentNode.classList.add("error");
					valid.push(i.getAttribute('name'));
				}else{
					i.parentNode.classList.remove("error");
				}
			break;
			default:
				if(i.value==''){
					i.parentNode.classList.add("error");
					valid.push(i.getAttribute('name'));
				}else{
					i.parentNode.classList.remove("error");
				}
			break;
		}
	});

	if(valid.length>0){
		// console.log(valid.length);
		return false;
	}else{
		return true;
	}

}