const endpoint = "https://jsonbox.io/demobox_6d9e326c183fde7b"
new ClipboardJS('#copyto');

new Vue({
    el: '#app',

    data: {
        longurl : '',
        url:'',
        urlhash:'',
        finalurl:'',
        fixedurl:'',
        stored:[],
        reduced:window.location.href,
        windowurl:''
        
        
    },

    mounted(){

            if(window.location.hash!="" ){
                windowurl = window.location.hash;
               windowurl = windowurl.substring(1);
                console.log(endpoint+'?q=hash:'+windowurl);
                axios.get(endpoint+'?q=hash:'+windowurl)
            .then(function(response){
            var redirecturl = response.data[0].link;
            console.log(redirecturl);
           window.location= redirecturl;
            });                

            }
    },

    methods : {

        buildurl(url){
            if(this.url!=""){
            this.urlhash = Math.random().toString(36).substring(9);
            this.finalurl = this.reduced+"#"+this.urlhash;
            console.log(this.finalurl);
            this.checkurl(this.url)
           
            }
        },


        checkurl(url){  
            var fullpattern = /(?:(?:https?|ftp|file):\/\/|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
            var halfpattern = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
            if (fullpattern.test(this.url)) {
            //return this.url;
            //all correct including http and domain
            this.longurl=this.url;
            this.posturl(this.urlhash,this.longurl)
            console.log(this.longurl);

        } 
        else if(halfpattern.test(this.url)){
        
            //return "http://"+this.url;
            //domain correct http not present
            this.longurl="http://"+this.url;
            console.log(this.longurl);
            this.posturl(this.urlhash,this.longurl)
            
        }
        else{
            //bad url
            alert("Please Enter a valid URL");
        }
    },

    
        posturl(urlhash,longurl){
            axios.post(endpoint,{
                hash:this.urlhash,
                link:this.longurl
                
            })
            .then(response=>{
                console.log(response);

            })
            .finally(() => {
                this.stored.push(this.finalurl);
            });
            
        }
   
    }
});