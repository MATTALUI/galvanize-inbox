import React from 'react';
class Compose extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subject: '',
      body: ''
    };
  }
  changeSubject = (event) =>{
    this.setState({subject: event.target.value});
  }
  changeBody = (event) =>{
    this.setState({body: event.target.value});
  }
  submit = (event) =>{
    event.preventDefault();
    this.props.handler(this.state);
    this.setState({subject: '', body: ''})
  }
  render(){
    return (
      <form className="form-horizontal well">
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input type="text" value={this.state.subject} className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.changeSubject}/>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control" onChange={this.changeBody} value={this.state.body}></textarea>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary" onClick={this.submit}/>
    </div>
  </div>
</form>
    )
  }
}
export default Compose;
