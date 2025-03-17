function showAlert() {
  Swal.fire({
          title: "Login successful!",
          icon: "success",
          draggable: true
        });
}
   function showAlert2() {
     Swal.fire({
      icon: "error",
      title: "Invalid Pin!",
      text: "Please try again.",
     
    });
}
function showAlert3() {
Swal.fire({
        icon: "error",
        title: "Enter Name!",
        text: "Please enter a name",
      });
    } 


document.getElementById('login-btn').addEventListener('click',function(event){
    event.preventDefault();
    
    const accountName= document.getElementById('input-name').value;
    const accountDigit= document.getElementById('input-pin').value;
    const pin = parseInt(accountDigit);

     if(!accountName){
      
      showAlert3()
       return;
     }
    
       if(pin===123456){
        showAlert()
        document.getElementById('input-name').value = '';
        document.getElementById('input-pin').value = '';

          document.getElementById("banner").style.display='none';
          
          document.getElementById("navbar").style.display='block';
          
          document.getElementById("vocabulary").style.display='block';
          
          document.getElementById("faq").style.display='block';
          
       
       }
       else{

        showAlert2();
         
       }
    
   
})