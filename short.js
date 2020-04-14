
new ClipboardJS('#copyto');

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
        checkvar:false
        
    },

    methods : {
       

        buildurl(url){
            this.badurl=false;
           
            if(this.url!=""){
            this.checkvar=true
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
            this.badurl=true;
            this.checkvar=false;
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
                this.stored=this.finalurl;
                this.checkvar=false;
            });
            
        }


   
    }


});


