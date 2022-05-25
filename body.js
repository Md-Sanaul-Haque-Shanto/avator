class Body{
    constructor(shirtColor,skinTone){
        this.shirtColor=shirtColor;
        this.skinTone=skinTone;
    }

    draw(lookAt,ctx){
        // skin part of the body
        ctx.beginPath();
        ctx.moveTo(-0.25+lookAt.xOffset*0.05,
            0.28+lookAt.yOffset*0.1);
        ctx.quadraticCurveTo(-0.21,0.41,-0.23,0.61);
        ctx.lineTo(-0.85,0.85);
        ctx.lineTo(-0.89,1.1);
        ctx.lineTo(+0.89,1.1);
        ctx.lineTo(+0.85,0.85);
        ctx.lineTo(+0.23,0.61);
        ctx.quadraticCurveTo(+0.21,0.41,
            +0.25+lookAt.xOffset*0.05,
            0.28+lookAt.yOffset*0.1);
        ctx.strokeStyle="black";
        ctx.fillStyle=this.skinTone;
        ctx.fill();
        ctx.stroke();
        
        // shirt part of the body
        ctx.fillStyle=this.shirtColor;
        ctx.beginPath();
        ctx.moveTo(0,0.88)
        ctx.lineTo(-0.41,0.65)
        ctx.lineTo(-0.84,0.81)
        ctx.quadraticCurveTo(-0.93,0.87,-0.95,1.2);
        ctx.lineTo(+0.95,1.2)
        ctx.quadraticCurveTo(+0.93,0.87,0.84,0.81);
        ctx.lineTo(+0.41,0.65)
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // neck part in shirt
        ctx.beginPath();
        ctx.moveTo(-0.41,0.71)
        ctx.quadraticCurveTo(-0.52,0.67,-0.47,0.61);
        ctx.quadraticCurveTo(-0.37,0.53,-0.18,0.73);
        ctx.quadraticCurveTo(-0.03,0.74,0.11,0.87);
        ctx.quadraticCurveTo(-0.13,0.92,-0.25,0.82);
        ctx.fill();
        ctx.stroke();
    
        // second neck part in shirt
        ctx.beginPath();
        ctx.moveTo(-0.17,0.87)
        ctx.quadraticCurveTo(-0.01,0.78,0.15,0.77);
        ctx.quadraticCurveTo(0.29,0.75,0.37,0.64);
        ctx.quadraticCurveTo(0.43,0.58,0.49,0.61);
        ctx.quadraticCurveTo(0.54,0.69,0.35,0.83);
        ctx.quadraticCurveTo(0.24,0.89,0.08,0.90);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0.08,0.89)
        ctx.quadraticCurveTo(-0.06,0.95,-0.17,0.87);
        ctx.fill();
    }
}