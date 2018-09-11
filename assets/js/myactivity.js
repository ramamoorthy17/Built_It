var ctTab = 'tab_1';
var drager = false;	
var dcount = 100;
var ctShape;
var dragCheck = true;
var carBreakTime=1500,traySlideTime=1000;
var cloneElem = new Object();
var stepCount = 1;
var tabMove = 1;
var activityAudios = {
	car:'assets/audios/boom_explodes.mp3',
	drop:'assets/audios/piece_dropped.mp3',
	finish:'assets/audios/finish.mp3'
}
var robotErr = 'To complete your robot, you must use each of the pieces at least once. Add more pieces to complete your robot.';
var globalAudioName;


var myObject = {
		t_shape:{count:0,x:785,y:82,w:76,h:59,startW:53,img:'t_shape',angle:[0,45,90,135,180,225,270,315],size:[[76,59],[76,78],[56,72],[76,78],[74,59],[77,79],[59,77],[80,79]]},
		
		hose_shape:{count:0,x:850,y:95,w:133,h:31,startW:60,img:'hose_shape',angle:[0,45,90,135],size:[[133,31],[95,111],[28,134],[111,97]]},
		
		window_shape:{count:0,x:784,y:150,w:93,h:45,startW:60,img:'window_shape',angle:[0,45,90,135,180,225,270,315],size:[[93,45],[90,91],[43,92],[91,91],[92,45],[91,92],[45,93],[92,91]]},
		
		joint_shape:{count:0,x:854,y:158,w:72,h:20,startW:54,img:'joint_shape',angle:[0,45,90,135],size:[[72,20],[61,63],[20,74],[63,63]]},
		
		square_shape:{count:0,x:792,y:210,w:78,h:78,startW:45,img:'square_shape',angle:[0,45],size:[[78,78],[109,109]]},
		
		scale_shape:{count:0,x:854,y:226,w:116,h:43,startW:54,img:'scale_shape',angle:[0,45,90,135,180,225,270,315],size:[[116,43],[92,103],[44,118],[104,94],[119,46],[95,104],[46,120],[104,95]]},
		
		dcircle_shape:{count:0,x:788,y:284,w:122,h:59,startW:52,img:'dcircle_shape',angle:[0,45,90,135],size:[[122,59],[105,106],[61,125],[108,107]]},
		
		semi_shape:{count:0,x:857,y:274,w:72,h:72,startW:48,img:'semi_shape',angle:[0,45,90,135,180,225,270,315],size:[[72,72],[55,101],[73,74],[102,55],[74,74],[56,102],[75,74],[102,56]]},
		
		brick_shape:{count:0,x:785,y:355,w:171,h:35,startW:55,img:'brick_shape',angle:[0,45,90,135],size:[[171,35],[132,133],[36,174],[135,134]]},
		
		polygon_shape:{count:0,x:858,y:338,w:92,h:104,startW:44,img:'polygon_shape',angle:[0,45,90,135],size:[[92,104],[101,104],[104,92],[102,104]]},
		
		plus_shape:{count:0,x:789,y:404,w:76,h:76,startW:48,img:'plus_shape',angle:[0,45],txy:[[0,0],[0,-10]],angle:[0,45],size:[[76,76],[77,79]]},
		
		ellipse_shape:{count:0,x:855,y:408,w:96,h:82,startW:48,img:'ellipse_shape',angle:[0,45,90,135,180,225,270,315],size:[[96,82],[105,82],[84,98],[83,108],[99,85],[107,84],[85,99],[83,109]]}
	}

var carBuild = [
			['polygon_shape',[389,293],0],
			['square_shape',[493,308],0],
			['t_shape',[324,330],90],
			['t_shape',[324,258],-90],
			['brick_shape',[354,395],0],
			['brick_shape',[521,395],0],
			['joint_shape',[312,426],90],
			['scale_shape',[386,246],0],
			['scale_shape',[496,246],0],
			['hose_shape',[266,238],0],
			['hose_shape',[228,308],0],
			['hose_shape',[245,391],0],
			['joint_shape',[565,294],90],
			['joint_shape',[565,357],90],
			['joint_shape',[477,425],0],
			['joint_shape',[543,425],0],
			['joint_shape',[660,429],90],
			['window_shape',[388,357],180],
			['window_shape',[484,357],180],			
			['plus_shape',[424,432],180],
			['plus_shape',[594,432],180],
			['ellipse_shape',[415,419],180],
			['ellipse_shape',[585,419],180],
			['semi_shape',[617,327],0],			
			['dcircle_shape',[486,192],0]			
		];
	
