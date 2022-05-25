function onInputChange(info){
    switch(info.value){
        case "video":
            initializeVideo();
            break;
        case "camera":
            initializeCamera();
            break;
        case "sliders":
            initializeSliders();
            break;
    }
}

function initializeVideo(){
    constelationPoints={}
    autoCalibrate=true;
    document.getElementById("inputContainer").style.display="block";
    document.getElementById("startBtn").style.display="none";
    document.getElementById("sliders").style.display="none";
    document.getElementById("calibrateBtn").style.display="none";
    document.getElementById("vidOutput").style.display="block";
    
    if(video){
        video.pause();
    }
    video=document.createElement("video");
    video.src="test_vid.mp4";
    video.onloadeddata=function(){
        camCanvas.width=video.videoWidth;
        camCanvas.height=video.videoHeight;
    }
    video.play();
    document.getElementById("instr").innerHTML="The avatar is moving according to the video...";
}

function initializeCamera(){
    constelationPoints={}
    autoCalibrate=false;
    document.getElementById("sliders").style.display="none";
    document.getElementById("calibrateBtn").style.display="block";
    document.getElementById("vidOutput").style.display="block";

    if(video){
        video.pause();
    }
    navigator.mediaDevices.getUserMedia({video:true})
        .then(function(data){
            video=document.createElement("video");
            video.srcObject=data;
            video.play();
            video.onloadeddata=function(){
                camCanvas.width=video.videoWidth;
                camCanvas.height=video.videoHeight;
            }
        }).catch(function(err){
            console.log(err);
        });
    
    document.getElementById("instr").innerHTML="Try to put markers on your face like in the video, but... probably need to tweak the color and threshold in utils.js -> getMarkedLocations() as well.<br><br>I didn't have time to make controls for that one.<br><br>Use debug to see if the points are recognized like in the video.<br><br>Press calibrate when looking directly at the camera.";
}

function initializeSliders(){
    constelationPoints={}

    document.getElementById("sliders").style.display="block";
    document.getElementById("vidOutput").style.display="none";
    document.getElementById("calibrateBtn").style.display="none";
    
    if(video){
        video.pause();
        video=null;
    }

    document.getElementById("instr").innerHTML="Control the avatar using the sliders (boring...)";

}