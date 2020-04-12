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
               windowurl = windowurl.replace('#','');
                console.log(endpoint+'?q=hash:'+windowurl);
                axios.get(endpoint+'?q=hash:'+windowurl)
            .then(function(response){
            var redirecturl = response.data[0].link;
            console.log(redirecturl);
           window.location.href= redirecturl;
            });                

            }
    },

    methods : {

        buildurl(url){
            if(this.url!=""){
            this.urlhash = Math.random().toString(36).substring(9);
            this.finalurl = this.reduced+"/#"+this.urlhash;
            console.log(this.finalurl);
            this.longurl=this.checkurl(this.url);
            this.posturl(this.urlhash,this.longurl)
            console.log(this.longurl);
           
            }
        },


        checkurl(url){  
            var pattern = /(http|https|ftp):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
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