var textBlock = 
	{
		'explore':
		{
			'block_0':['First, break the car into pieces. Select the Break Apart button.','vlbie_01'],				
			'block_1':['Select any tab to start building a new object.','vlbie_02'],
			'block_2':['Use the pieces from the car to build a house.','vlbie_03'],
			'block_3':['Use the pieces from the car to build a bridge.','vlbie_04'],
			'block_4':['Use the pieces from the car to build a playground.','vlbie_05'],
			'block_5':['Use the pieces from the car to build a robot.','vlbie_06']
		},
		'activity':
		{
			'block_0':['First, break the car into pieces. Select the Break Apart button.','vlbie_01'],
			'block_1':['Imagine that you are lost and need to find shelter. You can build a house! Select the House tab.','vlbia_01'],
			'block_2':['Use the pieces of the car to make the house.<br/><br/> You can use any pieces you want. You do not have to use all the pieces.<br/><br/> Select the Finished button when you are done building your house.','vlbia_02'],
			'block_3':['Are you finished building your house? If so, use the Snapshot button to take a picture of it. Then continue to the next challenge.<br/><br/>If you are not finished yet, select the Back arrow to keep building.','vlbia_03'],
			'block_4':['Imagine you need to cross a river. You can build a bridge! Use the pieces of the car to make the bridge.<br/><br/> Remember, you can use any pieces you want. You do not have to use all the pieces.<br/><br/> Select the Finished button when you are done building your bridge.','vlbia_04'],
			'block_5':['Are you finished building your bridge? If so, use the Snapshot button to take a picture of it. Then continue to the next challenge.<br/><br/> If you are not finished yet, select the Back arrow to keep building.','vlbia_05'],
			'block_6':['This park could really use a playground. Use the pieces from the car to build one!<br/><br/> Remember, you can use any pieces you want. You do not have to use all the pieces.<br/><br/> Select the Finished button when you are done building your playground.','vlbia_06'],
			'block_7':['Are you finished building your playground? If so, use the Snapshot button to take a picture of it. Then continue to the next challenge.<br/><br/> If you are not finished yet, select the Back arrow to keep building.','vlbia_07'],
			'block_8':['For your final challenge, you will use the pieces from the car to build a robot.<br/><br/> This time, you must use each of the pieces at least once. Make sure you use them all!<br/><br/> Select the Finished button when you are done building your robot.','vlbia_08'],
			'block_9':['Are you finished building your robot? If so, use the Snapshot button to take a picture of it.<br/><br/>If you are not finished yet, select the Back arrow to keep building.','vlbia_09'],
			'block_10':['Congratulations! You built several large objects from the parts of the car!<br/><br/> If you like, you can now go to Explore mode and continue building. Try building objects that look different than the first ones you built. Have fun!','vlbia_10']
		}
	}
	
