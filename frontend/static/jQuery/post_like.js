$(function() {
	function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var csrftoken = getCookie('csrftoken');	
	
	$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
	
	
	
	
// Loads likes from API and creates like button for each post.	
	
	$.ajax({
		type: 'GET',
		url: '/post/likes/api/',
		success: function(data){
			$.each(data, function(i,post){
				var id = post.id
				var likes = post.like_set.length
				
				$('.like-count[data-id='+id+']').html(likes)
				if (post.user_in_likes) {
					$('.like-button[data-id='+id+']').addClass("btn-primary")
					$('.like-button[data-id='+id+'] p').append('Liked')
				} else {
					$('.like-button[data-id='+id+']').addClass("btn-default")
					$('.like-button[data-id='+id+'] p').append('Like')
				}
			});
		}
	});
	
	// Updates user´s likes to the API.
	
	$('.like-button').on('click', function(){
		var info = {
			id: $(this).attr('data-id'),
			
		};
		
		
		
		$.ajax({
		type: 'PUT',
		url: '/post/likes/api/',
		data: info,
		success: function(post){
			console.log('TEST')
			
				var id = post.id
				var likes = post.like_set.length
				$('.like-count[data-id='+id+']').html(likes)
				if (post.user_in_likes) {
					$('.like-button[data-id='+id+']').removeClass("btn-default").addClass("btn-primary")
					$('.like-button[data-id='+id+'] p').text('Liked')
				} else {
					$('.like-button[data-id='+id+']').removeClass("btn-primary").addClass("btn-default")
					$('.like-button[data-id='+id+'] p').text('Like')
				}
			
		}
	});
		
		
		
	});
	
	// Adds likes to the like modal.
	
	$('.like-count').on('click', function(){
		
		var pk = $(this).attr('data-id');
		
		$.ajax({
		type: 'GET',
		url: '/post/'+pk+'/likes/api/',
		success: function(post){
				$('#modal-title').empty();
				$('#modal-title').html('<h4>Likes</h4>');
				$('#modal-footer').empty();
				$('#modal-body').empty();
				var likeList = $('<div class="list-group" id="like-list"></div>')
				
				var id = post.id;
				var likes = post.like_set.length;
				$.each(post.like_set, function(i,like){
					var userImageUrl = like.image
					var like = '<a class="list-group-item "href="/profiles/'+like.id+'"><img class="conversation-image"src='+userImageUrl+'>'+like.user+'</a>'
					likeList.append(like)
					
					
					
					
					
					
				
			});
			$('#modal-body').append(likeList.clone());	
				
			
		}
	});
		
		
		
	});
	
	




	
	
});