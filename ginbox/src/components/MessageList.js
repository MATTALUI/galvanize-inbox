import React from 'react';
import Message from './Message.js';


class MessageList extends React.Component{

  render(){
    const listOfPosts = this.props.posts.map((post)=>{
      return (
        <Message key={post.id} subject={post.subject} body={post.body} tags={post.tags}/>
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