function loadElements()
	{		
		var dragElemLen = Object.keys(myObject).length;		
		for(var i=0;i<dragElemLen;i++)
			{			
				var elem = Object.keys(myObject)[i];				
				$('.myContainer').append('<img class="hit" width="'+(myObject[elem].startW)+'" height="auto" id='+elem+' data-elem="mainDrag" src="'+(imgBaseAct+elem)+'.png" style="left:'+(myObject[elem].x)+'px;top:'+(myObject[elem].y)+'px;" />');
			}
		startBuildCar();
		cloneElem = $('#explore').html();
		$('.expContTabs,.dragContainer,.dragContainerClone').off('click').on('click', moveSlider);
		$('<img src="assets/images/template/lslider.png" width="24px" class="activeSlider" alt="Slide Animation"/>').appendTo('.expDiv');
		$('<img src="'+(templateStateImg.audiopause)+'" class="expDivIcon expAudio" audio-state="pause" width="30px"/><p class="expPara">Test Text</p>').appendTo('.expChild');		
		$('.expAudio').off('click').on('click', playGlobalAudio);		
		$('.activeSlider, .moveNextFood').off('click').on('click', expSlideDiv);
		$('.expDiv').css('left','0px');		
		$('.expPara').html(textBlock['explore']['block_0'][0]);		
		$('.breakButton').off('click').on('click', breakCar);
		$('.resetButton').off('click').on('click', removeActivity);
		$('.myContainer').find('.hit').css('display','none');
		changeHeightExp();	
	}	

var elemLen = 0;	
function resetActivity()
	{
		var splitNum = ctTab.split('_')[1];	
		elemLen = $('#'+parentTab).find('#tabCont_'+splitNum).children().length;		
		if(elemLen > 0)
			{				
				$('.resetButton,.finishButton').css('color','#000').css('background','#ffca04').css('cursor','pointer');	
				$('.finishButton').off('click').on('click', makeFinishObject);
				$('.resetButton').off('click').on('click', removeActivity);
			}
		else
			{
				$('.resetButton,.finishButton').css('color','#fff').css('background','#a7a9ab').css('cursor','default');
				$('.finishButton').off('click');	
			}
	}

function removeActivity()
	{
		var splitNum = ctTab.split('_')[1];			
		if(elemLen > 0)
			{				
				$('#'+parentTab).find('#tabCont_'+splitNum).children().stop().fadeOut(50, function(){
					$('#'+parentTab).find('#tabCont_'+splitNum).children().remove();
					resetActivity();		
				});				
			}
		globalAudioPause();			
	}
	
function makeFinishObject()
	{
		$('.expDiv').append('<div class="bubbleBar"> <img src="'+(templateStateImg.leftslideract)+'" id="bubbleleftNav" alt="Left move" class="bubblenavMove" width="28px"/> <span style="width:42px"></span> <img alt="Right move" src="'+(templateStateImg.rightslideract)+'" id="bubblerightNav" class="bubblenavMove" width="28px" style="cursor:pointer"/></div>');
		$('.bubblenavMove').off('click').on('click', moveTxtPopBlock);
		if($('.expDiv').position().left < 0 ){ expSlideDiv(); }		
			
		if(tabMove < 4) stepCount++;			
		$('.expPara').html(textBlock[parentTab]['block_'+(stepCount)][0]);
		globalAudioName = textBlock[parentTab]['block_'+(stepCount)][1];
		
		$('.finishButton,.resetButton').css('color','#fff').css('background','#a7a9ab').css('cursor','default');		
		$('.finishButton,.resetButton').off('click');
		$('#assetAudio').attr('src',activityAudios.finish);
		if(!disableSafari) $('#assetAudio').trigger('play');		
		$('.hit').draggable({disabled:true});
		$('.hit').off('mousemove');
		$(document).off('touchmove');
		$('.hit').css('cursor','default');
		$('.hit').off('click');	
		
		//Robot dropped image check
		var pushRobotimgs = [];
		var imageArray = [];
		if(tabMove>=4)
			{
				var totalLength = $('#tabCont_'+tabMove).find('.hit').each(function(i,j){
					var img = $(this).attr('src');
					var splitName = img.substring(img.lastIndexOf('/')+1, img.length).split('.')[0];					
					imageArray.push(splitName);
					imageArray=  $.unique(imageArray);					
					if(imageArray.length >= 12)
						{
							stepCount++;	
							$('.bubbleBar').remove();	
							$('.expPara').html(textBlock[parentTab]['block_'+(stepCount)][0]);
							globalAudioName = textBlock[parentTab]['block_'+(stepCount)][1];
							$('.finishButton,.resetButton').css('color','#fff').css('background','#a7a9ab').css('cursor','default');		
							$('.finishButton,.resetButton').off('click');$('.expDiv').append('<div class="bubbleBar"> <img src="'+(templateStateImg.leftslideract)+'" id="bubbleleftNav" alt="Left move" class="bubblenavMove" width="28px"/> <span style="width:42px"></span> <img alt="Right move" src="'+(templateStateImg.rightslideract)+'" id="bubblerightNav" class="bubblenavMove" width="28px" style="cursor:pointer"/></div>');
							$('.bubblenavMove').off('click').on('click', moveTxtPopBlock);
							$('.hit').draggable({disabled:true});
							$('.hit').off('mousemove');
							$(document).off('touchmove');
							$('.hit').css('cursor','default');
							$('.hit').off('click');	
							//if(stepCount >= 9) {$('.bubbleBar').remove();}
						}
					else
						{
							$('.bubbleBar').remove();
							$('.expPara').html(robotErr);
							globalAudioName = 'roboErr';								
							$('.hit').draggable({disabled:false});
							$('.hit').off('mousemove').on('mousemove', enableDrag);
							$(document).off('touchmove').on('touchmove', reEnableDrag);
							$('.hit').off('click').on('click', elementRotate);
							$('.resetButton,.finishButton').css('color','#000').css('background','#ffca04').css('cursor','pointer');	
							$('.finishButton').off('click').on('click', makeFinishObject);
							$('.resetButton').off('click').on('click', removeActivity);	
						}
				});
			}
		globalAudioPause();			
		changeHeightExp();	
	}

