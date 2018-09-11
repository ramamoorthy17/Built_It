var imgBase = "assets/images/";
var imgBaseAct = "assets/images/activity/";
var helpimgPath = "assets/images/help/";
var imgBaseWelcome = "assets/images/welcomebg/";
var speechBubblePos = 'bubbleDivNone';
var imgPng = '.png';
var imgJpg = '.jpg';
var rotateValue=0;
var rotateValueAct=-294;
var angleRot=180;
var templateStateImg = {
	audiopause:'assets/images/template/audio_icon_normal.png',
	audioplay:'assets/images/template/audio_icon_play.png',
	leftslideract:'assets/images/template/left_slider_act.png',
	leftsliderdeact:'assets/images/template/left_slider_deact.png',
	rightslideract:'assets/images/template/right_slider_act.png',
	rightsliderdeact:'assets/images/template/right_slider_deact.png',
};
var selectedID;
var rotateInc = 45;
var dcount = 1;	
var disableSafari = false;

$(document).ready(function(){	
	initialfun();
	loadStart();	
	$('.help2').addClass('rclass');
	$('.activity_title').html(baseConfig.activityTitle);
	$('.expAudio').off('click').on('click', playGlobalAudio);
	$('<audio id="globalAudio"><source src="" type="audio/mp3"/></audio>').appendTo('.container');
	$('<audio id="assetAudio"><source src="assets/audios/boom_explodes.mp3" type="audio/mp3"/></audio>').appendTo('.container');
		
	$('.expAudio').attr('audio-state','pause');		
	$('.helpwindow').css('display','none');	
	//$('.hit').off('touchmove').on('touchmove', enableDrag);	
	$(window).bind(
	  'touchmove',
	   function(e) {
		e.preventDefault();
	  }
	);
/* 	$(function(){
		$.ajax({
			async: true, 
			url: "version.txt",
			//async: false,   // asynchronous request? (synchronous requests are discouraged...)
			cache: false,   // with this, you can force the browser to not make cache of the retrieved data
			dataType: "text",  // jQuery will infer this, but you can set explicitly
			success: function( data, textStatus, jqXHR ) {
				$('.activity_title').html(baseConfig.activityTitle);
			}
		});
	}); */
	loadElements();
	sliderHeadDrag();
	$('#rtxt_1').trigger('click');
	var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if(isMacLike && isSafari){disableSafari = true;}	   
});

function loadStart()
	{
		var helpLen1 = Object.keys(info_background).length;
		for(var i=0;i<helpLen1;i++)
			{
				$('<div class="pdivHelp helpAudio"><img src="'+(templateStateImg.audiopause)+'" /><p class="m20">'+info_background['block'+i].text+'</p></div>').appendTo('.helpBlock1');
			}
		var helpLen2 = Object.keys(info_help).length;
		for(var j=0;j<helpLen2;j++)
			{
				var imgFound = info_help['block'+j].imgText.lastIndexOf('.png');
				if(imgFound != -1)
					{
						$('<div class="pdiv helpAudio"><img style="align-self:flex-start;margin-top:18px; margin-bottom: 0px;" src="'+(templateStateImg.audiopause)+'" /><div class="imgContain" style= "width:70px;margin-top:-18px;margin-left: 10px;"><img style="display:block;margin:auto;" class="addOnIcon" src="'+(imgBase+'template/'+info_help['block'+j].imgText)+'" /></div><p class="m20" style="width:400px">'+info_help['block'+j].text+'</p></div>').appendTo('.helpBlock2');
					}
				else
					{
						$('<div class="pdiv helpAudio"><img style="align-self:flex-start;margin-top:18px; margin-bottom: 0px;" src="'+(templateStateImg.audiopause)+'" /><span class="helpDiv1">'+info_help['block'+j].imgText+'</span><p class="m20" style="width:370px">'+info_help['block'+j].text+'</p></div>').appendTo('.helpBlock2');
					}
			}				
		$(".helpBlock1").mCustomScrollbar({theme:"3d-thick",scrollInertia: 1000});
		scrollApply();
	}
	
