class Avatar{
    constructor(lookAt,shirtColor,skinTone){
        this.mouth={x:0,y:0};

        this.eye=new Eye();
        this.beard=new Beard(this.mouth);
        this.hair=new Hair();
        this.body=new Body(shirtColor,skinTone);
        this.lookAt=lookAt;


        this.leftString=new Pendulum({x:-0.31,y:0.64});
        this.rightString=new Pendulum({x:0.31,y:0.71});

        this.frontHair=[
            new DoublePendulum({x:-0.48,y:-0.31},0.3),
            new DoublePendulum({x:-0.31,y:-0.31},0.3),
            new DoublePendulum({x:-0.13,y:-0.35},0.35),
            new DoublePendulum({x:0.01,y:-0.36},0.32),
            new DoublePendulum({x:0.13,y:-0.34},0.3),
            new DoublePendulum({x:0.26,y:-0.28},0.3),
            new DoublePendulum({x:0.35,y:-0.28},0.3),
            new DoublePendulum({x:0.49,y:-0.28},0.3)
        ]   

        this.backHair=[
            new DoublePendulum({x:-0.50,y:-0.21},0.65),
            new DoublePendulum({x:-0.36,y:-0.11},0.70),
            new DoublePendulum({x:-0.25,y:-0.25},0.87),
            new DoublePendulum({x:-0.07,y:-0.24},0.89),
            new DoublePendulum({x:0.26,y:-0.24},0.85),
            new DoublePendulum({x:0.36,y:-0.08},0.70),
            new DoublePendulum({x:0.50,y:-0.18},0.65)
        ]   

        
        this.sideHairLeft=[
            new DoublePendulum({x:-0.45,y:-0.31},0.65),
            new DoublePendulum({x:-0.38,y:-0.21},0.70),
            new DoublePendulum({x:-0.31,y:-0.35},0.87)
        ]   
        
        this.sideHairRight=[
            new DoublePendulum({x:0.45,y:-0.31},0.65),
            new DoublePendulum({x:0.38,y:-0.21},0.70),
            new DoublePendulum({x:0.31,y:-0.35},0.87)
        ]   
    }

    draw(ctx){
        ctx.save();

        const bodyXTranslate=this.lookAt.xOffset*0.02;
        const bodyXScale=1-Math.abs(this.lookAt.xOffset)*0.06;
        ctx.translate(bodyXTranslate,-0.07);
        ctx.scale(bodyXScale,1);
        
        this.backHair.forEach(p=>{
            p.update2([
                (this.lookAt.initX*2-this.lookAt.x+1*p.initLocation.x)/1,
                (this.lookAt.initY*2-this.lookAt.y+1.5*p.initLocation.y)/2.5,
            ],5);
            if(DEBUG){
                p.draw(ctx);
            }
        });
        this.#drawBackHair(ctx);

        this.body.draw(this.lookAt,ctx);
        ctx.restore();
        this.#drawHead(ctx);

        this.leftString.update(bodyXTranslate,bodyXScale);
        //this.leftString.draw(ctx);
        ctx.fillStyle="rgba(0,0,0,0.2)";
        ctx.strokeStyle="rgba(0,0,0,0.6)";
        const rad=0.05;
        ctx.beginPath();
        ctx.arc(this.leftString.initLocation.x,
            this.leftString.initLocation.y,
            rad,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth=0.04;
        ctx.moveTo(this.leftString.initLocation.x,
            this.leftString.initLocation.y);
        ctx.quadraticCurveTo(
            this.leftString.initLocation.x-0.05,
            this.leftString.initLocation.y+0.05,
            ...this.leftString.particles[1].location);
        ctx.stroke();
        ctx.lineWidth=0.01;

        this.rightString.update(bodyXTranslate,bodyXScale);
        //this.rightString.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.rightString.initLocation.x,
            this.rightString.initLocation.y,
            rad,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth=0.04;
        ctx.moveTo(this.rightString.initLocation.x,
            this.rightString.initLocation.y);
        ctx.quadraticCurveTo(
            this.rightString.initLocation.x+0.03,
            this.rightString.initLocation.y+0.05,
            ...this.rightString.particles[1].location);
        ctx.stroke();
        ctx.lineWidth=0.01;

        
        this.frontHair.forEach(p=>{
            p.update2([
                this.lookAt.x+p.initLocation.x,
                this.lookAt.y+p.initLocation.y,
            ]);
            if(DEBUG){
                p.draw(ctx);
            }
        });
        this.#drawFrontHair(ctx);
        
        this.sideHairLeft.forEach(p=>{
            p.update2([
                this.lookAt.x+p.initLocation.x,
                this.lookAt.y+p.initLocation.y,
            ]);
            if(DEBUG){
                p.draw(ctx);
            }
        });
        this.#drawSideHair(ctx,this.sideHairLeft);
        
        this.sideHairRight.forEach(p=>{
            p.update2([
                this.lookAt.x+p.initLocation.x,
                this.lookAt.y+p.initLocation.y,
            ]);
            if(DEBUG){
                p.draw(ctx);
            }
        });
        this.#drawSideHair(ctx,this.sideHairRight);
        

        
        if(DEBUG){
            drawPoint(ctx,this.lookAt,"A");
        }
    }

    #drawSideHair(ctx,obj){
        ctx.beginPath();
        ctx.strokeStyle="yellow";

        ctx.moveTo(...obj[1].particles[0].location);
        ctx.quadraticCurveTo(...obj[0].particles[1].location,
            ...obj[1].particles[2].location);
        ctx.quadraticCurveTo(...obj[1].particles[1].location,
            ...obj[2].particles[0].location);

        ctx.fillStyle="black";
        ctx.fill();
    }
    
