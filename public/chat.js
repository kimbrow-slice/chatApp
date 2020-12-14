let socket = io();

socket.on('message', addMessage);

function buttonClick(){
    //send the message
    sendMessage().then(function(retVal){
        console.log("We sent a message");
    }).catch(function (error){
        console.log(error);
    });

    //get all messages
    // getMessage().then( function(messages){ 
    //     console.log(messages);

    //     let messagesArray = document.getElementById('messages');
    //     messages.forEach( function(message){        
    //         let h4= document.createElement('h4');
    //         let p = document.createElement('p');
    //         h4.innerHTML = message.name;
    //         p.innerHTML = message.message;
    //         messagesArray.appendChild(h4);
    //         messagesArray.appendChild(p);
    //     });
    // }).catch();
}
function addMessage(message){
            let messagesArray = document.getElementById('messages');
            let h4= document.createElement('h4');
            let p = document.createElement('p');
            h4.innerHTML = message.name;
            p.innerHTML = message.message;
            messagesArray.appendChild(h4);
            messagesArray.appendChild(p);
}

    async function getMessage(){
        let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"}
        }
        
        const response = await fetch("/messages", requestOptions);
        const body = await response.json();
        if(response.status != 200){
        throw Error(body.message);
        }
        
        return body;
        }

        async function sendMessage(){
            let message = {
                name: document.getElementById('name').value,
                message: document.getElementById('message').value
            }
            let requestOptions = {
            method: "POST",
            body: JSON.stringify(message),
            headers : { "Content-Type": "application/json"}
            }
            
            const response = await fetch("/messages", requestOptions);
            if(response.status != 200){
            throw Error("Error!");
            }
            
            return true;
            }
        
            