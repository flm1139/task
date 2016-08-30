      // 首页点击切换国家
$('.footer .copyright .language h3').click(function(){
	// alert('aa')
	$(this).parent().find('li').toggle();
	// $(this).toggleClass('add');

	$(this).find('.carset').toggleClass('add2');
});
$('.footer .copyright .language li').mousedown(function(){
	name=$(this).find('a').html();
	name1=$(this).parent().find('h3 a').html();
	$(this).parents('.language').find('h3 a').html(name);
	// $(this).parent().toggle();
});
$('.footer .copyright .language li').mouseup(function(){
	$(this).find('a').html(name1);
	$(this).parent().find('h3 a').html(name);
	$(this).parent().find('li').hide();
});

       //  首页右侧浮动按钮
   $(window).scroll(function(){
   		aa=$('body').scrollTop();
   		// document.title=aa;
   		if(aa>=600){
   			$('.sidebtn').show();
   		}else{
   			$('.sidebtn').hide();
   		}

   });
   $('.sidebtn').click(function(){
   		$('html,body').animate({scrollTop:0},2000)
   });
  // 首页轮播
// setInterval(function(){
// 	$('.banner li:eq(0)').fadeOut(800,function(){
// 		$(this).appendTo('.banner').show();
// 	});
// },3000);
// 首页轮播移动特效
$('.containers .main ul.banner li.first').mousemove(function(event){
		Px=event.clientX;
		Py=event.clientY;   //鼠标XY坐标
		//Sw=screen.width/2;  //屏幕一半数值
		Dx=Px-($('.containers .main ul.banner').offset().left+560);  //图片上偏移量于坐标x的差
		Dy=($('.containers .main ul.banner').offset().top+130)-Py; //图片上偏移量于坐标y的差
		// alert($('.containers .main ul.banner').offset().left);
		// alert($('.containers .main ul.banner').offset().top);
		// alert($('.containers .main ul.banner').offset().top+230);
		// alert(Dy);
		// document.title =$(this).offset().top;
		// Dx=Px-Sw                       //图片上偏移量于坐标x的差
		Xper=1/580;     //X轴每像素的偏移角度
		Yper=1/130;     //y轴每像素的偏移角度
		Xm=Xper*Dx;     //X轴随鼠标偏移角度
		Ym=Yper*Dy;     //y轴随鼠标偏移角度

		$(this).css({'-webkit-transform':'perspective(400px) rotateX('+Ym+'deg)rotateY('+Xm+'deg)'});
		// $(this).css({'perspective':'800px'});
		// $(this).css({'transform-style':'preserve-3d'});
});
$('.containers .main ul.banner li.first').mouseout(function(){
	$(this).css({'-webkit-transform':'rotateX(0deg)rotateY(0deg)'});
});



        // 锤子T2的把控
$('.floor1 .right .choose a').click(function(){
	$('.floor1 .right .choose a').removeClass('add-border');
	$(this).addClass('add-border');
	num=$(this).attr('num');
	num1=$(this).attr('num1');
	span1=$(this).find('span').html();
	$('.t2-content .floor5 .main .t2-pri .new-pri span').html(span1);
	$('.t2-content .floor5 .main .t2-pri .old-pri').html(num);
	$('.t2-content .floor5 .main .t2-des strong').html(num1);

});
   // 锤子T2轮播把控
 // i=1;
 // anima();
// setInterval(anima,3000);
// function anima(){
// 	len=$('.f2-img li').length;  
	
	
// 	if(i>=len){
// 		i=1;
// 		$('.f2-img li').first().addClass('move');
// 		$('.f2-img li').last().removeClass('move');
// 	}
	
// 	$('li.move').removeClass('move').next().addClass('move');
// 	i++;
// }
ind1=0;
t2=setInterval(function(){
	if(ind1<$('.f2-img li').length-1){
		ind1++;
	}else{
		ind1=0;
	}
	// alert(ind1);
	changeImg(ind1);
},3000);