function scrollApply()
	{	
		$('.mCSB_draggerContainer').css({boxShadow:'none'}).css('background','#fff').css('border','1px solid #898a8c').css('border-radius','0px');
		$('.mCSB_dragger_bar').css('margin','0px').css('background','rgba(0, 0, 0, 0.5)').css({boxShadow:'none'}).css('border-radius','0px');		
		$('.mCSB_draggerContainer').css({border:'1px solid rgba(0,0,0,0.7)'});
		$('.mCSB_dragger_bar').css({'left':'0px',"width":"100%"});
		$('.mCSB_container').css({marginRight: '20px'});
		$('.mCSB_dragger').css({minHeight:'94px'});
		$('.mCSB_scrollTools').css('z-index',10);
	}	
	
function expSlideDiv(e)
	{		
		globalAudioPause();
		rotateValue = ($('.expDiv').position().left >= 0)?-280:0;				
		angleRot = (rotateValue >= 0)?0:180;				
		$('.expDiv').stop().animate({left:rotateValue},800,function(){					
			$('.activeSlider').animate({rotate: angleRot},0);				
		});		
	}

var height_icon=67;
function changeHeightExp(defH)
	{		
		var getHeig = 0;
		$(".expChild").children().each(function(){
			getHeig =  $(this).height();
		});
		var bbarH = ($('.bubbleBar').css('display') == 'flex')?66:0;
		$('.expDiv').css('height', getHeig+bbarH);		
		if(getHeig > 360)
			{			
				$('.expChild').css('height',350);
				$('.expDiv').css('height',350);
				if(activitytag)	{			
					$('.expChild').css('height',306);			
				}		
				scrollApplyChoose('expDiv','expChild');
			}
		else
			{
				$('.expChild').mCustomScrollbar('destroy');
			}		
		$('.expDivIcon').css('top',16);
		
		var expDivPos = parseInt($('.expDiv').position().top)+parseInt($('.expDiv').height());
		
		if(expDivPos > 480)
			{
				var repos = 480 - parseInt($('.expDiv').height());
				$('.expDiv').css({top:repos})
			}		
	}

function speechToText(txt)
	{
		var audioMode = $('.screenArea').attr('audio-mode');
		var ctState = (audioMode == "on")?'pause':'play';	
		$('.expAudio').attr('audio-state','play');		
		$('#globalAudio').off('ended').on('ended', callEndFun);							
		playGlobalAudio(txt);
	}	

var selectedIndex = 0;
var prevMove = 0;
var defIndex = -1;
function playGlobalAudio(passText)
	{	
		var textPara = typeof passText;		
		var ctElem = (textPara != 'string')?$(this):$('.expAudio');			
		var childWindow = $('iframe').contents();
		var toggleState = ctElem.attr('audio-state');
		if(toggleState == "pause")
			{
				if($('.helpwindow').css('display') != 'none')
					{
						var ctString = ($('.helpBlock1').css('display') == 'block')?'info_background':'info_help';
						var getIndex = $(this).parent().index();
						globalAudioName = String(window[ctString]['block'+getIndex]['audio'])
					}
				selectedIndex = $(this).parent().index();
				if(selectedIndex != defIndex)
					{
						$("#globalAudio").prop('currentTime','0');						
					}
				if($("#globalAudio").prop('currentTime')<=0)
					{	
						var url = "assets/audios/"+globalAudioName+".mp3";
					}				
				$("#globalAudio").attr("src",url).get(0).play();
				$('.expAudio').attr('audio-state','pause').attr('src',templateStateImg.audiopause);
				ctElem.attr('src',templateStateImg.audioplay);
				ctElem.attr('audio-state','play');	
				defIndex = selectedIndex;
			}
		else
			{
				
				$('.screenArea').attr('audio-mode','off');
				$("#globalAudio").attr("src",url).get(0).pause();
				$('.expAudio').attr('audio-state','pause');
				ctElem.attr('src',templateStateImg.audiopause);
				ctElem.attr('audio-state','pause');					
			}
		$('#globalAudio').off('ended').on('ended', callEndFun);			
	}	

function getTimeNow()
	{
		
	}	
	
function globalAudioPause()
	{	
		$('.expAudio').attr('audio-state','pause');
		$('.expAudio').attr('src',templateStateImg.audiopause);
		$('.screenArea').attr('audio-mode','off');	
		$("#globalAudio").trigger('pause');	
		$("#globalAudio").prop('currentTime','0');
		prevMove = -1;	
	}

function callEndFun()
	{			
		if(parentTab == 'welcome' && $('.helpwindow').css('display') == 'none')
			{
				if(globalProcess < Object.keys(videoScript).length)
					{
						audioPlay = false;									
					}			
			}
		globalAudioPause();			
	}
	
	