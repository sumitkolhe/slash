
const endpoint = "https://jsonbox.io/demobox_6d9e326c183fde7b";
var windowurl = window.location.hash.substr(1);

if (window.location.hash!=""){
    
    
fetch(endpoint+'?q=hash:'+windowurl)
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) {
    window.location.href=data[0].link;
  })
}