// 鼠标移上去后图片变化
$('.f2-light li').each(function(ite){
	$(this).stop(true,true).hover(function(){
		// light=$(this).index('.f2-lignt li');
		clearInterval(t2);
		changeImg(ite);
	},function(){
		setInterval(function(){
		if(ind1<$('.f2-img li').length-1){
			ind1++;
		}else{
			ind1=0;
		}
		// alert(ind1);
		changeImg(ind1);
	},3000);
});

});
function changeImg(num){
	$('.f2-img').find('li').removeClass('move').eq(num).addClass('move');
	$('.f2-light').find('li').removeClass('move').eq(num).addClass('move');
};
  // 锤子t2底部固定
  $(window).scroll(function(){
   		tops=$('body').scrollTop();
   		// document.title=tops;
   		if(tops<9706){
   			$('.smartisanT2-buy .t2-content .floor5').css({'position':'fixed','bottom':0+'px','z-index':100});
   		}else{
   			$('.smartisanT2-buy .t2-content .floor5').css({'position':'static'});
   		}
   });


   //T2下一级增值服务

//上面的
a=0;
b=0;
$('.smartisanT2-service .service-content .panel-top form p:first input').click(function(){
	// alert(1)
	a=0;
	if(a+b==0){
		$(this).parents('.left').prev().find('.add').hide();
		$(this).parents('.left').prev().find('.add').prev().show();
		$(this).parents('.left').prev().find('.price span').html(1999);
	}
	$(this).parents('.panel-service').prev().hide();                             //控制头上的P的显示隐藏
	$(this).parents('.left').prev().find('.add').find('p:eq(0)').hide();    //控制右侧的显示隐藏
	
	if(a+b==1){
		$(this).parents('.left').prev().find('.price span').html(2199);
	}
	
});
$('.smartisanT2-service .service-content .panel-top form p:last input').click(function(){
	// alert(2)
	a=1;

	$(this).parents('.panel-service').prev().show();
	$(this).parents('.left').prev().find('.add').show();
	$(this).parents('.left').prev().find('.add').prev().hide();
	$(this).parents('.left').prev().find('.add h3').show();
	$(this).parents('.left').prev().find('.add p:eq(0)').show();
	p1=$(this).parents('.left').prev().find('.price span').html();       //控制钱
	// alert(Number(p1)+200)
	// alert(typeof p1)     //字符窜
	$(this).parents('.left').prev().find('.price span').html(Number(p1)+200)
});
//点击叉号
$('.smartisanT2-service .service-content .right .add p:eq(0) span').click(function(){
	// alert(3)
	$(this).parents('.right').next().find('.panel-top .panel-content form p:first input').click();

});
// 下面的单选按钮
c1=$('.smartisanT2-service .service-content .panel-bottom form p:first input').click(function(){
	// alert(1)
	b=0;
	if(a+b==0){
		$(this).parents('.left').prev().find('.add').hide();
		$(this).parents('.left').prev().find('.add').prev().show();
		$(this).parents('.left').prev().find('.price span').html(1999);
	}
	$(this).parents('.panel-service').prev().hide();                         //控制头上的P的显示隐藏
	$(this).parents('.left').prev().find('.add').find('p:eq(1)').hide();     //控制右侧的显示隐藏
	
});
c2=$('.smartisanT2-service .service-content .panel-bottom form p:last input').click(function(){
	// alert(2)
	b=1;
	$(this).parents('.panel-service').prev().show();
	$(this).parents('.left').prev().find('.add').show();
	$(this).parents('.left').prev().find('.add').prev().hide();
	$(this).parents('.left').prev().find('.add h3').show();
	$(this).parents('.left').prev().find('.add p:eq(1)').show();       //控制右侧显示隐藏
	p2=$(this).parents('.left').prev().find('.price span').html();       //控制钱
	// alert(Number(p1)+200)
	// alert(typeof p1)     //字符窜
	$(this).parents('.left').prev().find('.price span').html(Number(p2)+200);



});
//点击叉号
$('.smartisanT2-service .service-content .right .add p:eq(1) span').click(function(){
	// alert(3)
	$(this).parents('.right').next().find('.panel-bottom .panel-content form p:first input').click();

});



   //T2配件一级把控 
 // aa=$('.service-content .left .panel-service').find('input');
 
 // if(){
 // 	$('.service-content .left .panel-service .panel-introduction .panel-gray').addClass('posi');
 // }else{
 // 	$('.service-content .left .panel-service .panel-introduction .panel-gray').removeClass('posi')
 // }

