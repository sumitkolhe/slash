
const endpoint = 'https://jsonbox.io/demobox_6d9e326c183fde7b';
var windowurl = window.location.hash.substr(1);

if (Window.location.hash!=""){     
    let response = await fetch(endpoint+'?q=hash:'+windowurl);
    let data = await response.json(); // read response body and parse as JSON
    window.location.href=data[0].link;
}