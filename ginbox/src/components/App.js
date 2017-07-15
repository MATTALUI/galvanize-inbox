import React from 'react';
import Message from './Message.js';
// import MessageList from './MessageList.js';
// import Toolbar from './Toolbar.js';
// import Compose  from './Compose.js';


class App extends React.Component{

  render(){
    return (
      <div>
        <Message subject="Hello World." body="This place looks so great!" tags={['New']}/>
        <Message subject="What is this place?" body="I'm feeling a little scared; all of the locals are... questionable." tags={['Mystery', 'Intrigue']}/>
        <Message subject="Why Did You Just Stab Me?" body="Oh, woe is me! I've been stabbed" tags={['Horror']}/>
        <Message subject="Goodbye, Cruel World." body="It was fun while it lasted..." tags={[]}/>
      </div>
    )
  }

}
export default App;
