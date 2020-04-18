new Vue({
  el: "#app",

  data: {
    domain: window.location.origin,
    url: "",
    urlplaceholder: "Enter long url...",
    aliasplaceholder: "Optional alias...",
    loading: false,
    badurl: false,
    alias: "",
    hash: "",
    shortUrl: "",
    finalHash: "",
    inputUrl: "",
    stored: null,
    check: "",
    badalias: false,
    words: "",
  },

  methods: {
    checkUrl(url, alias) {
      this.loading = true;
      this.badalias = false;
      this.badurl = false;
      this.urlplaceholder = "Enter long url...";
      this.aliasplaceholder = "Optional alias...";

      var fullpattern = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
      var halfpattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      if (fullpattern.test(this.url)) {
        //return this.url;
        //all correct including http and domain
        this.inputUrl = this.url;
        this.buildUrl(this.inputUrl, this.alias);
        //return (this.url);
      } else if (halfpattern.test(this.url)) {
        //return "http://"+this.url;
        //domain correct http not present
        this.inputUrl = "http://" + this.url;
        this.buildUrl(this.inputUrl, this.alias);
      } else {
        //bad url
        this.badurl = true;
        this.url = "";
        this.urlplaceholder = "Not a valid url!";
        this.loading = false;
      }
    },

    buildUrl(inputUrl, alias) {
      if (this.alias != "") {
        this.runner(this.alias);
      } else {
        this.x = this.genHash();
        console.log("generated hash-> " + this.x);
        this.runner(this.x);
      }
    },

    async runner(words) {
      console.log(words);
      const checker = await this.isalias(words);

      if (checker.data) {
        if (checker.data[0] == null) {
          console.log("Alias available");
          this.shortUrl = this.domain + "/#" + words;
          console.log(this.inputUrl);
          this.postData(words, this.inputUrl, this.shortUrl);
        } else {
          if (words == this.alias) {
            this.loading = false;
            this.badalias = true;
            this.alias = "";
            this.aliasplaceholder = "Alias is already taken...";
          } else if (words != this.alias) {
            this.runner(this.genHash());
          }
        }
      }
    },

    async isalias(words) {
      try {
        return await axios.get(endpoint + "?q=hash:" + words);
      } catch (error) {
        console.error(error);
      }
    },

    genHash() {
      var randomhash = "";
      var list = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 3; i++) {
        randomhash += list.charAt(Math.floor(Math.random() * list.length));
      }
      return randomhash;
    },

    postData(words, inputUrl) {
      console.log(words);
      axios
        .post(endpoint, {
          hash: words,
          link: inputUrl,
        })
        .then((response) => {})
        .finally(() => {
          this.stored = this.shortUrl;
          console.log(this.stored);
          this.loading = false;
        });
    },

    onCopy() {
      elem = document.getElementById("toast");
      elem.classList.add("show");
      setTimeout(function () {
        elem.classList.remove("show");
      }, 3000);
    },
  },
});
