function validate(){
	var res;
var pattern=/[a-zA-Z]+[0-9]/g;
	var st,st2,x;
	st =document.getElementById("password1").value; 
    st2=document.getElementById("password2").value;    
if(st==st2&&st.length>0){
            if (pattern.test(st)) 
            	return true;
        
            	            else{
                                alert("Passwords should be alphanumeric");
            	return false;
            }
}
else{
alert("Passwords do not match");
return false;
}

}