function moveTxtPopBlock(e)
	{
		var ctId = $(e.target).attr('id');			
		if(ctId == 'bubblerightNav')
			{
				$('.expPara').html('Select the '+(tabPos[tabMove])+' tab.');
				globalAudioName = 'st_'+(tabPos[tabMove]);
				$('#tab_'+(tabMove+1)).addClass('shadow-pulse');				
				tabMove++;								
				$('.resetButton,.finishButton').off('click');
				$('.resetButton,.finishButton').css('color','#fff').css('background','#a7a9ab').css('cursor','default');	
				$('.tabs').off('click').on('click', tabSelect).css('cursor','pointer');
				$('.hit').draggable({disabled:true});
				$('.hit').off('mousemove');
				$(document).off('touchmove');	
				$('.hit').off('click');	
			}
		else
			{
				stepCount--;
				$('.expPara').html('Continue building your '+(tabPos[tabMove-1]).toLowerCase()+'. Select the Finished button when you are done.');	
				globalAudioName = 'stap_'+tabPos[tabMove-1];
				$('.resetButton,.finishButton').css('color','#000').css('background','#ffca04').css('cursor','pointer');
				$('.resetButton').off('click').on('click', removeActivity);	
				$('.finishButton').off('click').on('click', makeFinishObject);
				$('.hit').draggable({disabled:false});
				$('.hit').off('mousemove').on('mousemove', enableDrag);
				$(document).off('touchmove').on('touchmove', reEnableDrag);
				$('.hit').off('click').on('click', elementRotate);		
			}
		
		$('.bubbleBar').remove();	
		if(tabMove >= 5)
			{
				$('.expPara').html(textBlock[parentTab]['block_10'][0]);
				globalAudioName = textBlock[parentTab]['block_10'][1];
				$('.tabs').off('click').css('cursor','default');
				$('.hit').draggable({disabled:true});
				$('.hit').off('mousemove');
				$(document).off('touchmove');
				$('.objectSlider').off('click').css('cursor','default');	
			}	
		globalAudioPause();	
		changeHeightExp();	
	}
	
function moveSlider(e)
	{
		var moveIn = $(e.target).attr('class');		
		if($(this).hasClass('expContTabs') || $(this).hasClass('dragContainer') || $(this).hasClass('dragContainerClone'))
			{			
				if($('.expDiv').position().left >= 0) expSlideDiv();		
			}
	}	
	
