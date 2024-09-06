import React from "react";
import '../css/liveChat.css'
function LiveChat() {
  return (
    <div className="MainChat">
<div className="RightData">
      <form className="search_container">
        <input type="text" id="search-bar" placeholder="Just Type and Get" />
        <img
          className="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          alt="Search"
        />
      </form>
      <div className="userData">
      <h1>ahmad</h1>
      <h2>ahmaddeveloper122@gmail.com</h2>
      </div>
    </div>
    <div className="leftDataChat">
      <div className="reciverMessage">
      reciverMessage
      </div>
      <div className="senderMessage">
      senderMessage
      </div>
     <div className="InputSendMessage">
      <input type="text" />
      <button>send</button>
     </div>
    </div>
    </div>
  );
}

export default LiveChat;
