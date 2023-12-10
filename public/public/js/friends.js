function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}



function followme(id) {
    
    // const authToken = getCookie('XSRF-TOKEN');

    // // Check if the auth_token cookie is present
    // if (!authToken) {
    //     console.error('Auth token cookie not found');
    //     return;
    // }

    // // Send the AJAX request with the auth token
    $.ajax({
        type: 'POST',
        url: '/friend/followfriend/',
        dataType: 'json',
        data: {'id':id},
        headers: {
        },
        success: function (data) {
            console.log('Follow request sent successfully',data);
            // Request was successful
            if(data.message == "Followed successfully"){
                document.getElementById('reqbut'+id).textContent="Followed"
                document.getElementById('reqbut'+id).style.backgroundColor = "Grey"
            }else if(data.message == "Unfollowed successfully"){
                document.getElementById('reqbut'+id).textContent="Follow"
                document.getElementById('reqbut'+id).style.backgroundColor = "#673ab7"
            }
           
            // You can perform further actions here if needed
        },
        error: function (xhr, textStatus, errorThrown) {
            // Request failed
            console.error('Follow request failed');
        },
    })
    // console.log(id)
}
