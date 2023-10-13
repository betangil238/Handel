const inputMessage = document.querySelector(".inputMessage");

const containerInput = document.querySelector(".containerAllMessages");

const sendButton = document.querySelector(".sendButtonClick");

/*Especificaciones para botón de enviar*/
sendButton.addEventListener("click", function(){
    const message = inputMessage.value;

    if(inputMessage.value != "") {
        containerInput.innerHTML+=`<div class="greyMessages">
        <div class="messageSent">
            <p>${message}</p>
        </div></div>`
    
        inputMessage.value=""; 
    }
})

/*Input enter*/
inputMessage.addEventListener("keydown", function(e){

    if(e.key=== 'Enter' && inputMessage.value != ""){
        const message = inputMessage.value;

        containerInput.innerHTML+=`<div class="greyMessages">
        <div class="messageSent">
            <p>${message}</p>
        </div></div>`
    
        inputMessage.value="";
    }

})