//点击切换耳机种类
n=0;
m=0;
// 上一个
$('.smartisanT2-fitting .panel-top .panel-service form p').eq(0).find('input').click(function(){
	n=0;
	// alert(0);
	if(n==0){
		$(this).parents('form').next().find('.panel-gray').addClass('posi');
	}
	
});
$('.smartisanT2-fitting .panel-top .panel-service form p').eq(1).find('input').click(function(){
	n=1;
	$(this).parents('form').next().find('.panel-gray').removeClass('posi');
});
// 叉号
$('.smartisanT2-fitting .cart-bottom .add p:eq(0) span').click(function(){
	$('.smartisanT2-fitting .panel-top .panel-service form p').eq(0).find('input').click();
	$(this).parent().hide();
	$(this).parents('add').prev().show();
});
$('.smartisanT2-fitting .cart-bottom .add p:eq(1) span').click(function(){
	$('.smartisanT2-fitting .panel-top .panel-service form p').eq(1).find('input').click();
});

// 下一个
$('.smartisanT2-fitting .panel-bottom .panel-service form p').eq(0).find('input').click(function(){
	m=0;
	// alert(0);
	if(n==0){
		$(this).parents('form').next().find('.panel-gray').addClass('posi');
	}
	
});
$('.smartisanT2-fitting .panel-bottom .panel-service form p').eq(1).find('input').click(function(){
	m=1;
	$(this).parents('form').next().find('.panel-gray').removeClass('posi');
});


//点击换颜色
spanClick=$('.left .panel-top .panel-content .panel-introduction p').eq(0).find('span');
    spanClick.click(function(){
	spanClick.removeClass('bdcolor');
	$(this).addClass('bdcolor');           //选择颜色
	nub1=$(this).attr('nub');
	$(this).parent().next().find('span').hide();
	$(this).parent().next().find('span[nub='+nub1+']').show();  //显示颜色对应的文字
	
});

spanClick1=$('.left .panel-bottom .panel-content .panel-introduction p').eq(0).find('span');
    spanClick1.click(function(){
	spanClick1.removeClass('bdcolor');
	$(this).addClass('bdcolor');        //选择颜色
	nub2=$(this).attr('nub');
	$(this).parent().next().find('span').hide();
	$(this).parent().next().find('span[nub='+nub2+']').show();     //显示颜色对应的文字
});

spanClick2=$('.left .panel-top .panel-content .panel-introduction p').eq(1).find('a');
spanClick2.click(function(){
	$(this).parents('.left').prev().find('.cart-bottom .add').show();
	$(this).parents('.left').prev().find('.cart-bottom>p').hide();
	$(this).parents('.left').prev().find('.cart-bottom .add p[nub='+nub1+']').show();  //右面对应的显示
});



   //T2购物车一级把控
// 选择按钮的把控

