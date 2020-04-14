const endpoint = "https://jsonbox.io/demobox_6d9e326c183fde7b";
      
    if(window.location.hash!="" ){
        var windowurl = window.location.hash.substring(1);
        console.log(endpoint+'?q=hash:'+windowurl);
        axios.get(endpoint+'?q=hash:'+windowurl)
        .then(function(response){
        var redirecturl = response.data[0].link;
        console.log(redirecturl);
        window.location= redirecturl;
        });                
        }
