class Hair{
    constructor(){

    }
    
    draw(ref,ctx){
        ctx.save();
        ctx.translate(ref.x,ref.y);
    
        this.#drawHalfHair(
                Math.max(0,ref.xOffset),
                ref.yOffset,
                Math.min(0,ref.xOffset),ctx);
        
        ctx.scale(-1,1);
        
        this.#drawHalfHair(
                Math.max(0,-ref.xOffset),
                ref.yOffset,
                Math.min(0,-ref.xOffset),ctx);
    
        ctx.restore();
    }
    
    #drawHalfHair(scaleX,verticalScaler,horizontalScaler,ctx){
        ctx.save();
        const horizontalSquish=1-scaleX*0.45
        ctx.scale(horizontalSquish,1);
        
        ctx.beginPath();
        ctx.moveTo(0.39,0.09);
        ctx.quadraticCurveTo(0.47,-0.34,0,-0.34);
    
        const topMostPoint={
            x:0,
            y:-0.65-verticalScaler*0.2,
        }
        
        ctx.lineTo(topMostPoint.x,topMostPoint.y);
      
        const rightMostPoint={
            x:0.46-horizontalScaler*0.2,
            y:0.09,
        }
        const controlPoint={
            x:0.6-horizontalScaler*0.2,
            y:-0.6-verticalScaler*0.2,
        }
        ctx.quadraticCurveTo(
            controlPoint.x,controlPoint.y,
            rightMostPoint.x,rightMostPoint.y);
    
        ctx.closePath();
        
        ctx.restore();
        ctx.fillStyle="black";
        ctx.fill();
    }
}