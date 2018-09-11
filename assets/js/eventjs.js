var TextGetVarible;
var feedBack="step";
var stepIndex=0;
var arrlengthFind;
var dragging=false;
var mainNavTabs = function(){
	$('.rtxt').off('click').on('click',rbuttoneve);
}
var pausedAudioTime = 0;
var lastAudioPlayed;

function initialfun()
	{
		$('.workArea').hide();		
		mainNavTabs();
		$('.help1,.help2').off('click').on('click',toggleHcont);				
		$('.rtxt').attr('data-hover','none');		
		
		$('.screenIcon').off('click');		
		$('.rtxt').hover(
		    function(event){
				var ctTarget = $(event.target);
				var actStatus = ctTarget.attr('data-hover');	
				if(actStatus != 'active')
					{
						// $(this).css({'color':templateHdr.textActive,'box-shadow':'0 -6px #FFCB05'});					
						$(this).css({'color':templateHdr.textActive});					
					}
				},
			function(event){
				var ctTarget = $(event.target);
				var actStatus = ctTarget.attr('data-hover');	
				if(actStatus != 'active')
					{
						$(this).css({color:templateHdr.textNormal,boxShadow:'none'});
					}
		});
		
		$('.infoIcon').off('click').click(function(){
			lastAudioPlayed = globalAudioName;
			pausedTime = parseFloat($('#myVideo').prop('currentTime'));	
			//pausedAudioTime = parseFloat($("#globalAudio").prop('currentTime'));	
			$('.playButton').attr('src','assets/images/play.png');
			$('.expDivIconVideo').removeClass('expAudio');
			$('#myVideo').trigger('pause');
			globalAudioPause();	
			$('.helpScreen').fadeIn(300);			
			$('.helpwindow').css('display','flex');
			$('.helpBlock1').find('img').addClass('expAudio');
			$('.helpBlock2').find('.pdiv').each(function(){
				$(this).find('img:first').addClass('expAudio');
				$(this).find('img:first').attr('audio-state','pause');	
			});
			$('.helpBlock1').find('.expAudio').attr('audio-state','pause');
            $('.expAudio').off('click').on('click', playGlobalAudio);
			$('.help1').trigger('click');
		});

		$(document).off('mousedown touchstart').on('mousedown touchstart',function(e){
			if($('.helpwindow').css('display') == 'flex')
				{
					var targetClass = $(e.target).attr('class');			
					if(targetClass == "helpwindow" || targetClass == "closeIcon" || typeof targetClass== 'undefined')
						{
							closeHelpWin();
						}
				}
		});
		
		$(".screenIcon").attr("src","assets/images/template/camera_icon.png").off("click").on("click",captureScreen).css({"cursor":"pointer"});	
	}

var closeHelpWin = function(e)
	{	
		audioPlay = true;
		$('#myVideo').prop('currentTime', pausedTime);	
		$('.helpwindow').fadeOut(300);
		globalAudioName = lastAudioPlayed;
		globalAudioPause();	
		$("#globalAudio").prop('currentTime', pausedAudioTime)
		$('.helpBlock1,.helpBlock2').find('img').removeClass('expAudio');	
		$('.expDivIconVideo').addClass('expAudio');			
	}

var ctClass;
function toggleHcont(e)
	{
		selectedIndex = 0;
		defIndex = -1;
		ctClass = Number($(e.target).attr('class').match(/\d/));
		var togNum = (ctClass == 1)?2:1;		
		$('.helpBlock1,.helpBlock2').css('display','none');	
		$('.help1').removeClass('lclass');
		$('.help2').removeClass('rclass');			
		$('.help'+togNum).addClass($('.help'+togNum).attr('data-class'));
		$('.helpBlock'+ctClass).css('display','block');		
		globalAudioPause();	
	}	
	
