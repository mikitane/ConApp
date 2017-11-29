
$(function() {

 /* Set the width of the side navigation to 300px */
$('#sidebar-button').on('click', function(){
    document.getElementById("mySidenav").style.width = "300px";

});

/* Set the width of the side navigation to 0 */
$('#close-sidebar-button').on('click', function(){
    document.getElementById("mySidenav").style.width = "0";
});



// Loads user´s conversations from API to the sidenavbar
<<<<<<< HEAD
/*function loadConversations(){
=======
function loadConversations(){
>>>>>>> 2ef540df59dbc316dae086cddd9c08dc0519fb11

$.ajax({
		type: 'GET',
		url: '/messages/api',
		success: function(conversations){
			$('#chat-list').empty();
			$('#group-chat-list').empty();

			var chatListHeader = $('<h2 class="special-font">Chats:</h2>'+
									'</div>')
			var groupChatListHeader = $('<div><h2 class="special-font" style="display:inline">Group chats:</h2>'+
										'<button class="btn start-group-con" type="button" id="start-group-con" data-toggle="modal" data-target="#like-modal">'+
										'<span class="glyphicon glyphicon-plus" style="color:#42f450"></span></button></div>')

			$('#chat-list').append(chatListHeader.clone());
			$('#group-chat-list').append(groupChatListHeader.clone());
			$.each(conversations, function(i,singleConversation){
				var current_user = $('.body').data('id')

				var user_count = singleConversation.participants.length


				if (user_count < 3) {

				var current_user = $('.body').data('id')
				var all_users = singleConversation.participants
				var con_name = ''
				var con_image_url = ''
				$.each(all_users, function(i,user){
					if (user.user != current_user){
						con_name = user.user
						con_image_url = user.image

					}
				});

				var conversationBtn = $('<button class="list-group-item con-button" data-toggle="modal" data-target="#conversation-modal">'+
												'<img class="conversation-image"src='+con_image_url+'>'+con_name+'</button>')


				$('#chat-list').append(conversationBtn.clone().data('conId',singleConversation.id));
				} else {
					con_name = singleConversation.name
					var conversationBtn = $('<button class="list-group-item con-button" data-toggle="modal" data-target="#conversation-modal">'+
												con_name+'</button>')


					$('#group-chat-list').append( conversationBtn.clone().data('conId',singleConversation.id));
				}




			});
		}
	});
  };

loadConversations();


// Scrolls conversation modal down once it is opened.

	$('#conversation-modal').on('mouseenter', function(){


		$("#conbody").scrollTop($('#conbody')[0].scrollHeight)
	});

//Loads messages from API of a single conversation to the conversation modal.
function loadMessages(current_user,conversation_id,con_name){

				$.ajax({
				type: 'GET',
				url: '/messages/'+conversation_id+'/api',
				success: function(singleConversation){

				$('#conversation-message-input').data('conId',conversation_id)

				$('#conversationlist').empty();

				$('#newmessage').val('');
				if (typeof con_name !== 'undefined'){
					$('#conversation-title').empty();
					$('#conversation-title').append('<h4 class="modal-title">'+con_name+'</h4>')
				}
				var userMessageColors = {};
				var color = 1
				var latestMessageDate = ""
				$.each(singleConversation, function(i,message){
					var messageSent = message.created.split('-')
					var messageSentDate = messageSent[0]
					var messageSentTime = messageSent[1]

					if (messageSentDate != latestMessageDate ) {
						latestMessageDate = messageSentDate
						$('#conversationlist').append('<center>'+messageSentDate+'</center>');
					}
					if (!(message.sender in userMessageColors) && message.sender_username != current_user) {
						userMessageColors[message.sender] = color
						color += 1
						if (color == 4){
							color = 1
						}
					}


					if (current_user == message.sender_username) {
						var messagesingle = '<div class="row" style="margin-top:5px;"><div class="col-sm-8 col-sm-offset-4 " style="overflow:auto" ><div class="bubble right"><p>'+
											message.text+' </p><div style="float:right"><i>'+messageSentTime+'</i></div></div></div></div>'



					} else {
						var messagesingle = '<div class="row" style="margin-top:5px;"><div class="col-sm-8" style="overflow:auto"><div class=" bubble left color'+userMessageColors[message.sender]+'" >'+
											'<p><b>'+message.sender_username+'</b></p><p>'+message.text+'</p><div style="float:right"><i>'+messageSentTime+'</i></div></div></div></div>'

					}



					$('#conversationlist').append(messagesingle);


		});
		$("#conbody").scrollTop($('#conbody')[0].scrollHeight)

		}


				});


};

 // Opens conversation based on which button is clicked.

	$('.sidenav').on('click','.con-button', function(){
		var conversation_id = $(this).data('conId')
		var con_name = $(this).text()
		var current_user = $('.body').data('id')
		loadMessages(current_user,conversation_id,con_name)


	  });


  // Handles posting a new message to the API and refreshing the conversation.

	$('#send-message-button').on('click', function(){
		var newmessage = $('#newmessage').val()

		var conversation_id = $('#conversation-message-input').data('conId')
		var info = {'text':newmessage}

		var current_user = $('.body').data('id')
		$.ajax({

		type: 'POST',
		url: '/messages/'+conversation_id+'/api/',
		data: info,
		success: function(){
			loadMessages(current_user,conversation_id)

		}

		});

		$("#conbody").scrollTop($('#conbody')[0].scrollHeight)


	});


	// Handles starting a new private conversation or loads the old conversation.

	$('#startconversationbtn').on('click',function(){
		var conversationUserId = parseInt($(this).data('conuserid'))

		var info = {participants:[conversationUserId]}

		var con_name = $(this).data('conuser')

		var current_user = $('.body').data('id')
		$.ajax({
			type:'POST',

			url:'/messages/api/',

			data: JSON.stringify(info),
			contentType: "application/json",
			success: function(singleConversation){
				var conversation_id = singleConversation.id
				loadMessages(current_user,conversation_id,con_name)
				loadConversations()
			}


		});






	});

  // Adds all users to the start-conversation-list. Current user will select users to the conversation from this list.
	$('#group-chat-list').on('click','#start-group-con',function(){
		var current_user = $('.body').data('id')

		$('#modal-title').empty();
		$('#modal-body').empty();
		$('#modal-footer').empty();

		$('#modal-title').html('<h4>Create a new group chat!</h4>');
		var conName = $('<div class="row">'+
							'<div class="col-sm-8">'+
								'<input type="text" id="conName"  class="form-control" placeholder="Chat name...">'+

								'</div>'+
								'<div class="col-sm-4">'+

								'<button type="button"  id="createCon" class="btn btn-primary" >Create!</button>'+
							'</div>'+
						'</div>')
		$('#modal-footer').append(conName.clone())

		$.ajax({
			type: 'GET',
			url: '/messages/users/api/',
			success: function(users){

			$.each(users,function(i,user){
				console.log(user.id)
				if (current_user != user.username) {
				var choice =$('<button class="btn select-user" value="'+user.id+'"><img class="conversation-image" src="'+user.image+'">'+
							user.username+'</button>')

			$('#modal-body').append(choice.clone().attr('check',0));
				}
			});



			}

			});




	});
	// Changes the state of a user selected button in start-conversation modal.
	$('#modal-body').on('click','.select-user',function() {

		var selected = $(this).attr('check')

		if (selected == 0) {
			$(this).attr('check',1)
			$(this).css({'background-color':'#92ff8e','border':'2px solid #278423'})
		}
		if (selected == 1) {
			$(this).attr('check',0)
			$(this).css({'background-color':'#e8f0ff','border':'2px solid #006daf'})
		}

	});

	// Creates a new group chat and opens the created chat.
	$('#modal-footer').on('click','#createCon',function() {
		var selectedUsers = $('.select-user[check=1]')
		var current_user = $('.body').data('id')
		console.log(selectedUsers)
		var con_name = $('#conName').val()
		console.log(con_name)

		var info = {participants:[],name:con_name}
		$.each(selectedUsers,function(i,selectedUser){
			var user = $(selectedUser)
			info['participants'].push(user.val())
		});
		if (info['participants'].length > 1 && con_name != ''){

		$.ajax({
			type:'POST',

			url:'/messages/api/',

			data: JSON.stringify(info),
			contentType: "application/json",
			success: function(singleConversation){
				var conversation_id = singleConversation.id
				loadMessages(current_user,conversation_id,con_name)
				loadConversations()
				$('#like-modal').modal('toggle');
				$('#conversation-modal').modal('toggle');
			}


		});
		} else {alert('Group chat has to have a name and at least 3 participants.')}
	});

*/
  });
