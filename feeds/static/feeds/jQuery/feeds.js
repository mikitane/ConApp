
$(function() {
  
  var box    = $('#scroll');
  if (typeof box[0] !== 'undefined'){
  var height = box[0].scrollHeight;
  box.scrollTop(height);
  
  }
 
  $('#write-post-btn').on('click', function(){
		
		
		$("#grad").scrollTop($('#grad')[0].scrollHeight)
	});
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  });



