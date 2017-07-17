import React from 'react';


class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bodyStatus: 'hidden'
    };
  }
  toggleStarred = ()=>{
    this.props.toggleStarred(this.props.id);
  }
  toggleSelected = () =>{
    this.props.selectBubbler(this.props.id);
  }
  toggleBody = () =>{
    if (this.state.bodyStatus ==='hidden'){
      this.setState({bodyStatus: 'show'});
      if(!this.props.read){
        this.props.readBubbler(this.props.id);
      }
    }else{
      this.setState({bodyStatus: 'hidden'});
    }
  }

  render(){
    return (
      <div className="container-fluid">
      <div className={`row message ${this.props.read?'read':'unread'} ${this.props.selected?'selected':null}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onChange={this.toggleSelected} defaultChecked={this.props.selected}/>
            </div>
            <div className="col-xs-2">
              <i className={this.props.starred?'star fa fa-star':'star fa fa-star-o'} onClick={this.toggleStarred}></i>
            </div>
          </div>
        </div>

        <div className="col-xs-11">
          {this.props.tags.map((tag,index)=>{return <span key={index} className="label label-warning">{tag}</span>})}
          <a onClick={this.toggleBody}>
            {this.props.subject}
          </a>
        </div>
      </div>
      <div className={`row message-body ${this.state.bodyStatus}`}>
        <div className="col-xs-11 col-xs-offset-1">
          {this.props.body}
        </div>
      </div>
      </div>
    )
  }

}
export default Message;
