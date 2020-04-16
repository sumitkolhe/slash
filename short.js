
new ClipboardJS('#copyto');

function showToast(text){
    var x=document.getElementById("toast");
    x.classList.add("show");
    x.innerHTML=text;
    setTimeout(function(){
        x.classList.remove("show");
    },3000);}

new Vue({
    el: '#app',

    data: {
        longurl : '',
        url:'',
        urlhash:'',
        finalurl:'',
        fixedurl:'',
        stored:null,
        badurl:false,
        reduced:window.location.href,
        windowurl:'',
        loading:false,
        placeholdervalue:'Enter long url...'
        
    },

    methods : {
       

        buildurl(url){
            this.badurl=false;
            this.placeholdervalue='Enter long url...';
           
            if(this.url!=""){
            this.loading=true
            this.urlhash = Math.random().toString(36).substring(9);
            this.finalurl = this.reduced+"#"+this.urlhash;
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

        } 
        else if(halfpattern.test(this.url)){
        
            //return "http://"+this.url;
            //domain correct http not present
            this.longurl="http://"+this.url;
            this.posturl(this.urlhash,this.longurl)
            
        }
        else{
            //bad url
            this.badurl=true;
            this.url='';
            this.placeholdervalue='Not a valid url!';
            this.loading=false;
        }
    },

        posturl(urlhash,longurl){
            axios.post(endpoint,{
                hash:this.urlhash,
                link:this.longurl
                
            })
            .then(response=>{

            })
            .finally(() => {
                this.stored=this.finalurl;
                this.loading=false;
            });
            
        }


   
    }


});

