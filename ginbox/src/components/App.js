import React from 'react';
// import Message from './Message.js';
import MessageList from './MessageList.js';
// import Toolbar from './Toolbar.js';
import Compose  from './Compose.js';
const posts = [
  {
    id: 1,
    subject: 'Hello World',
    body: 'What a beautiful day it is!',
    tags: ['New']
  },
  {
    id: 2,
    subject: 'Goodbye, Cruel World...',
    body: 'Why did you have to go and kill me?',
    tags: ['Old', 'Dead Guy']
  },
  {
    id: 3,
    subject: 'We need to clean up.',
    body: 'This guy that we stabbed has been here for weeks, will someone come and get him?',
    tags: []
  },
  {
    id: 4,
    subject: 'Filler',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem Lorem Lorem Lorem ',
    tags: ['Lots', 'Of', 'Tags']
  }
];
// <MessageList posts={posts}/>


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts: posts,
      makingNew: false,
      selected: []
    }
  }
  addPost = (newPost)=>{
    newPost.id = this.state.posts.length+1;
    newPost.tags = [];
    let copy = this.state.posts.slice();
    copy.push(newPost);
    this.setState({posts: copy})
  }

  render(){
    return (
      <div>
        <Compose handler={this.addPost}/>
        <MessageList posts={this.state.posts}/>
      </div>
    )
  }

}
export default App;