var activitytag = true;	
var currentactivity = 0;
var parentTab = 'welcome';	
var cpage;
function rbuttoneve(event)
	{		
		prevMove = -1;
		globalAudioPause();
		$('.rightlabel2').css('animation','none');
		$('.rightlabel2').css('cursor','default');
		mainNavTabs();
		$(this).off('click');
		var ctTarget = $(event.target);
		cpage = event.target.getAttribute("name");		
		$('.rtxt').attr('data-hover','none').css({"cursor":"pointer"});
		$('.rtxt').css({color:templateHdr.textNormal,boxShadow:'none'});		
		ctTarget.attr('data-hover','active').css({"cursor":"default"});	
		ctTarget.css({color:'#FFCC00',boxShadow:'0 -6px #FFCB05'});
		$('.workArea').hide();
		$('#'+cpage).show();		
		$('[name = submitconfirmation]').removeClass('subbtnActive').addClass('subbtn');
		
		if(cpage == 'explore' || cpage == 'activity')
			{				
				audioPlay = true;				
				$('.playButton').attr('src','assets/images/play.png');
				$('.playButton').off('click').on('click', playPause).css('cursor','pointer').css('opacity','1');
				$('#myVideo').trigger('pause');
				$('#myVideo').prop('currentTime','0');				
				globalAudioPause();
				globalProcess = 1;
				var myText = videoScript['step_'+globalProcess].text;				
				var myLeft = videoScript['step_'+globalProcess].position[0];
				var myTop = videoScript['step_'+globalProcess].position[1];
				$('.expDivVideo').find('p').html(myText);
				$('.expDivVideo').fadeIn(200);
				$('#welcome').find('.expDivVideo').css('left', myLeft).css('top', myTop);				
				var txtW = videoScript['step_'+globalProcess].width;
				$('.expDivVideo').css('width',txtW);				
				$('.expDivVideo').removeClass('bubbleDivMulti');
			}
		parentTab = $(this).html().toLowerCase();
		$('#assetAudio').attr('src',activityAudios.car);
		loadCloneElem();
		$("#custom-seekbar").find('span').css("width","0.00%");
		pausedTime = 0;
		//$('#rtxt_1').off('click').css('cursor','default');
	}
	
function loadCloneElem()
	{			
		for(var i=0;i<carBuild.length;i++)
			{
				var carElem = carBuild[i][0];
				$('.carImages').eq(i).stop();
				$('.carImages').eq(i).clearQueue();
			}
		$('.myContainer').stop();
		$('.myContainer').clearQueue();
		if(parentTab == 'activity')
			{
				$('#explore,#activity').empty();	
				$('#activity').html(cloneElem);											
				$('.expContTabs,.dragContainer,.dragContainerClone').off('click').on('click', moveSlider);
				$('<img src="assets/images/template/lslider.png" width="24px" class="activeSlider" alt="Slide Animation"/>').appendTo('.expDiv');
				$('<img src="'+(templateStateImg.audiopause)+'" class="expDivIcon expAudio" audio-state="pause" width="30px"/><p class="expPara">Test Text</p>').appendTo('.expChild');		
				$('.expAudio').off('click').on('click', playGlobalAudio);		
				$('.activeSlider, .moveNextFood').off('click').on('click', expSlideDiv);
				$('.expDiv').css('left','0px');		
				$('.expPara').html(textBlock[parentTab]['block_0'][0]);
				globalAudioName = textBlock[parentTab]['block_0'][1];	
				$('.breakButton').off('click').on('click', breakCar);
				$('.resetButton').off('click').on('click', removeActivity);				
				$('.myContainer').find('.hit').css('display','none');
				$('<div class="finishButton" style="left:125px">Finished</div>').insertAfter($('.resetButton'));
				$('.finishButton').off('click').on('click', makeFinish);
				$('.screenIcon').css('display','block');
			}
		if(parentTab == 'explore')
			{			
				$('#explore,#activity').empty();	
				$('#explore').html(cloneElem);
				$('.expContTabs,.dragContainer,.dragContainerClone').off('click').on('click', moveSlider);
				$('<img src="assets/images/template/lslider.png" width="24px" class="activeSlider" alt="Slide Animation"/>').appendTo('.expDiv');
				$('<img src="'+(templateStateImg.audiopause)+'" class="expDivIcon expAudio" audio-state="pause" width="30px"/><p class="expPara">Test Text</p>').appendTo('.expChild');		
				$('.expAudio').off('click').on('click', playGlobalAudio);		
				$('.activeSlider, .moveNextFood').off('click').on('click', expSlideDiv);
				$('.expDiv').css('left','0px');		
				$('.expPara').html(textBlock['explore']['block_0'][0]);				
				globalAudioName = textBlock[parentTab]['block_0'][1];	
				$('.breakButton').off('click').on('click', breakCar);
				$('.resetButton').off('click').on('click', removeActivity);				
				$('.myContainer').find('.hit').css('display','none');
				$('.screenIcon').css('display','block');
			}
		if(parentTab == 'welcome') {$('.screenIcon').css('display','none')};	
		changeHeightExp();		
		oneTimeTab = true	
		stepCount = 1;
		tabMove = 1;	
		$('.actBg').attr('src','assets/images/bg/car.png');
		sliderHeadDrag();		
		$('.buildCar').empty();
		startBuildCar();	
	}	