i=1;
j=1;
k=1;
$('.shopping-caption .money .choo').click(function(){
	if(i%2==0){
		j=1;
		k=1;
		$('.shopping-caption .phone .choo').addClass('choose');
		$('.shopping-caption .money span i').html(Number($('.shopping-caption .mobil span b').html())+Number($('.shopping-caption .hull span.Num b').html())+'.00');
	}else{
		j=0;
		k=0;
		$('.shopping-caption .phone .choo').removeClass('choose');  //点击全选
		$('.shopping-caption .money span i').html(0+'.00');
	}
	i++;
});
$('.shopping-caption .mobil .choo').click(function(){
		if(j%2==0){
			i=1;
			$(this).addClass('choose');
			$('.shopping-caption .money span i').html($('.shopping-caption .mobil span b').html());
		}else{
			i=0;
			$(this).removeClass('choose');  //单选
			$('.shopping-caption .money span i').html($('.shopping-caption .hull span.Num b').html());
		}
		j++;
		ch=$('.shopping-caption .phone .choo').not($('.shopping-caption .money .choo')).length; //已购数量
		c=$('.shopping-caption .phone .choose').not($('.shopping-caption .money .choo')).length;
		if(ch==c){
			$('.shopping-caption .money .choo').addClass('choose');
			$('.shopping-caption .money span i').html(Number($('.shopping-caption .mobil span b').html())+Number($('.shopping-caption .hull span.Num b').html())+'.00');
		}else{
			$('.shopping-caption .money .choo').removeClass('choose');
		}

});
$('.shopping-caption .hull .choo').click(function(){
		if(k%2==0){
			i=1;
			$(this).addClass('choose');
			$('.shopping-caption .money span i').html($('.shopping-caption .hull span.Num b').html());
		}else{
			i=0;
			$(this).removeClass('choose');  //单选
			$('.shopping-caption .money span i').html($('.shopping-caption .mobil span b').html());
		}
		k++;
		ch=$('.shopping-caption .phone .choo').not($('.shopping-caption .money .choo')).length; //已购数量
		c=$('.shopping-caption .phone .choose').not($('.shopping-caption .money .choo')).length;
		if(ch==c){
			$('.shopping-caption .money .choo').addClass('choose');
			$('.shopping-caption .money span i').html(Number($('.shopping-caption .mobil span b').html())+Number($('.shopping-caption .hull span.Num b').html())+'.00');
		}else{
			$('.shopping-caption .money .choo').removeClass('choose');
		}

});

// 删除已购产品的把控
$('.T2-shopping .shopping-caption .phone .cart em').click(function(){
	con=confirm('你确认删除么？');
	if(con){
		$(this).parents('.phone').hide();
	}
});
 //加减产品的把控
 

//加
$('.shopping-caption .hull .add').click(function(){
	val=$(this).prev().val();
	val++;
	$(this).prev().val(val);   //量的加
	
	perPrice=$(this).parent().next().find('b').html();
	// alert(perPrice);
	$(this).parent().prev().find('b').html(perPrice*val+'.00');  //加时单个商品总价的变化
	All=$(this).parents('.shopping-caption').find('.mobil').find('b').html();
	$(this).parents('.hull').next().find('i').html((perPrice*val+Number(All))+'.00');  //总价的变化
});
//减
$('.shopping-caption .hull .subtract').click(function(){
	val=$(this).next().val();
	val--;
	if(val<=1){
		val=1;
		$(this).css({'cursor':'not-allowed'});  //控制不能少于1
	}
	$(this).next().val(val);     //量的减
	per_Price=$(this).parent().next().find('b').html();
	// alert(perPrice);
	$(this).parent().prev().find('b').html(per_Price*val+'.00'); //减时单个商品总价的变化
	All=$(this).parents('.shopping-caption').find('.mobil').find('b').html();
	$(this).parents('.hull').next().find('i').html((perPrice*val+Number(All))+'.00'); //总价的变化
});




      // 提交订单把控

// 添加地址把控
$('.T2-checkout .checkout-top .checkout-caption').click(function(){
	$(this).parents('.checkout-content').next().show();
});
// 关闭按钮
$('.T2-checkout .address .title span').click(function(){
	$(this).parents('.address').hide();
});

// 给input框设样式
$('.T2-checkout .address input').not($('.address .checkbox input')).focus(function(){
	$(this).css({'box-shadow':'0px 0px 2px blue'});
});
$('.T2-checkout .address input').not($('.address .checkbox input')).blur(function(){
	$(this).css({'box-shadow':''});
});

// 点击确定的把控
$('.T2-checkout .address .keep .right').click(function(){
	
	a1=$(this).parents('.artical').find('input#name').val();
	a2=$(this).parents('.artical').find('input#tel').val();
	a3=$(this).parents('.artical').find('input#area').val();
	a4=$(this).parents('.artical').find('input#phone').val();
	a5=$(this).parents('.artical').find('input#street').val();
	b1=$(this).parents('.artical').find('select#s_province').val();
	b2=$(this).parents('.artical').find('select#s_city').val();
	b3=$(this).parents('.artical').find('select#s_county').val();
	$(this).parents('.address').hide();
	$('.checkout-top .checkout-caption .file0').addClass('file1');
	$('.checkout-top .checkout-caption .file0').prepend('<br/><br/><p>'+a1+'<br/>'+a2+'<br/>'+a3+' '+a4+'<br/>'+b1+' '+b2+' '+b3+' '+a5+'</p>');
});

