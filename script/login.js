document.getElementById('login-btn').addEventListener('click',function(event){
    event.preventDefault();
    
    const accountName= document.getElementById('input-name').value;
    const accountDigit= document.getElementById('input-pin').value;
    const pin = parseInt(accountDigit);

     if(!accountName){
       alert("Please enter a name");
       return;
     }
    
       if(pin===123456){
          alert("Login successful");

          document.getElementById("banner").style.display='none';
          
          document.getElementById("navbar").style.display='block';
          
          document.getElementById("vocabulary").style.display='block';
          
          document.getElementById("faq").style.display='block';
          
       
       }
       else{
           alert('Invalid Pin')
       }
    
   
})