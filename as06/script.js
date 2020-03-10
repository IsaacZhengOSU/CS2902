// function ajax(options){
//     document.getElementById('urlSubmit').addEventListener('click', function(event){
//         var req = new XMLHttpRequest();
//         var payload = {longUrl:null};
//         payload.longUrl = document.getElementById('longUrl').value;
//         req.open('POST', '/', true);
//         req.setRequestHeader('Content-Type', 'application/json');
//         req.addEventListener('load',function(){
//           if(req.status >= 200 && req.status < 400){
//             var response = JSON.parse(req.responseText);
//             document.getElementById('originalUrl').textContent = response.longUrl;
//             document.getElementById('shortUrl').textContent = response.id;
//           } else {
//             console.log("Error in network request: " + req.statusText);
//           }});
//         req.send(JSON.stringify(payload));
//         event.preventDefault();
// })