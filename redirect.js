const endpoint = "https://jsonbox.io/box_2c9060a39ab171a9696c";
var windowurl = window.location.hash.substr(1);

if (window.location.hash != "") {
  window.stop();

  fetch(endpoint + "?q=hash:" + windowurl)
    .then((resp) => resp.json())
    .then(function (data) {
      window.location.href = data[0].link;
    });
}