function startBuildCar()
	{
		for(var i=0;i<carBuild.length;i++)
			{
				var carElem = carBuild[i][0];			
				//kalai changes for adding id 
				$('.buildCar').append('<img class="carImages" id="c'+i+'" width="'+(myObject[carElem].w)+'" src="'+(imgBaseAct+carElem)+'.png" style="position:absolute;left:'+(carBuild[i][1][0])+'px;top:'+(carBuild[i][1][1])+'px;transform:rotate('+(carBuild[i][2])+'deg)"/>');
				
			}
	}
	
function breakCar()
	{
		if(!disableSafari) $('#assetAudio').trigger('play');
		$('#assetAudio').trigger('pause');
		globalAudioPause();
		$('.breakButton').css('background','url(assets/images/break_over.png)').css('background-repeat','no-repeat').css('cursor','default');
			$('.breakButton').off('click').click(function(){
				if($('.expDiv').position().left >= 0 ) expSlideDiv();
			});
		
		$('.myContainer').stop(true,true).animate({left:0},traySlideTime,function(){
			for(var i=0;i<carBuild.length;i++)
			{
				var carElem = carBuild[i][0];
				if(!disableSafari) $('#assetAudio').trigger('play');	
				
				$('.carImages').eq(i).stop(true,true).animate({rotate: 0,left:myObject[carElem].x,top:myObject[carElem].y,width:myObject[carElem].startW,opacity:1},carBreakTime,function(){						
					$('.myContainer').find('.hit').css('display','block');
					$('.expPara').html(textBlock[parentTab]['block_1'][0]);
					globalAudioName = textBlock[parentTab]['block_1'][1];
					$('.buildCar').css('display','none');
					$('.myContainer').find('.hit').stop().fadeIn(100);
					if($('.expDiv').position().left < 0 ) expSlideDiv();
					globalAudioPause();	
					changeHeightExp();
					callTabAnim();							
				});
			}						
		});		
	}

function callTabAnim()
	{
		if(parentTab == 'explore')
			{
				$('.tabs').addClass('shadow-pulse');
				$('.tabs').off('click').on('click', tabSelect).css('cursor','pointer');
			}
		else
			{
				$('#tab_1').addClass('shadow-pulse');
				$('.tabs').off('click').on('click', tabSelect).css('cursor','pointer');
			}			
	}	

function bindEvents()
	{			
		$('.hit').draggable({refreshPositions:true,helper:'clone',containment:'.dragContainer',zIndex:100,start:startDrag,drag:runDrag,stop:dragEnd,cursor: "move"});
		$('.hit').off('mousemove').on('mousemove', enableDrag);
		$(document).off('touchmove').on('touchmove', reEnableDrag);
		$('.expContTabs').droppable({greedy:true,tolerance:'fit',drop:dropElem});
		$('.objectSlider').off('click').on('click', objectTray).css('cursor','pointer');
		$('.trayContainer').droppable({greedy:true,tolerance:'touch',drop:removeElem});
		$('.trayDummy').off('click').on('click', objectTrayDummy)
	}	

function removeElem(event, ui)
	{
		if($(ui.draggable).attr('data-elem') != 'mainDrag')
			{
				var dragElem = $(ui.draggable).attr('id');
				$('#'+dragElem).remove();
				resetActivity();	
			}
	}	
	
function objectTray()
	{
		var movePos = ($('.myContainer').position().left <= 0)?152:0;
		$('.trayDummy').css('display','none');
		$('.myContainer').css('display','block');		
		$('.myContainer').stop().animate({left:movePos},traySlideTime, function(){
			$('.trayDummy').css('display','block');
			$('.myContainer').css('display','none');			
		});
	}	

function objectTrayDummy()
	{		
		$('.myContainer').css('display','block');
		$('.myContainer').stop().animate({left:0},traySlideTime, function(){
			$('.trayDummy').css('display','none');			
		});
	}
	
function enableDrag(e)
	{			
		var ctId = $(this).attr('id');		
		var hit = $('#'+ctId).hitTestPoint({"x":e.pageX,"y":e.pageY, "transparency":true});		
		if(hit)
			{
				$('#'+ctId).draggable({disabled:false});
				$('#'+ctId).css('cursor','pointer');
			}
		else
			{
				$('.hit').draggable({disabled:true});
				$('.hit').css('cursor','default');	
			}		
	}