// 取消按钮
$('.T2-checkout .address .keep .left').click(function(){
	$(this).parents('.address').hide();
});



   // 支付金钱的页面的把控

 // 上面按钮的把控
 $('.pay-road .pay-blank>span').click(function(){
 	$('.pay-road .pay-blank>span').removeClass('cli'); //控制大标题的样式
 	$(this).addClass('cli');
 	name=$(this).attr('name'); //获取非标准属性
 	$(this).parent().find('.pay-bottom').find('div.f').hide();    //控制大标题下面的系那是隐藏
 	$(this).parent().find('.pay-bottom').find('div[name='+name+']').show();
 });
// 平台支付的把控
$('.pay-caption .pay-road div[name=f1] img').not($('.pay-caption .pay-road div[name=f1] img.img')).click(function(){
	$('.pay-caption .pay-road div[name=f1] img').removeClass('cli');
	$(this).addClass('cli');
	$(this).nextAll('p,div').hide();   //控制微信那里的二维码
	$('.pay-now .togg').show();  //控制价格按钮的显示隐藏
});
//点微信支付的特殊样式
$('.pay-caption .pay-road div[name=f1] img.img').click(function(){
	$(this).nextAll('p,div').show();  //控制微信那里的二维码
	$('.pay-caption .pay-road div[name=f1] img').removeClass('cli');
	$(this).addClass('cli');
	$('.pay-now .togg').hide();  //控制价格按钮的显示隐藏
});

   // 借记卡及信用卡的把控
$('.pay-caption .pay-road div[name=f2] img').click(function(){
	$('.pay-caption .pay-road div[name=f2] img').removeClass('cli');
	$(this).addClass('cli');
});

   // 分期付款的把控
$('.pay-caption .pay-road div[name=f3] .left p').click(function(){
	$('.pay-caption .pay-road div[name=f3] .left p').removeClass('cli');
	$(this).addClass('cli');
});







// apps.html里的轮播
s1=setInterval(start,3000);
function start(){
	$('.banner li').eq(5).fadeOut(2000,function(){
		$(this).prependTo('.banner').show();
	});
	ind=$('.banner li').eq(4).attr('title');
	// alert(ind)
	$('.light-banner li').removeClass('active');
	$('.light-banner li[title='+ind+']').addClass('active');
}
$('.light-banner li').mouseover(function(){
	clearInterval(s1);
	$('.light-banner li').removeClass('active');
	$(this).addClass('active');
});
$('.light-banner li').mouseout(function(){
	s1=setInterval(start,3000);
});

// bbs里的首页控制下拉菜单

$('.naver-head ul li').eq(1).find('a').mouseover(function(){
	// alert(123)
	$(this).parents('.naver-head').next().toggle();
});
$('.naver-head ul li').eq(1).find('a').mouseleave(function(){
	// alert(123)
	$(this).parents('.naver-head').next().toggle();
});
   
          //bbs轮播
imgnum = $('.carousel>div').length-1;
n = imgnum;
// 初始化
$('.carousel>div').eq(n).show().siblings('div').hide();
$('.carousel-light li').eq(imgnum-n).addClass('active').siblings('li').removeClass('active');
s2=setInterval(carou,3000);

function carou(){
	n--;
	n = n<0?imgnum:n;
    $('.carousel>div').eq(n).show().siblings('div').hide();
	$('.carousel-light li').eq(imgnum-n).addClass('active').siblings('li').removeClass('active');
	// $('.carousel>div').last().fadeOut(1000,function(){
	// 	$(this).prependTo('.carousel').show();
	// })
	// num=$('.carousel>div').last().prev().attr('num');
	
	// $('.carousel-light li').removeClass('active');
	// $('.carousel-light li[num='+num+']').addClass('active');
};

