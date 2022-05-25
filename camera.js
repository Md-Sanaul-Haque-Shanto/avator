const camCanvas=document.getElementById("camCanvas");
const camCtx=camCanvas.getContext("2d");

let video=null;
let autoCalibrate=true;


let constelationPoints={}
function processImage(){
    camCtx.drawImage(video,0,0);
    const imgData=camCtx.getImageData(0,0,camCanvas.width,camCanvas.height);
    const locs=getMarkedLocations(imgData);

    if(DEBUG){
        for(let i=0;i<locs.length;i++){
            camCtx.beginPath();
            camCtx.fillStyle="red";
            camCtx.rect(...locs[i],1,1);
            camCtx.fill();
        }
    }
    if(locs.length>0){
        const {nose,chest,l,r,b}=getConstelation(locs);
        constelationPoints.nose=nose;
        constelationPoints.chest=chest;
        constelationPoints.l=l;
        constelationPoints.r=r;
        constelationPoints.b=b;

        if(DEBUG){
            drawPoint(camCtx,{x:nose[0],y:nose[1]},"N",20);
            drawPoint(camCtx,{x:chest[0],y:chest[1]},"C",20);
            drawPoint(camCtx,{x:l[0],y:l[1]},"L",20);
            drawPoint(camCtx,{x:r[0],y:r[1]},"R",20);
            drawPoint(camCtx,{x:b[0],y:b[1]},"B",20);
        }

        const ref=constelationPoints.ref;
        if(ref){
            const d1=distance(nose,chest);
            const d2=distance(ref.nose,ref.chest);
            
            /*
            const avg=average(locs);
            const x=(avg[0]-imgData.width/2)/imgData.width;
            const y=(avg[1]-imgData.height/2)/imgData.height;
            */
        
            const diffY=5*(d2-d1)/imgData.height;
            const diffX=2*(nose[0]-chest[0])/d1;

            updateLookAt({value:diffX},'x');
            updateLookAt({value:diffY},'y');

            const bn1=distance(nose,b);
            const bn2=distance(ref.nose,ref.b);
            const bnDiffY=7*(bn1-bn2)/d1

            
            const lr1=distance(l,r);
            const lr2=distance(ref.l,ref.r);
            const lrDiffX=9*(lr1-lr2)/d1

            updateMouth({value:lrDiffX},"x");
            updateMouth({value:bnDiffY},"y");
        }else{
            if(autoCalibrate){
                calibrate();
            }
        }
    }
}

function getConstelation(locs){
    let chestPoint=locs.find(p=>p[1]==Math.max(...locs.map(l=>l[1])));

    let nosePoint=locs[0];
    let maxDist=0;
    for(let i=0;i<locs.length;i++){
        const dist=distance(locs[i],chestPoint);
        if(dist>maxDist){
            maxDist=dist;
            nosePoint=locs[i];
        }
    }

    let lPoint=locs[0];
    maxDist=0;
    for(let i=0;i<locs.length;i++){
        const dist=distance(locs[i],chestPoint)
            *distance(locs[i],nosePoint);
        if(dist>maxDist){
            maxDist=dist;
            lPoint=locs[i];
        }
    }

    let rPoint=locs[0];
    maxDist=0;
    for(let i=0;i<locs.length;i++){
        const dist=distance(locs[i],chestPoint)
            *distance(locs[i],nosePoint)
            *distance(locs[i],lPoint);
        if(dist>maxDist){
            maxDist=dist;
            rPoint=locs[i];
        }
    }

    let bPoint=locs[0];
    minDist=100000;
    for(let i=0;i<locs.length;i++){
        const dist=Math.pow(distance(locs[i],nosePoint),2)
            +Math.pow(distance(locs[i],lPoint),2)
            +Math.pow(distance(locs[i],rPoint),2)
            +Math.pow(distance(locs[i],chestPoint),2);
        if(dist<minDist){
            minDist=dist;
            bPoint=locs[i];
        }
    }

    if(lPoint[0]>rPoint[0]){
        [lPoint,rPoint]=[rPoint,lPoint];
    }


    //average the values
    const nSet=[];
    const cSet=[];
    const bSet=[];
    const lSet=[];
    const rSet=[];
    for(let i=0;i<locs.length;i++){
        const nDist=distance(locs[i],nosePoint);
        const cDist=distance(locs[i],chestPoint);
        const bDist=distance(locs[i],bPoint);
        const lDist=distance(locs[i],lPoint);
        const rDist=distance(locs[i],rPoint);
        const minDist=Math.min(nDist,cDist,bDist,lDist,rDist);
        if(minDist==nDist){
            nSet.push(locs[i]);
        }else if(minDist==cDist){
            cSet.push(locs[i]);
        }else if(minDist==bDist){
            bSet.push(locs[i]);
        }else if(minDist==lDist){
            lSet.push(locs[i]);
        }else if(minDist==rDist){
            rSet.push(locs[i]);
        }
    }

    nosePoint=average(nSet);
    chestPoint=average(cSet);
    bPoint=average(bSet);
    lPoint=average(lSet);
    rPoint=average(rSet);


    return {
        nose:nosePoint,
        chest:chestPoint,
        l:lPoint,
        r:rPoint,
        b:bPoint
    };
}   

function calibrate(){
    constelationPoints.ref={
        nose:constelationPoints.nose,
        chest:constelationPoints.chest,
        l:constelationPoints.l,
        r:constelationPoints.r,
        b:constelationPoints.b
    }
}