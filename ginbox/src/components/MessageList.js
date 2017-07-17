import React from 'react';
import Message from './Message.js';


class MessageList extends React.Component{

  readBubbler = (id)=>{
    this.props.readBubbler(id);
  }
  selectBubbler = (id)=>{
    this.props.selectBubbler(id);
  }
  toggleStarred = (id)=>{
    this.props.toggleStarred(id);
  }
  render(){
    const listOfPosts = this.props.posts.map((post)=>{
      return (
        <Message key={post.id} id={post.id} subject={post.subject} body={post.body} tags={post.tags} read={post.read} readBubbler={this.readBubbler} selectBubbler={this.selectBubbler} starred={post.starred} toggleStarred={this.toggleStarred}/>
      )
    })
    return (
      <div>
        {listOfPosts}
      </div>
    )
  }

}
export default MessageList;
