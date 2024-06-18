/**
 * Created by w on 2015/5/3.
 */
$(function(){
    var $container = $('#masonry');
    $container.imagesLoaded( function(){
        $container.masonry({
            itemSelector : '.item-pb',
            columnWidth240 :240,
            isAnimated : true
        });
    });
});