    #drawBackHair(ctx){
        ctx.beginPath();
        ctx.strokeStyle="yellow";

        //first hair
        ctx.moveTo(...this.backHair[1].particles[0].location);
        ctx.quadraticCurveTo(...this.backHair[0].particles[1].location,
            ...this.backHair[1].particles[2].location);
        ctx.quadraticCurveTo(...this.backHair[1].particles[1].location,
            ...this.backHair[2].particles[0].location);

        //second hair
        ctx.quadraticCurveTo(...this.backHair[1].particles[1].location,
            ...this.backHair[2].particles[2].location);
        ctx.quadraticCurveTo(...this.backHair[2].particles[1].location,
            ...this.backHair[3].particles[0].location);

        //third hair
        ctx.quadraticCurveTo(...this.backHair[4].particles[1].location,
            ...this.backHair[4].particles[2].location);
        ctx.quadraticCurveTo(...this.backHair[5].particles[1].location,
            ...this.backHair[4].particles[0].location);

        //fourth hair
        ctx.quadraticCurveTo(...this.backHair[5].particles[1].location,
            ...this.backHair[5].particles[2].location);
        ctx.quadraticCurveTo(...this.backHair[6].particles[1].location,
            ...this.backHair[5].particles[0].location);

        ctx.lineTo(...this.backHair[3].particles[0].location);
        ctx.fillStyle="black";
        ctx.fill();
    }

    #drawFrontHair(ctx){
        ctx.beginPath();
        ctx.strokeStyle="yellow";

        //first hair
        ctx.moveTo(...this.frontHair[1].particles[0].location);
        ctx.quadraticCurveTo(...this.frontHair[0].particles[1].location,
            ...this.frontHair[1].particles[2].location);
        ctx.quadraticCurveTo(...this.frontHair[1].particles[1].location,
            ...this.frontHair[2].particles[0].location);

        //second hair
        ctx.quadraticCurveTo(...this.frontHair[1].particles[1].location,
            ...this.frontHair[2].particles[2].location);
        ctx.quadraticCurveTo(...this.frontHair[2].particles[1].location,
            ...this.frontHair[3].particles[0].location);

        //third hair
        ctx.quadraticCurveTo(...this.frontHair[4].particles[1].location,
            ...this.frontHair[4].particles[2].location);
        ctx.quadraticCurveTo(...this.frontHair[5].particles[1].location,
            ...this.frontHair[4].particles[0].location);

        //fourth hair
        ctx.quadraticCurveTo(...this.frontHair[5].particles[1].location,
            ...this.frontHair[5].particles[2].location);
        ctx.quadraticCurveTo(...this.frontHair[6].particles[1].location,
            ...this.frontHair[5].particles[0].location);

        //fifth hair
        ctx.quadraticCurveTo(...this.frontHair[6].particles[1].location,
            ...this.frontHair[6].particles[2].location);
        ctx.quadraticCurveTo(...this.frontHair[7].particles[1].location,
            ...this.frontHair[6].particles[0].location);

        ctx.lineTo(...this.frontHair[3].particles[0].location);
        ctx.fillStyle="black";
        ctx.fill();
    }

    #drawHead(ctx){
        ctx.strokeStyle="gray";
        ctx.beginPath();

        const B={x:0,y:-0.73};
        const verticalSquish=1-Math.abs(this.lookAt.yOffset*0.2);
        const C={
            x:this.lookAt.x,
            y:this.lookAt.y+(0.54-Math.min(0,this.lookAt.yOffset)*0.3)*verticalSquish,
        }

        ctx.beginPath();
        ctx.moveTo(B.x,B.y);
        ctx.quadraticCurveTo(-0.44,-0.71,-0.45,-0.13);
        ctx.quadraticCurveTo(-0.37,0.28,C.x,C.y);
        ctx.quadraticCurveTo(+0.37,0.28,0.45,-0.13);
        ctx.quadraticCurveTo(+0.44,-0.71,B.x,B.y);
        ctx.fillStyle=skinTone;
        ctx.fill();
    
        ctx.strokeStyle="black";
        this.#drawEyes(this.lookAt,ctx);
        this.beard.draw(this.lookAt,ctx);
        this.hair.draw(this.lookAt,ctx);
        this.#drawNose(this.lookAt,ctx);
        this.#drawEars(this.lookAt,ctx);
    }
    
    #drawEars(ref,ctx){
        ctx.save();
        ctx.translate(ref.x,ref.y);
    
        this.#drawEar(ref.xOffset,ref.yOffset,ctx);
        ctx.scale(-1,1);
        this.#drawEar(-ref.xOffset,ref.yOffset,ctx);
    
        ctx.restore();
    }
    
    #drawEar(scaleX,scaleY,ctx){
        ctx.save();
    
        const verticalSquish=1-Math.abs(scaleY*0.2)
        const horizontalSquish=1-scaleX*0.6
        ctx.scale(horizontalSquish,verticalSquish);
        ctx.translate(scaleX*0.1,0);
        ctx.moveTo(0.41,0.1);
        ctx.quadraticCurveTo(0.40,-0.02,0.48,-0.02);
        ctx.quadraticCurveTo(0.49,0.06,0.40,0.25);
        ctx.quadraticCurveTo(0.37,0.28,0.37,0.23);
        ctx.closePath();
        ctx.fillStyle=skinTone;
        ctx.fill();
        ctx.stroke();
    
        ctx.restore();
    }
    
    #drawNose(ref,ctx){
        ctx.save();
        ctx.translate(ref.x,ref.y);
    
        ctx.beginPath();
        ctx.moveTo(0,0.2);
    
        const tip={
            x:ref.xOffset*0.2,
            y:0.29
        }
    
        // TO-DO
        // 2 control points
        // do something about the line
        ctx.quadraticCurveTo(tip.x,tip.y,0,0.33);
        ctx.stroke();
    
        ctx.restore();
    }
    
    #drawEyes(ref,ctx){
        ctx.save();
        ctx.translate(ref.x,ref.y);
    
        this.eye.draw(Math.max(0,ref.xOffset),ref.yOffset,ctx);
        ctx.scale(-1,1);
        this.eye.draw(Math.max(0,-ref.xOffset),ref.yOffset,ctx);
    
        ctx.restore();
    }
}
