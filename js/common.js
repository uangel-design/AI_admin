$(document).ready(function(){
  /* contents size */
	$('.wrap').css('height', $(window).height());
	$('.wrap').css('min-height', $('.wrap_content').height());
  $('.wrap_content').css('margin-left', $('.wrap_lnb').width());
	$('.wrap_content .scrollbar-inner').css('width', $('.wrap_content').width());
	$('.pop_move').css({'width':$('.pop_inner').width(), 'height':66+'px'});
	/* resize */
  $(window).on('resize', function(){
		$('.wrap').css('height', $(window).height());
		$('.wrap').css('min-height', $('.wrap_content').height());
    $('.wrap_content').css('margin-left', $('.wrap_lnb').width());
  });

	/*
	$('.num_print .option').on('click', function(){
	  setTimeout(function() {
	    $(window).trigger('resize');
	  }, 300);
	});
	*/

 /* popup center open */
	$('.btn_pop_open').click(function(event){
		$('.pop_inner').css({
			'top':(($(window).height()-$('.pop_inner').outerHeight())/2)+'px',
			'left':(($(window).width()-$('.pop_inner').outerWidth())/2)+'px'
		});
	  $('body').css('overflow','hidden');//body scroll hide
		$('.pop_wrap .btn_area .btn_default').attr('tabindex', '1');
		$('.pop_wrap .btn_area .btn_primary').attr('tabindex', '0').focus();
		$('.pop_wrap .btn_area .btn').keydown(function (key) {
    	if(key.keyCode == 13){//enter 13
        $(this).trigger('click');
			} else if(key.keyCode == 32){//space bar 32
        $(this).trigger('click');
			} else if(key.keyCode == 37){//left arrow 37
        $(this).prev('.btn').focus();
			} else if(key.keyCode == 39){//right arrow 39
        $(this).next('.btn').focus();
			}
    });
  });

	$('.pop_wrap .btn_close').click(function(event){
		$('body').css('overflow','auto');//body scroll show
		$('.pop_wrap .btn_area .btn_default').removeAttr('tabindex');
		$('.pop_wrap .btn_area .btn_primary').removeAttr('tabindex');
	});

	/* scrollbar */
	$('.scrollbar-inner').scrollbar();

	/* selectbox */
	$('select:not(.ignore)').niceSelect({
		width:'max-content',
		minWidth:'100%'
	});

	/* radio, checkbox readonly	적용 */
	$('input.readonly').attr('onclick', 'return false;');

	/* 점검결과등록 모니터링결과 정상일때 오류항목 비활성처리 */
	$('.pop_wrap .box_type1 .radio').on('click', function(){
		if($(this).find('label').text() == '정상'){
			$(this).siblings('.box_type2').addClass('disabled').find('input').attr('disabled', 'disabled').prop('checked', false);
			$(this).parents().next('.item').find('.textarea').addClass('disabled').find('textarea').attr('readonly', true);
		} else {
			$(this).siblings('.box_type2').removeClass('disabled').find('input').removeAttr('disabled');
			$(this).parents().next('.item').find('.textarea').removeClass('disabled').find('textarea').attr('readonly', false);
		}
	});

	/* 모니터링 배정조건 설정 업무유형별 비활성처리 */
	$('.select_target li').on('click', function(){
		 if ($(this).text() == 'NLU모니터링'){
		 	$('.set_type2').addClass('disabled').find('input').attr('disabled', 'disabled');
		 } else {
			$('.set_type2').removeClass('disabled').find('input').removeAttr('disabled');
		 }
	});

	/* 미인식발화문구 삭제 */
	$('.txt_item .btn_del').click(function(){
		$(this).parent('.txt_item').remove();
	});

	/* calendar */
	flatpickr.localize(flatpickr.l10ns.ko); //korean
	$('.calendar').flatpickr({
		enableTime:false,
		monthSelectorType:'static',
		local:'ko',
	});
	$('.time').flatpickr({
		enableTime:true,
    noCalendar:true,
    dateFormat:'H:i',
	});
	$('.calendar_range').flatpickr({
		enableTime:true,
		monthSelectorType:'static',
		local:'ko',
		mode:'range',
		dateFormat:'Y-m-d H:i:S',
		enableTime:true,
		enableSeconds:true
	});
	/* calendar icon */
	$('.wrap_calendar .ico').click(function(){
		$(this).siblings('.inp').trigger('click');
	});

	/* tab */
	$('.tab_list a').click(function(){
		$(this).parent('li').addClass('on').siblings('li').removeClass('on');
	});

	/* table sort button */
	$('.btn_sort').click(function(){
		$(this).toggleClass('on');
	});

	/* paging */
	$('.paging a').click(function(){
		$(this).addClass('current').siblings('a').removeClass('current');
	});

	/* table click */
	$('.tbl_type1 td').click(function(){
		$(this).parents('tr').toggleClass('on').siblings('tr').removeClass('on');
	});

	/* checkbox */
	$('.checkbox').click(function(){
		$(this).children('input').trigger('click');
	});

	/* checkbox all */
	var checkAll = function(target, targetItem, targetChecked){
		var $checkAll = $(target);
		var boxes = $(targetItem);
		$checkAll.change(function(){
			var checked = $(this).prop('checked');
			$(targetItem).prop('checked', checked);
		});
		$(targetItem).change(function(){
			var boxLength = boxes.length;
			var checkedLength = $(targetChecked).length;
			var checkdAll = (boxLength == checkedLength);
			$checkAll.prop('checked', checkdAll);
		});
	}
	checkAll('.check_all','input[name="dataList_1"]','input[name="dataList_1"]:checked');
	checkAll('.check_all2','input[name="setList_1"]','input[name="setList_1"]:checked');

	/** lnb **/
	/* open close */
	$('.wrap_lnb .btn_toggle').click(function(){
		$('.wrap_lnb').removeClass('m_defult').toggleClass('m_type2');
		$('.wrap').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
	  function(e){
	    $('.wrap .wrap_content').css('margin-left', $('.wrap_lnb').width());
	  });
		if ($(this).parent().parent().attr('class')=='wrap_lnb m_type2'){
			$('.m_type2 .m_2depth').removeClass('open');
			$('.m_type2 .m_2depth a').click(function(){
				$('.m_type2 .box_group li').removeClass('toggle');
				$('.m_type2 .m_2depth').removeClass('open');
			});
		}
	});
	/* 2depth menu */
	$('.wrap_lnb .m_1depth').click(function(){
		$('.m_1depth').removeClass('m_on');
		$(this).parents('li').toggleClass('toggle').siblings('li').removeClass('toggle');
		$(this).addClass('m_on').next('ul').addClass('open');
		//2depth on class
		if ($(this).attr('class')=='m_1depth m_single m_on'){
			$('.m_2depth a').removeClass('on');
		}
	});
	$('.wrap_lnb .m_2depth a').click(function(){
		$('.wrap_lnb .m_2depth a').removeClass('on');
		$(this).addClass('on');
	});
	/* layer popup move */
	var x_styleLeft, y_styleTop, x_accept, y_accept;
	$('.pop_move .pop_top').mousedown(function(event){
		x_styleLeft = event.clientX - $('.pop_move').offset().left;
		y_styleTop = event.clientY - $('.pop_move').offset().top;
		$(document).mousemove(function(event){
			x_accept = event.clientX - x_styleLeft;
			y_accept = event.clientY - y_styleTop;
			$('.pop_move').css('left',x_accept+'px');
			$('.pop_move').css('top',y_accept+'px');
		});
	});
}).mouseup(function(){
	$(this).off('mousemove');
});
//layer popup
function view_layer(name){
	document.getElementById(name).style.display='block';
}
function close_layer(name){
	document.getElementById(name).style.display='none';
}