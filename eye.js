class Eye{
    constructor(){

    }
    
    draw(scaleX,scaleY,ctx){
        ctx.save();
    
        const verticalSquish=1-Math.abs(scaleY*0.2)
        const horizontalSquish=1-scaleX*0.4
        ctx.scale(horizontalSquish,verticalSquish);
    
        // white part
        ctx.beginPath();
        ctx.moveTo(0.05,0.11);
        ctx.quadraticCurveTo(0.06,0.18,0.20,0.19);
        ctx.quadraticCurveTo(0.35,0.18,0.35,0.06);
        ctx.quadraticCurveTo(0.35,0.02,0.19,0.02);
        ctx.quadraticCurveTo(0.05,0.01,0.05,0.11);
        ctx.fillStyle="white";
        ctx.fill();
    
        // eyebrow
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.moveTo(0.07,0.07);
        ctx.quadraticCurveTo(0.21,-0.01,0.33,0.08);
        ctx.quadraticCurveTo(0.39,0.10,0.36,0.04);
        ctx.quadraticCurveTo(0.19,-0.06,0.03,0.04);
        ctx.quadraticCurveTo(0.02,0.09,0.07,0.07);
        ctx.fill();
        
        // pupil
        ctx.beginPath();
        ctx.arc(0.17,0.09,0.065,0,Math.PI*2);
        ctx.fill();
        
        // half-contour line
        ctx.beginPath();
        ctx.moveTo(0.20,0.19);
        ctx.quadraticCurveTo(0.35,0.18,0.35,0.06);
        ctx.restore();
    
        ctx.stroke();
    }
}