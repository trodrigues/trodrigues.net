self.addEventListener("message", function(ev) {
  console.log('post message data', ev.data)
  
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(){
    console.log(this.responseText);
  });
  oReq.open("POST", "/");
  oReq.send();
});