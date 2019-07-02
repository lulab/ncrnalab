jQuery(document).ready(function($) {
    

    /* ======= jQuery Placeholder ======= */
    $('input, textarea').placeholder();    
    
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 300});
   
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
    
        //store hash
        var target = this.hash;
                
        e.preventDefault();

		
		var nOffsetVal = 0;
		if( $('html').width() < 768 ){
    		nOffsetVal = -216;
		}else if( $('html').width() > 991 ){
    		nOffsetVal = -69;
		}
		
		$('body').scrollTo(target, 900, {offset: nOffsetVal, 'axis':'y', easing:'easeOutQuad'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}

		
	});
	
	
	$('a.btn-scrollto').on('click', function(e){
    
        //store hash
        var target = this.hash;
                
        e.preventDefault();

		
		var nOffsetVal = 0;
		if( $('html').width() > 991 ){
    		nOffsetVal = -69;
		}
		
		$('body').scrollTo(target, 900, {offset: nOffsetVal, 'axis':'y', easing:'easeOutQuad'});

		
	});
	
	
	
    
    /* ======= Fixed header when scrolled ======= */
    

	    
	    
            $(window).on('scroll', function(){
                
                if ( $(window).width() > 991 ){
            
                    if($(document).scrollTop() > 0)
                        {
                            if(!$('#header').hasClass('navbar-fixed-top'))
                            {
                                $('#header').addClass('navbar-fixed-top');
                                $('#header').stop().animate({
                                    paddingTop:'15px'
                                    
                                },600);
                            }
                        }
                        else
                        {
                            if($('#header').hasClass('navbar-fixed-top'))
                            {
                                $('#header').removeClass('navbar-fixed-top');
                                $('#header').stop().animate({
                                    paddingTop:'30px'
                                    
                                },600);
                            }
                        }
                    
                  }
            });	              
	        

    
    /* ======= Page preloader ======= */
    
    $(window).load(function(){
        $('#page-preloader').fadeOut(800); 
    });
    
    
   
    
    
    


});