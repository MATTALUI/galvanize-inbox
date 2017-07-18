import React from 'react';
// import Message from './Message.js';
import MessageList from './MessageList.js';
import Toolbar from './Toolbar.js';
import Compose  from './Compose.js';
/*const posts = [
  {
    id: 1,
    subject: 'Hello World',
    body: 'What a beautiful day it is!',
    tags: ['New'],
    read: false,
    starred: true,
    selected: false
  },
  {
    id: 2,
    subject: 'Goodbye, Cruel World...',
    body: 'Why did you have to go and kill me?',
    tags: ['Old', 'Dead Guy'],
    read: false,
    starred: false,
    selected: false
  },
  {
    id: 3,
    subject: 'We need to clean up.',
    body: 'This guy that we stabbed has been here for weeks, will someone come and get him?',
    tags: [],
    read: true,
    starred: true,
    selected: false
  },
  {
    id: 4,
    subject: 'Filler',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem Lorem Lorem Lorem ',
    tags: ['Lots', 'Of', 'Tags'],
    read: false,
    starred: false,
    selected: false
  }
];
<MessageList posts={posts}/>
*/

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      makingNew: false,
      selected: []
    }
  }
  async componentDidMount (){
    const response = await fetch('http://localhost:8181/api/messages');
    const json = await response.json();
    const messages = json._embedded.messages;
    messages.forEach((post)=>{post.selected=false})
    this.setState({posts: messages});
  }
  addPost = async (newPost)=>{
    const response = await fetch('http://localhost:8181/api/messages',{
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }});
    const json = await response.json();
    delete json._links;
    json.selected = false;
    let copy = this.state.posts.slice();
    copy.push(json);
    this.setState({posts: copy, makingNew:false})
  }
  makeNew = () =>{
    if(this.state.makingNew){
      this.setState({makingNew: false});
    }else{
      this.setState({makingNew: true});
    }
  }
  readBubbler= async (id)=>{
    let copy = this.state.posts.slice();
    let correspondingPost = copy.find(post=>post.id===id);
    let index = copy.indexOf(correspondingPost);
    copy[index].read = true;
    this.setState({posts: copy});
    let data = {
      messageIds: [id],
      command: 'read',
      read: true
    }
    fetch('http://localhost:8181/api/messages',{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
  selectBubbler = (id)=>{
    let copy = this.state.posts.slice();
    let post = copy.find((post)=>{return post.id===id});
    post.selected?post.selected=false:post.selected=true;
    this.setState({posts: copy})
  }
  deleteSelected = async () =>{
    let copy = this.state.posts.slice();
    let keptPosts = [];
    let selected = [];
    copy.forEach((post)=>{post.selected?selected.push(post.id):keptPosts.push(post)});
    let data = {
      messageIds: selected,
      command: 'delete'
    }
    fetch('http://localhost:8181/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.setState({posts: keptPosts})
  }
  readSelected = async ()=>{
    let postsCopy = this.state.posts.slice();
    let selected = [];
    postsCopy.forEach((post)=>{
      if(post.selected){
        post.read = true;
        selected.push(post.id)
      }
    })
    this.setState({posts: postsCopy});
    let data = {
      messageIds: selected,
      command: 'read',
      read: true
    }
    fetch('http://localhost:8181/api/messages',{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
  unreadSelected = async ()=>{
    let postsCopy = this.state.posts.slice();
    let selected = [];
    postsCopy.forEach((post)=>{
      if(post.selected){
        post.read = false;
        selected.push(post.id)
      }
    })
    this.setState({posts: postsCopy});
    let data = {
      messageIds: selected,
      command: 'read',
      read: false
    }
    fetch('http://localhost:8181/api/messages',{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
  addTag = (tag)=>{
    let copy = this.state.posts.slice();
    copy.forEach((post)=>{
      if (post.selected && post.labels.indexOf(tag)===-1){
        post.labels.push(tag)
      }
    });
    this.setState({post: copy});
  }
  removeTag = (tag)=>{
    let copy = this.state.posts.slice();
    copy.forEach((post)=>{
      if(post.selected && post.labels.indexOf(tag)>-1){
        let index = post.labels.indexOf(tag);
        post.labels.splice(index, 1);
      }
    });
    this.setState({posts: copy})
  }
  toggleStarred=(id)=>{
    let copy = this.state.posts.slice();
    let post = copy.find((post)=>{return post.id === id});
    post.starred?post.starred = false:post.starred = true;
    this.setState({posts: copy})
  }
  bulkSelect = () =>{
    let copy = this.state.posts.slice();
    let selected = copy.filter((post)=>{return post.selected});
    if (selected.length < copy.length){
      copy.forEach((post)=>{post.selected=true});
    }else{
      copy.forEach((post)=>{post.selected=false});
    }
    this.setState({posts: copy})
  }


  render(){
    return (
      <div>
        <Toolbar makeNew={this.makeNew} posts={this.state.posts} deleteSelected={this.deleteSelected} readSelected={this.readSelected} unreadSelected={this.unreadSelected} addTag={this.addTag} removeTag={this.removeTag} bulkSelect={this.bulkSelect}/>
        <Compose handler={this.addPost} visible={this.state.makingNew?null:'hidden'}/>
        <MessageList posts={this.state.posts} readBubbler={this.readBubbler} selectBubbler={this.selectBubbler} toggleStarred={this.toggleStarred}/>
      </div>
    )
  }

}
export default App;
