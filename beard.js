class Beard{
    constructor(mouthInfo){
        this.mouthInfo=mouthInfo;
    }

    draw(ref,ctx){
        ctx.save();
        ctx.translate(ref.x,ref.y);
    
        this.#drawHalfBeard(
                Math.max(0,ref.xOffset),
                ref.yOffset,
                Math.min(0,ref.yOffset),
                Math.min(0,ref.xOffset),ctx);
        
        ctx.scale(-1,1);
        
        this.#drawHalfBeard(
                Math.max(0,-ref.xOffset),
                ref.yOffset,
                Math.min(0,ref.yOffset),
                Math.min(0,-ref.xOffset),ctx);

        ctx.restore();
    }
    
    #drawHalfBeard(scaleX,scaleY,verticalScaler,horizontalScaler,ctx){
        ctx.save();
    
        const horizontalSquish=1-scaleX*0.45
        const verticalSquish=1-Math.abs(scaleY*0.2)
        ctx.scale(horizontalSquish,verticalSquish);
    
        ctx.beginPath();
        ctx.moveTo(0.39,0.09);
        ctx.quadraticCurveTo(0.31,0.28,0.17,0.36);
        ctx.quadraticCurveTo(0.09,0.33,0,0.35);
    
        const mouthStretchX=this.mouthInfo.x*0.1;
        const mouthStretchY=this.mouthInfo.y*0.1;
        ctx.lineTo(0.01,0.38);
        ctx.lineTo(0.11+mouthStretchX,0.42);
        ctx.lineTo(0.06,0.49+mouthStretchY);
        ctx.lineTo(0.04,0.47+mouthStretchY);
        ctx.lineTo(0,0.47+mouthStretchY);
        
        const bottomMostPoint={
            x:0,
            y:0.59-verticalScaler*0.3+mouthStretchY,
        }
        ctx.lineTo(bottomMostPoint.x,bottomMostPoint.y);
        
        const rightMostPoint={
            x:0.46-horizontalScaler*0.2,
            y:0.09,
        }
    
        const controlPoint={
            x:0.38-horizontalScaler*0.2,
            y:0.46-verticalScaler*0.3,
        }
    
        ctx.quadraticCurveTo(
            controlPoint.x,controlPoint.y,
            rightMostPoint.x,rightMostPoint.y);
        ctx.closePath();
        
        ctx.fillStyle="black";
        ctx.fill();
    
        ctx.restore();
    }
}