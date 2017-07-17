import React from 'react';


class Toolbar extends React.Component{
  addTag = (event)=>{
    this.props.addTag(event.target.value)
  }
  removeTag = (event)=>{
    this.props.removeTag(event.target.value)
  }

  render(){
    let unread = this.props.posts.filter((post)=>{return !post.read}).length;
    return (
      <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{unread}</span>
      unread messages
    </p>

    <a className="btn btn-danger" onClick={this.props.makeNew}>
      <i className="fa fa-plus"></i>
    </a>

    <button className="btn btn-default">
      <i className={this.props.selected.length===0?"fa fa-square-o":this.props.selected.length===this.props.posts.length?"fa fa-check-square-o":"fa fa-minus-square-o"}></i>
    </button>

    <button className="btn btn-default" disabled={this.props.selected.length===0?'disabled':null} onClick={this.props.readSelected}>Mark As Read</button>

    <button className="btn btn-default" disabled={this.props.selected.length===0?'disabled':null} onClick={this.props.unreadSelected}>Mark As Unread</button>

    <select className="form-control label-select" disabled={this.props.selected.length===0?'disabled':null} onChange={this.addTag}>
      <option>Apply label</option>
      <option value="Dev">Dev</option>
      <option value="Personal">Personal</option>
      <option value="Gschool">Gschool</option>
      <option value="New">New</option>
    </select>

    <select className="form-control label-select" disabled={this.props.selected.length===0?'disabled':null} onChange={this.removeTag}>
      <option>Remove label</option>
      <option value="Dev">Dev</option>
      <option value="Personal">Personal</option>
      <option value="Gschool">Gschool</option>
      <option value="New">New</option>
    </select>

    <button className="btn btn-default" onClick={this.props.deleteSelected} disabled={this.props.selected.length===0?'disabled':null}>
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
    )
  }

}
export default Toolbar;