var shapeleft=0, shapetop = 0;
var sl= 0, st=0;
function dropElem(event, ui)
	{
		if($(ui.draggable).attr('data-elem') == 'mainDrag')
			{
				var dragElem = $(ui.draggable).attr('id');
				$(ui.helper).css({'width': myObject[dragElem].w});
				$(ui.helper).css({'height': myObject[dragElem].h});	
				ui.helper.attr('id', dragElem+'_'+myObject[dragElem].count);
				selectedID = dragElem+'_'+myObject[dragElem].count;
				ui.helper.removeAttr('data-elem');	
				ui.helper.attr('data-rotate',0);
				myObject[dragElem].count = myObject[dragElem].count+1;				
				var new_drag = $(ui.helper).clone();				
				var deftab = ctTab.split('_')[1];
				$(this).find('#tabCont_'+deftab).append(new_drag);		
				$('#'+selectedID).draggable({refreshPositions:true,containment:'.dragContainerClone',start:helperStart,drag:helperDrag,stop:helperStop});	
				$('#'+selectedID).off('mousemove').on('mousemove', enableDrag);			
				$('#'+selectedID).off('click').on('click', elementRotate);
				sl= parseInt($('#'+selectedID).css('left'))+parseInt($('#'+selectedID).css('width'))/2;
				st= parseInt($('#'+selectedID).css('top'))+parseInt($('#'+selectedID).css('height'))/2;
				$('#assetAudio').attr('src',activityAudios.drop);
				if(!disableSafari) $('#assetAudio').trigger('play');				
				resetActivity();					
			}
	}	
	
function startDrag(event, ui)
	{		
		if(($(this).attr('data-elem') == 'mainDrag'))
			{
				if($(this).attr('data-elem') == 'mainDrag')
					{
						var dragId = $(this).attr('id');
						$(ui.helper).css({'width': myObject[dragId].w});
						$(ui.helper).css({'height': myObject[dragId].h});
					}
				else
					{
						var dragId = $(this).attr('id');
						dragId = String(selectedID.substring(selectedID.lastIndexOf('_'),0));
					}				
				ui.helper.css('z-index', dcount++);			
			}		 
	}

function runDrag(event, ui)
	{
		if(($(this).attr('data-elem') == 'mainDrag'))
			{	
				var dragId = $(this).attr('id');
				var getLpos = ui.helper.position().left;
				var getTpos = ui.helper.position().top;									
			}			
	}
	
function reEnableDrag(e)
	{			
		$('.hit').draggable({disabled:false});
	}
	
function dragEnd()
	{	
		$('.hit').draggable({enabled:true});		
	}	

function helperStart(event, ui)
	{
		if($('#'+selectedID).attr('data-elem') != 'mainDrag')
			{
				$(this).css('z-index', dcount++);		
			}
	}
	
function helperDrag(event, ui)
	{		
		window.clearTimeout(animObj);
		dragCheck = false;						
	}	

function helperStop(event, ui)
	{		
		var hidePos = $(this).position().left+$(this).width();		
		if(hidePos > 770 && $('.myContainer').position().left>=0)
			{
				$(this).css('z-index', 0);				
			}
		var dragEndTimer = window.setTimeout(function(){
			dragCheck = true;
			calulateElemDist();
			window.clearTimeout(dragEndTimer);				
		},100);
	}	

