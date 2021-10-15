

    function el(css){
        return document.querySelector(css);
    };

(function(){

    let animate = false; 
    let co = el('#canvas');
    let ctx = co.getContext('2d');
    let multiOnOff = false; 

    let automat = {
        color1  : 'yellow',
        color2  : 'blue',
        max     : 200, 
        currGen : [], 
        nextGen : [], 
        init    : function(){
                let ww = window.innerWidth;
                let abstand = 4; 
                
                let w = Math.floor(ww / this.max - abstand);
                let h = w;
                
                co.width = (w + abstand) * this.max;


                let xPos  = 1;
                let yPos  = 1;
                // pro Kästchen ein Object anlegen
                for (let i = 0; i < this.max; i ++){
                    let rect = {};
                    rect.x = xPos;
                    rect.y = yPos;
                    rect.w = w;
                    rect.h = h;
                    rect.col = this.color1;

                    xPos += w + abstand;

                    if(i === this.max/2){
                        rect.col = this.color2;
                    };

  
                    this.currGen.push(rect);
                    
                    this.drawCanvas(rect);

                }; 

                console.log(this.currGen)



        },
        setRow  : function(){
                    for (let i = 0; i < this.max; i ++){

                        if(this.nextGen[i]){
                            this.currGen[i].col = this.color2;
                        }else{
                            this.currGen[i].col = this.color1;
                        };

                        this.drawCanvas(this.currGen[i]);
                    }; 
                },
        update  : function(){

                let left,right,status;

                for (let i = 1; i < this.max -1; i ++){
               
                    left = (this.currGen[i-1].col === this.color2);
                    
                    right = (this.currGen[i+1].col === this.color2);
                 
                    status = (left !== right);
                 
                    this.nextGen[i] = status;
                };
               
        },
        drawCanvas:function(rect){

            ctx.fillStyle = rect.col;
            ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);
            ctx.fillRect(rect.x,rect.y,rect.w,rect.h);

            rect.y += rect.w + 4;
            if (rect.y > co.height){
         
                rect.y = 1;
            };
        } 

    };

    function render(){
        setTimeout(render,1000);
        automat.update();
        automat.setRow();
    };

   
    automat.init();


 // Nur zum Testen
        render();
// ###############

}());
   

 













    