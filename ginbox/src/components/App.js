import React from 'react';
// import Message from './Message.js';
import MessageList from './MessageList.js';
import Toolbar from './Toolbar.js';
import Compose  from './Compose.js';
const posts = [
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
    let copy = this.state.posts.slice();
    let greatest = copy.map(post=>post.id).reduce((a,b)=>a>b?a:b);
    newPost.id = greatest+1;
    newPost.tags = [];
    newPost.read = false;
    newPost.selected = false;
    copy.push(newPost);
    this.setState({posts: copy, makingNew:false});
  }
  makeNew = () =>{
    if(this.state.makingNew){
      this.setState({makingNew: false});
    }else{
      this.setState({makingNew: true});
    }
  }
  readBubbler=(id)=>{
    let copy = this.state.posts.slice();
    let correspondingPost = copy.find(post=>post.id===id);
    let index = copy.indexOf(correspondingPost);
    copy[index].read = true;
    this.setState({posts: copy});
  }
  selectBubbler = (id)=>{
    let copy = this.state.posts.slice();
    let post = copy.find((post)=>{return post.id===id});
    post.selected?post.selected=false:post.selected=true;
    this.setState({posts: copy})
  }
  deleteSelected = () =>{
    let copy = this.state.posts.slice();
    let keptPosts = copy.filter((post)=>{
      return this.state.selected.indexOf(post.id) === -1
    });
    this.setState({posts: keptPosts, selected: []})
  }
  readSelected = ()=>{
    let postsCopy = this.state.posts.slice();
    postsCopy.forEach((post)=>{
      if(this.state.selected.indexOf(post.id)>-1){
        post.read = true;
      }
    })
    this.setState({posts: postsCopy});
  }
  unreadSelected = ()=>{
    let postsCopy = this.state.posts.slice();
    postsCopy.forEach((post)=>{
      if(this.state.selected.indexOf(post.id)>-1){
        post.read = false;
      }
    })
    this.setState({posts: postsCopy});
  }
  addTag = (tag)=>{
    let copy = this.state.posts.slice();
    copy.forEach((post)=>{
      if (this.state.selected.indexOf(post.id)>-1 && post.tags.indexOf(tag)===-1){
        post.tags.push(tag)
      }
    });
    this.setState({post: copy});
  }
  removeTag = (tag)=>{
    let copy = this.state.posts.slice();
    copy.forEach((post)=>{
      if(this.state.selected.indexOf(post.id)>-1 && post.tags.indexOf(tag)>-1){
        let index = post.tags.indexOf(tag);
        post.tags.splice(index, 1);
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
    let selected = copy.filter((post)=>{})
  }


  render(){
    return (
      <div>
        <Toolbar selected={this.state.selected} makeNew={this.makeNew} posts={this.state.posts} deleteSelected={this.deleteSelected} readSelected={this.readSelected} unreadSelected={this.unreadSelected} addTag={this.addTag} removeTag={this.removeTag} bulkSelect={this.bulkSelect}/>
        <Compose handler={this.addPost} visible={this.state.makingNew?null:'hidden'}/>
        <MessageList posts={this.state.posts} readBubbler={this.readBubbler} selectBubbler={this.selectBubbler} toggleStarred={this.toggleStarred}/>
      </div>
    )
  }

}
export default App;