var defId;	
function elementRotate(e)
	{	
		e.stopPropagation();
		selectedID = $(this).attr('id');
		ctShape = String(selectedID.substring(selectedID.lastIndexOf('_'),0)); 		
		var hit = $('#'+selectedID).hitTestPoint({"x":e.pageX,"y":e.pageY, "transparency":true});
		var ctElemIndex = parseInt($(this).css('z-index'));
		
		if((ctElemIndex != dcount-1) && (dragCheck))
			{
				$(this).css('z-index', dcount++);					
			}
		else if((dragCheck) && (hit) && ($(this).attr('data-elem') != 'mainDrag'))
			{
				selectedID = $(this).attr('id');			
				var totalAngle = Number(Object.keys(myObject[ctShape].angle).length);		
				var ctElemAngle = Number($('#'+selectedID).attr('data-rotate'));
				
				sl= parseInt($('#'+selectedID).css('left'))+parseInt($('#'+selectedID).css('width'))/2;
				st= parseInt($('#'+selectedID).css('top'))+parseInt($('#'+selectedID).css('height'))/2;	
				
				if(ctElemAngle < (totalAngle-1))
					{
						ctElemAngle = ctElemAngle+1;
						$('#'+selectedID).attr('data-rotate',ctElemAngle);
					}
				else
					{
						$('#'+selectedID).attr('data-rotate',0);
						ctElemAngle = 0;
					}
					
				var angleFix = myObject[ctShape].angle[ctElemAngle];			
				var chW = myObject[ctShape].size[ctElemAngle][0];
				var chH = myObject[ctShape].size[ctElemAngle][1];	
				$('#'+selectedID).attr('src','');
				$('#'+selectedID).attr('src',(imgBaseAct+ctShape)+'/'+ctShape+'_'+angleFix+'.png');
				$('#'+selectedID).css('width', chW).css('height', chH);
				$('#'+selectedID).attr('width', chW).attr('height', chH);

				$('#'+selectedID).css('left', sl-parseInt($('#'+selectedID).css('width'))/2);	
				$('#'+selectedID).css('top', st-parseInt($('#'+selectedID).css('height'))/2);	
				
				var hit = $('#'+selectedID).hitTestPoint({"x":e.pageX,"y":e.pageY, "transparency":true});
				if(hit)
					{				
						$('#'+selectedID).draggable({disabled:false});
						$('#'+selectedID).css('cursor','pointer');
					}
				else
					{
						$('.hit').draggable({disabled:true});
						$('.hit').css('cursor','default');	
					}
			}
		else
			{
				
			}		
	}

var dxy = 0;	
var pushValues = [];
function calulateElemDist()
	{
		//console.clear();
		var deftab = ctTab.split('_')[1];
		var childLen = $('#tabCont_'+deftab).children().length;
		pushValues = [];
		for(var i=0;i<childLen;i++)
			{				
				var elemDragId = $('#tabCont_'+deftab).find('img').eq(i).attr('id');
				if(elemDragId != selectedID)
					{	
						var x1 = parseInt($('#'+elemDragId).css('left'))+parseInt($('#'+elemDragId).css('width'))/2;		
						var x2 = parseInt($('#'+selectedID).css('left'))+parseInt($('#'+selectedID).css('width'))/2;
						var y1 = parseInt($('#'+elemDragId).css('top'))+parseInt($('#'+elemDragId).css('height'))/2;
						var y2 = parseInt($('#'+selectedID).css('top'))+parseInt($('#'+selectedID).css('height'))/2;
						var dxy1 = x2 - x1;
						var dxy2 = y2 - y1;						
						//dxy = Math.sqrt(dxy1*dxy1+dxy2*dxy2);
						dxy = Math.hypot(x2-x1, y2-y1);						
						pushValues.push([dxy, $('#tabCont_'+deftab).find('img').eq(i).attr('id')]);
					}	
			}		
	}

