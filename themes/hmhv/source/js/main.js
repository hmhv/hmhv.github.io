$(document).ready(function() {

    $(window).scroll(function() {  //As long as the window to scroll to trigger the code below
        var scrollt = document.documentElement.scrollTop + document.body.scrollTop; //Get height after rolling
        if( scrollt >200 ){  //Height exceeds the judgment scroll 200px, on display
        $("#gotop").fadeIn(333); //Fade
        $(".navbar").stop().fadeTo(333, 0.9);
    }else{
        $("#gotop").fadeOut(333); //If the return or does not exceed, on a fade. Must add stop () stops before the movie, there would be flashing
        $(".navbar").stop().fadeTo(333, 1);
    }
    });
    
    $("#gotop").click(function(){ //When you click on the label when using animate within 200 milliseconds, rolled top
        $("html,body").animate({scrollTop:"0px"},200);
    });
    
    $(".navbar").mouseenter(function(){
		$(".navbar").fadeTo(100, 1);
	});
    $(".navbar").mouseleave(function(){
		var scrollt = document.documentElement.scrollTop + document.body.scrollTop;
		if ( scrollt > 200) {
			$(".navbar").fadeTo(100, 0.9);
		}
	});

      // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url').replace(/index.html$/, ''),
      encodedUrl = encodeURIComponent(url);
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });
});
