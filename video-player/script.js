const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');


function showPlayIcon(){
	  playBtn.classList.replace('fa-pause','fa-play');
	  playBtn.setAttribute('title','Play');	
}


// Play & Pause ----------------------------------- //
function togglePlay(){
	if(video.paused){
	  playBtn.classList.replace('fa-play','fa-pause');
	  playBtn.setAttribute('title','Pause');	
		video.play();
	} else {
      video.pause();
      showPlayIcon();
	}
}

//on video end show plat button
video.addEventListener('ended',showPlayIcon);


// Progress Bar ---------------------------------- //

//Calculate display time format
function displayTime(time){
	const minute = Math.floor(time/60);
	let seconds = Math.floor(time % 60);
	if(seconds < 10){
       seconds = `0${seconds}`;
	}
	return `${minute}:${seconds}`;
}


function updateProgress(){
 progressBar.style.width = `${(video.currentTime/ video.duration) * 100}%`;
 currentTime.textContent = `${displayTime(video.currentTime)} /`;
 duration.textContent = `${displayTime(video.duration)}`;
}

//click to seek within the video
function setProgress(e){
  const newTime = e.offsetX / progressRange.offsetWidth;	
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}


// Volume Controls --------------------------- //


let lastVolume = 1; //save it
let lastIcon = 'fas fa-volume-up';

 function changeVolume(e){
  let volume = e.offsetX / volumeRange.offsetWidth;
  if(volume < 0.1){
  	volume = 0;
  }
  if(volume > 0.9){
  	volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  //change icon 
  volumeIcon.className = '';
  if(volume > 0.7){
  	volumeIcon.className = 'fas fa-volume-up';
  }
 else if(volume < 0.7 & volume > 0){
  	volumeIcon.className = 'fas fa-volume-down';
  }
  else if(volume === 0){
  	volumeIcon.className = 'fas fa-volume-off';
  }
  lastVolume = volume;
  lastIcon = volumeIcon.className;
 }


//mute/unmute
 function changeIconVolume(){
 if(video.volume){
  lastVolume = video.volume; 
  volumeBar.style.width = `${0}%`;
  video.volume = 0; 
  volumeIcon.className = 'fas fa-volume-mute';
  volumeIcon.setAttribute('title', 'Unmute');
 }else{
 	volumeBar.style.width = `${lastVolume * 100}%`;
 	video.volume = lastVolume;
 	volumeIcon.className = `${lastIcon}`;
 	volumeIcon.setAttribute('title', 'Mute');
    
 } 
}

// Change Playback Speed -------------------- //

function changeSpeed(){	
	video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');

}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
    video.classList.remove('video-fullscreen');

}

let fullscreen = false;
//Toggle fullscreen
function toggleFullscreen(){
	if(!fullscreen){
		openFullscreen(player);
	}else{
		closeFullscreen();
	}
	fullscreen = !fullscreen;
}

//Event Listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate',updateProgress);
video.addEventListener('canplay',updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', changeIconVolume);
speed.addEventListener('change',changeSpeed);
fullscreenBtn.addEventListener('click',toggleFullscreen);