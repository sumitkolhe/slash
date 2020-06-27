const endpoint = "https://jsonbox.io/box_b0a741d7d832140a6ab9";
var windowurl = window.location.hash.substr(1);

if (window.location.hash != "") {
  window.stop();

  fetch(endpoint + "?q=hash:" + windowurl)
    .then((resp) => resp.json())
    .then(function (data) {
      window.location.href = data[0].link;
    });
}