$('.carousel-light li').mouseenter(function(){
	clearInterval(s2);
	$('.carousel-light li').removeClass('active');
	$(this).addClass('active');
	nam=$(this).attr('num');
	$('.carousel>div').stop().css({'display':'none'});
	$('.carousel>div[num='+nam+']').stop().css({'display':'block'});
	
});

$('.carousel-light li').mouseleave(function(){
	// clearInterval(s2);
	s2=setInterval(carou,3000);
});


	//bbs点击收起，下拉
$('.contents .left h4 span').click(function(){
	$(this).parent().nextAll('div').toggle();
});

       // bbs右侧下拉菜单
$('.right .right5 .top1').click(function(){
	$(this).next('ul').toggle();
	$(this).toggleClass('add');
	$(this).find('a').toggleClass('add1');

});
$('.right .right5 li').click(function(){
	name=$(this).find('span').text()
	$(this).parents('.top').find('div').find('a').html('手机品牌：'+name);
	$(this).parent().toggle();
});


         // bbs注册把控
     // 手机号码的把控
$('.sign-out .fixed .form .tel input').blur(function(){
	tel=$(this).val();
	if(tel.match(/^182\d{8}$/g)){
		$(this).parents('.form').find('.modal1').hide();
	}else{
		$(this).parents('.form').find('.modal1').show();
	}
});
    // 验证码把控
$('.sign-out .fixed .form .check-num input').blur(function(){
	checknum=$(this).val();
	if(checknum.match(/^\w{4}$/g)){
		$(this).parents('.form').find('.modal2').hide();
	}else{
		$(this).parents('.form').find('.modal2').show();
	}
});
    // 短信验证
$('.sign-out .fixed .form .message input').blur(function(){
	message=$(this).val();
	if(message.match(/^\d{6}$/g)){
		$(this).parents('.form').find('.modal3').hide();
	}else{
		$(this).parents('.form').find('.modal3').show();
	}
});
    // 邮箱验证
$('.sign-out .fixed .form .email input').blur(function(){
	email=$(this).val();
	if(email.match(/^\w+@\w+\.(com|cn)$/g)){
		$(this).parents('.form').find('.modal4').hide();
	}else{
		$(this).parents('.form').find('.modal4').show();
	}
});
     // 验证密码
$('.sign-out .fixed .form .password input').blur(function(){
	password=$(this).val().length;
	if(password>=6){
		$(this).parents('.form').find('.modal5').hide();
	}else{
		$(this).parents('.form').find('.modal5').show();
	}
});
      // 验证重复密码
 $('.sign-out .fixed .form .check-password input').blur(function(){
	password=$(this).parent().prev().find('input').val();
	checkpassword=$(this).val();
	if(checkpassword==password){
		$(this).parents('.form').find('.modal6').hide();
	}else{
		$(this).parents('.form').find('.modal6').show();
	}
});
     // 协议把控
 $('.sign-out .fixed .form .btn input').click(function(){
	
	// btn=$(this).parent().next().find('input:checked');
	// $('.form .check input').attr('checked');
	check=document.getElementById('check').checked;
	// input=document.getElementByTagName('.sign-out input').length;
	if(check){
		$(this).parent().nextAll('.modal7').hide();
		// $(this).parents('.sign-out').hide();
	}else{
		$(this).parent().nextAll('.modal7').show();
	}
	// for(i=0;i<input;i++){
	// 	document.getElementByTagName('.sign-out input')[i].value;
	// 	if(){

	// 	}
	// }
});


  // 关闭按钮，登录按钮的把控
$('.naver-head .sign .signOut').click(function(){
	$('.container>.sign-out').show();
});
$('.sign-out .fixed>h4 a').click(function(){
	$(this).parents('.sign-out').hide();
});
$('.sign-out .fixed .form p.tog input').click(function(){
	$(this).parents('.sign-out').hide();
	$(this).parents('.sign-out').prev().show();
});

$('.naver-head .sign .signIn').click(function(){
	$('.container>.sign-in').show();
});
$('.sign-in .fixed>h4 a').click(function(){
	$(this).parents('.sign-in').hide();
});
$('.sign-in .fixed .form a.signOut').click(function(){
	$(this).parents('.sign-in').hide();
	$(this).parents('.sign-in').next().show();
});






