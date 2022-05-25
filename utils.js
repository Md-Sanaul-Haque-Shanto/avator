// img processing

function getMarkedLocations(imgData,color=[0,0,255],threshold=195){
    const locs=[];
    const data=imgData.data;
    for(let i=0;i<=data.length;i+=4){
        const r=data[i];
        const g=data[i+1];
        const b=data[i+2];
        if(match([r,g,b],color,threshold)){
            const pIndex=i/4;
            const y=Math.floor(pIndex/imgData.width);
            const x=pIndex%imgData.width;
            locs.push([x,y]);
        }
    }

    return locs;
}

function match(c1,c2,thr){
    return distance(c1,c2)<=thr;
}


// vector math

function distance(p1,p2){
    let dist=0;
    for(let i=0;i<p1.length;i++){
        dist+=(p1[i]-p2[i])*(p1[i]-p2[i]);
    }
    return Math.sqrt(dist);
}

function average(locs){
    const avg=[0,0];
    for(let i=0;i<locs.length;i++){
        avg[0]+=locs[i][0];
        avg[1]+=locs[i][1];
    }
    avg[0]/=locs.length;
    avg[1]/=locs.length;
    return avg;
}

function add(v1,v2){
    let newV=[];
    for(let i=0;i<v1.length;i++){
        newV[i]=v1[i]+v2[i];
    }
    return newV;
}

function subtract(v1,v2){
    let newV=[];
    for(let i=0;i<v1.length;i++){
        newV[i]=v1[i]-v2[i];
    }
    return newV;
}

function magnitude(v){
    return distance(v,new Array(v.length).fill(0));
}

function scale(v,scalar){
    let newV=[];
    for(let i=0;i<v.length;i++){
        newV[i]=v[i]*scalar;
    }
    return newV;
}

function normalize(v){
    return scale(v,1/magnitude(v));
}

function lerp(s,e,t){
    return s+(e-s)*t;
}


// drawing misc

function drawPoint(ctx,loc,label,rad=0.07){
    ctx.beginPath();
    ctx.arc(loc.x,loc.y,rad,0,Math.PI*2);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.fillStyle="white";
    ctx.font=(rad*1.6)+"px Arial";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(label,loc.x,loc.y+rad*0.15);
}