var animObj;
var animValue = 1;
var tabPos = ['House','Bridge','Playground','Robot']	
var oneTimeTab = true;	
function tabSelect()
	{
		if($('.tabs').hasClass('shadow-pulse'))
			{ 
				bindEvents();
				$('.resetButton,.finishButton').css('display','flex');
				$('.finishButton').on('click', makeFinishObject).off('click');			
			}	
		ctTab = $(this).attr('id');
		var splitNum = parseInt(ctTab.split('_')[1]);
		if(parentTab == 'explore')
			{	
				$('.expPara').html(textBlock[parentTab]['block_'+(splitNum+1)][0]);	
				globalAudioName = textBlock[parentTab]['block_'+(splitNum+1)][1];	
			}
		else
			{
				if(oneTimeTab)
					{
						$('.expPara').html(textBlock[parentTab]['block_'+(stepCount)][0]);
						//console.log('1')
						if((tabPos[tabMove-1] != $(this).text()))	
							{
								$('.expPara').html('Select the '+(tabPos[tabMove-1])+' tab to continue.');
								globalAudioName = 'stc_'+(tabPos[tabMove-1]);	
								$('.resetButton,.finishButton').css('display','none');	
								$('.hit').draggable({disabled:true});
								$('.hit').off('mousemove');
								$(document).off('touchmove');
								$('.hit').off('click');	
							}
						else
							{
								$('#tabCont_'+splitNum).css('display','block');
								$('.tabs').removeClass('shadow-pulse');
								$(this).css('background','#323232').css('color','#fff').css('cursor','default');								
								var bgChange = $('#tabCont_'+splitNum).text().toLowerCase();
								$('.actBg').attr('src',imgBase+'bg/'+bgChange+'.png');
								stepCount++;
								$('.expPara').html(textBlock[parentTab]['block_'+(stepCount)][0]);
								globalAudioName = textBlock[parentTab]['block_'+(stepCount)][1];
								$('.tabs').off('click').css('cursor','default');
								$('.breakButton').css('display','none');
								$('.resetButton,.finishButton').css('display','flex').css('color','#fff').css('background','#a7a9ab').css('cursor','default');
								$('.hit').draggable({disabled:false});
								$('.hit').off('mousemove').on('mousemove', enableDrag);
								$(document).off('touchmove').on('touchmove', reEnableDrag);	
								$('.hit').off('click').on('click', elementRotate);
								changeHeightExp();	
							}
						if($('.expDiv').position().left < 0 ) expSlideDiv();
						oneTimeTab = false;
						globalAudioPause();		
						return;
					}
				else
					{	
						if((tabPos[tabMove-1] == $(this).text()))	
							{
								stepCount++;
								$('.expPara').html(textBlock[parentTab]['block_'+(stepCount)][0]);
								globalAudioName = textBlock[parentTab]['block_'+(stepCount)][1];
								$('.tabs').off('click').css('cursor','default');
								$('.tabs').css('background','#A7A9AC');
								if($('.expDiv').position().left < 0 ) expSlideDiv();
								changeHeightExp();
							}
						else
							{
								$('.expPara').html('Select the '+(tabPos[tabMove-1])+' tab to continue.');
								globalAudioName = 'stc_'+(tabPos[tabMove-1]);	
								$('.bubbleBar').remove();
								if($('.expDiv').position().left < 0 ) expSlideDiv();	
								if(tabMove <= 1) $('.resetButton,.finishButton').css('display','none');
								$('.hit').draggable({disabled:true});
								$('.hit').off('mousemove');
								$(document).off('touchmove');
								globalAudioPause();	
								return;
							}					
					}
				$('.resetButton').off('click').on('click', removeActivity);	
				$('.finishButton').off('click').on('click', makeFinishObject);	
				$('.tabs').css('cursor','default');
			}
		$('.tabsCont').css('display','none');
		$('#tabCont_'+splitNum).css('display','block');
		if(parentTab == 'explore') {$('.tabs').css('background','#A7A9AC').css('color','#000').css('cursor','pointer');}
		$(this).css('background','#323232').css('color','#fff').css('cursor','default');
		var leftPos = parseInt($(this).css('left'));		
		$('.navBar').css('left',leftPos).css('display','block');
		$('.tabs').removeClass('shadow-pulse');
		var bgChange = $('#tabCont_'+splitNum).text().toLowerCase();
		$('.actBg').attr('src',imgBase+'bg/'+bgChange+'.png');
		$('.breakButton').css('display','none');
		if($('.expDiv').position().left < 0 ) expSlideDiv();
		resetActivity();	
		globalAudioPause();		
		changeHeightExp();	
	}

var sliderHeadDrag = function(){
	$('<div class="headerDrag"><div>&equiv;</div></div>').appendTo('.expDiv');
	$('.expDiv').draggable({
		containment:'.sliderContain',
		handle:'.headerDrag'
	})		
}	