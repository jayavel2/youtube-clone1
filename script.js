const Client_id = '267085355717-egmkf1o2q9oocudbbtj3sr8gaqero5q4.apps.googleusercontent.com';
const Discover_docs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const Scopes = 'https://www.googleapis.com/auth/youtube';
const client_secret = "-AOI3XbZgxWQkJLM14AAnsGM";
const API_KEY="AIzaSyDrjcA6BtE5-wEoOp0jTXGG0Gnkgj7tLlw";

const authorizeButton = document.getElementById('signin-button');

const signoutButton = document.getElementById('signout-button');

const channelform = document.getElementById('channel-form');
const channeldata = document.getElementById('channel-data');
const videos = document.getElementById('video-container');

const auth=document.getElementsByClassName("auth-button");

const defaultChannel = 'techguyweb';

//Load Auth2 library

function handleClientLoad(){
    gapi.load('client:auth2', initClient)
}

// Init API Client library and set up sign in listeners

function initClient(){
    
    gapi.client.init({
        discoveryDocs: Discover_docs.concat,
        apiKey: API_KEY,
        clientId: Client_id,
        scope: Scopes
    }).then(() => {
        // Listen for sign in state changes
        console.log("initclient-------------------")
        gapi.client.setApiKey(API_KEY);
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
        // Handle intial sign in state
        
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())

        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    })
}

// Update UI sign in state changes

function updateSigninStatus(isSignedIn){
    console.log("isSignedIn",isSignedIn);
    if(isSignedIn) {

        // getChannel(defaultChannel)
        
    } else {
        videos.style.display = 'none';
        channeldata.style.display='none';
    }
}

// Handle login 

function handleAuthClick(){
    console.log("------------------authclick-----")
    gapi.auth2.getAuthInstance().signIn();
}

// Handle logout 
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut()
}

// Get channel from  API 
// function getChannel(channel){
//     console.log("----------------------------")
//     console.log(channel);
// }



function retriveInfo() {
    gapi.client.load('youtube', 'v3', function() {
    var q = 'techguyweb';
                var request = gapi.client.youtube.channels.list({
                        part: 'statistics',
                        forUsername : q
                });
                request.execute(function(response) {
                    console.log(response)
                        var str = JSON.stringify(response.result);
                      //  console.log(str);
                });
            });
        
}