import React from 'react';


class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      star: 'star fa fa-star-o',
      tags: this.props.tags,
      readStatus: 'unread',
      selectedStatus: 'unselected',
      bodyStatus: 'hidden'
    };
  }
  toggleStarred = ()=>{
    if (this.state.star === 'star fa fa-star'){
      this.setState({star: 'star fa fa-star-o'});

    }else{
      this.setState({star: 'star fa fa-star'});
    }
  }
  toggleSelected = () =>{
    if (this.state.selectedStatus === 'selected'){
      this.setState({selectedStatus: 'unselected'});

    }else{
      this.setState({selectedStatus: 'selected'});
    }
  }
  toggleBody = () =>{
    if (this.state.bodyStatus ==='hidden'){
      this.setState({bodyStatus: 'show', readStatus: 'read'});
    }else{
      this.setState({bodyStatus: 'hidden'});
    }
  }

  render(){
    return (
      <div className={`row message ${this.state.readStatus} ${this.state.selectedStatus}`}>

        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={this.toggleSelected}/>
            </div>
            <div className="col-xs-2">
              <i className={this.state.star} onClick={this.toggleStarred}></i>
            </div>
          </div>
        </div>

        <div className="col-xs-11">
          {this.state.tags.map((tag,index)=>{return <span key={index} className="label label-warning">{tag}</span>})}
          <a onClick={this.toggleBody}>
            {this.props.subject}
          </a>
        </div>
        <div className={`row ${this.state.bodyStatus}`}>
          <div className="col-xs-11 col-xs-offset-1 message-body">
            {this.props.body}
          </div>
        </div>
      </div>
    )
  }

}
export default Message;