function makeFinish()
	{
		
	}
	
function extractBorder(element) {
		// Extracts element border.
		var border = {
			rect: element.getBoundingClientRect(),
			width: parseFloat(element.style.borderWidth),
			style: element.style.borderStyle,
			color: element.style.borderColor,
			original: element.style.border,
			element: element
		};
		// Clears original border.
		element.style.borderColor = "transparent";		
		return border;
	}
	
function extractBorders(element) {
	var borders = [];	
	// Extracts the rect from the element itself.
	if (element.style.border) {
		borders.push(extractBorder(element));
	}
	
	// Extracts rect from children.
	$(element).find("*").each(function(index, child) {
		if (child.style.border) {
			borders.push(extractBorder(child));
		}
	});
	
	return borders;
}

function drawBorder(canvas, border, parentRect) {
	
	
	// Retrieves context.
	var ctx = canvas.getContext("2d");
	
	 ////////console.log(border.style)
	// Checks border style.
	if (border.style === "dashed") {
		ctx.setLineDash([3]);
	} else if (border.style === "dotted") {
		ctx.setLineDash([border.width]);
	}
	
	// Calculates border edges.
	var left = border.rect.left + 0.5 - parentRect.left;
	var right = border.rect.right - 0.5 - parentRect.left;
	var top = border.rect.top + 0.5 - parentRect.top;
	var bottom = border.rect.bottom - 0.5 - parentRect.top;
	
	// Draws border.
	ctx.beginPath();
	ctx.moveTo(left, top);
	ctx.lineTo(right, top);
	ctx.lineTo(right, bottom);
	ctx.lineTo(left, bottom);
	ctx.lineTo(left, top);
	ctx.strokeStyle = border.color;
	ctx.lineWidth = border.width;
	//ctx.stroke();
	
	// Restores element original border.
	//border.element.style.border = border.original;
}

function tocanvas(element, options) {
	// Extracts parent relative position.
	var parentRect = element[0].getBoundingClientRect();
	  
	// Extracts elements borders.
	var borders = extractBorders(element[0]);
	
	// Keeps original onrendered option.
	var onrendered = options.onrendered;
	
	// Intercepts onrendered callback.
	options.onrendered = function(canvas) {
		// Draws borders.
		for (var i = 0; i < borders.length; i++) drawBorder(canvas, borders[i], parentRect);
		
		// Calls original callback.
		if (onrendered) onrendered(canvas);
	}
	
	// Calls html2canvas.
		
	html2canvas($(".screenArea"), options);
}
	
function captureScreen()
	{ 
		tocanvas($(".screenArea"), {
			onrendered: function (canvas) {
				saveAs(canvas.toDataURL(), 'Build It.png');				
			}
		});
		
	}
	
  function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

function restartWelcome()
	{
		document.getElementById("myFrame").contentWindow.welcomeMove = 0;	
		var childWindow = $('iframe').contents();
		childWindow.find('#Stage_welText').html(welcomeMode['step_0']['text']);	
		childWindow.find('#Stage_welcomeGroup').css('min-height','122px').css('background','#fff').css('box-shadow','2px 2px 2px 0px rgba(0,0,0,0.25)');
		childWindow.find('#Stage_left_slider_act,#Stage_right_slider_act').css('top','auto').css('bottom','6px');
		childWindow.find('#Stage_left_slider_act').attr('src','images/left_slider_deact.png');
		var lpos = 274;	
		var tpos = 226;	
		childWindow.find('#Stage_welcomeGroup').css('left',lpos).css('top',tpos);
		childWindow.find('#Stage_left_slider_act').css('cursor','default');
		childWindow.find('#Stage_audio_icon_normal').attr('audio-state','pause');
		childWindow.find('#Stage_audio_icon_normal').addClass('expAudio');				
		childWindow.find('#Stage_welcomeGroup').removeClass(document.getElementById("myFrame").contentWindow.speechBubblePos);
		document.getElementById("myFrame").contentWindow.AdobeEdge.getComposition("EDGE-1817669").getStage().play(0);
	}
