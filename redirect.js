const endpoint = "https://jsonbox.io/demobox_6d9e326c183fde7b";
      
var windowurl = window.location.hash.substr(1);
    if(window.location.hash!="" ){
        
        console.log(endpoint+'?q=hash:'+windowurl);
        axios.get(endpoint+'?q=hash:'+windowurl)
        .then(function(response){
        var redirecturl = response.data[0].link;
        console.log(redirecturl);
        window.location= redirecturl;
        });                
        }
