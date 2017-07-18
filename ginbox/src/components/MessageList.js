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
        <Message key={post.id} id={post.id} subject={post.subject} body={post.body} labels={post.labels} read={post.read} readBubbler={this.readBubbler} selectBubbler={this.selectBubbler} starred={post.starred} toggleStarred={this.toggleStarred} selected={post.selected}/>
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
