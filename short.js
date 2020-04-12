const endpoint = "https://jsonbox.io/demobox_6d9e326c183fde7b"




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
               windowurl = windowurl.replace('#','');
                console.log(endpoint+'?q=hash:'+windowurl);
                axios.get(endpoint+'?q=hash:'+windowurl)
            .then(function(response){
            var redirecturl = response.data[0].link;
            console.log(redirecturl);
           window.location.assign(redirecturl);
            });                

            }
    },

    methods : {

        buildurl(url){
            if(this.url!=""){
            this.urlhash = Math.random().toString(36).substring(9);
            this.finalurl = this.reduced+"/#"+this.urlhash;
            console.log(this.finalurl);
            this.longurl=this.checkurl();
            this.posturl(this.urlhash,this.longurl)

           
            }
        },


        checkurl(url){  
            var pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
        if (pattern.test(this.url)) {
            return this.url;
        } 
        else{
        
            return "http://"+this.url;
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