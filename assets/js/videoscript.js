var globalProcess = 1;
var videoDuration = 0;
var myvideoLength;
var doubleTapOne = false;

$(document).ready(function(){	
	var myVideopath = videoScript.path;
	var myText = videoScript['step_'+globalProcess].text;
	myvideoLength = Number(Object.keys(videoScript).length)-1;
	
	$('<video id="myVideo" class="myVideo"><source src="'+(myVideopath)+'" type="video/mp4"></video><div class="videoDummy"></div><div id="custom-seekbar"> <span></span></div>').appendTo('#welcome');
	
	$('<img src="assets/images/play.png" width="40px" class="playButton"/><img src="assets/images/replay.png" width="40px" class="rpButton"/>').appendTo('#welcome');
	
	$('.playButton').off('click').on('click', playPause);
	$('.rpButton').off('click').on('click', replayVideo);
	$('#myVideo').off('timeupdate').on('timeupdate', getVideoTime);
	$('#myVideo').off('ended').on('ended', myVideoEnd);
	$('.expAudio').off('click').on('click', playGlobalAudio);
	
	var myLeft = videoScript['step_'+globalProcess].position[0];
	var myTop = videoScript['step_'+globalProcess].position[1];
	$('#welcome').find('.expDivVideo').css('left', myLeft).css('top', myTop);
	$('#welcome').find('.expAudio').css('display','none');
	$('.expDivVideo').css('opacity','1');
	var myText = videoScript['step_'+globalProcess].text;
	$('.expDivVideo').find('p').html(myText);
	var txtW = videoScript['step_'+globalProcess].width;
	$('.expDivVideo').css('width',txtW);
	$('.expDivVideo').stop().fadeIn(300);	
	$("#custom-seekbar").on("click", function(e){
		var offset = $(this).offset();
		var left = (e.pageX - offset.left);
		var totalWidth = $("#custom-seekbar").width();
		var percentage = ( left / totalWidth );
		vidTime = parseInt($('#myVideo').prop('duration')) * percentage;
		$('#myVideo').prop('currentTime', vidTime);
		var percentage = ( parseInt($('#myVideo').prop('currentTime')) / parseInt($('#myVideo').prop('duration')) ) * 100;
		$("#custom-seekbar span").css("width", percentage+"%");	
		
		var scaleVal = ( parseInt($('#myVideo').prop('currentTime')) / parseInt($('#myVideo').prop('duration')) ) * myvideoLength;
		scaleVal = String(scaleVal).split('.')[0];
		scaleVal = Number(scaleVal);			
		globalProcess = scaleVal;			
		globalProcess = (globalProcess <= 0)?1:globalProcess;					
		$('.expDivVideo').css('opacity','0');
		$('.playButton').attr('src','assets/images/pause.png').css('opacity','1').css('cursor','pointer');		
		$('.playButton').off('click').on('click', playPause);
		$('#myVideo').trigger('play');	
		/* $("#globalAudio").attr('currentTime', '0');			
		$("#globalAudio").trigger('pause');
		
		if(globalProcess <=1 && $('#myVideo').prop('currentTime') < 1) {
			$("#globalAudio").trigger('pause');
			$("#globalAudio").attr('currentTime', '0');	
			var myText = videoScript['step_'+globalProcess].text;
			var myLeft = videoScript['step_'+globalProcess].position[0];
			var myTop = videoScript['step_'+globalProcess].position[1];
			var txtW = videoScript['step_'+globalProcess].width;
			$('.expDivVideo').css('width',txtW);				
			$('#welcome').find('.expDivVideo').css('left', myLeft).css('top', myTop);
			$('.expDivVideo').find('p').html(myText);
			$('.expDivVideo').stop().fadeIn(200,function(){	
				$('.expDivVideo').css('opacity', 1);
				$("#globalAudio").prop('currentTime','0');
				$("#globalAudio").trigger('pause');							
				$('#welcome').find('.expAudio').trigger('click');
			});
		}		
		var delayStart = window.setTimeout(function(){
			$('#myVideo').trigger('play');
			window.clearTimeout(delayStart);
		},100); */		
	});	
});

var pausedTime = 0;
var audioPlay = true;
function playPause()
	{		
		var ctImg = $('.playButton').attr('src');		
		if(ctImg == 'assets/images/play.png')
			{	
				var videoElement = $('#myVideo').get(0);
				$('.playButton').attr('src','assets/images/pause.png');
				$('#myVideo').off('timeupdate').on('timeupdate', getVideoTime);	
				
				if(audioPlay) {
					var myText = videoScript['step_'+globalProcess].text;					
					$('.expDivVideo').find('p').html(myText);
					$('.expDivVideo').stop().fadeIn(300);
					$('#myVideo').prop('currentTime', pausedTime);
					
					var aid = document.getElementById("globalAudio");
					$('#myVideo').trigger('play');
					aid.onloadedmetadata = function() {	
						if(parentTab == 'welcome' && $('.helpwindow').css('display') == 'none')
							{
								$('#myVideo').trigger('play');
								$('.playButton').attr('src','assets/images/pause.png');
							}
					};
				}				
			}
		else
			{
				$('.playButton').attr('src','assets/images/play.png');
				$('#myVideo').trigger('pause');
				//$("#globalAudio").trigger('pause');	
				pausedTime = parseFloat($('#myVideo').prop('currentTime'));	
				pausedAudioTime = parseFloat($("#globalAudio").prop('currentTime'));
			} 
	}
	
function getVideoTime(bar)
	{
		if(globalProcess < (myvideoLength+1))
			{		
				var setErrorVal = (globalProcess > 0)?0:0;
				var getTime = $('#myVideo').prop('currentTime');		
				var endTime = videoScript['step_'+globalProcess].endTime;	
				var percentage = ( parseFloat($('#myVideo').prop('currentTime')) / parseFloat($('#myVideo').prop('duration')) ) * 100;		
				$("#custom-seekbar span").css("width",setErrorVal+percentage+"%");
			} 			
	}

function myVideoEnd()
	{		
		$('#myVideo').trigger('pause');
		$('.playButton').attr('src','assets/images/play.png');				
		$('.playButton').off('click').css('opacity','0.5').css('cursor','default');		
	}

function replayVideo()
	{	
		myVideoEnd();
		globalAudioPause();
		globalProcess = 1;
		audioPlay = true;
		$('.playButton').off('click').on('click', playPause).css('cursor','pointer').css('opacity','1');		
		$('.playButton').trigger('click');
		$('#myVideo').prop('currentTime','0');
		//$('#myVideo').get(0).load();
		//$('#myVideo').get(0).play();
		//$('#myVideo').trigger('play');
		$('.playButton').attr('src','assets/images/pause.png');
		var myText = videoScript['step_'+globalProcess].text;
		$('.expDivVideo').find('p').html(myText);
		$('.expDivVideo').stop().fadeIn(300);
		$('#welcome').find('.expAudio').trigger('click');
		var myLeft = videoScript['step_'+globalProcess].position[0];
		var myTop = videoScript['step_'+globalProcess].position[1];
		$('#welcome').find('.expDivVideo').css('left', myLeft).css('top', myTop);
		var txtW = videoScript['step_'+globalProcess].width;
		$('.expDivVideo').css('width',txtW);
		$('.expDivVideo').removeClass('bubbleDivMulti');
		$("#custom-seekbar span").css("width","0%");
	}
	
