import React from 'react';
import { Link } from 'react-router';

class MenuJumbotron extends React.Component {
  state = { editing: false, menu: this.props.menu };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: `/api/menus/${this.state.menu.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { menu: { name: this.refs.name.value } }
    }).done( menu => {
      this.setState( { editing: false, menu: menu } )
    }).fail( data => {
      console.log(data);
    });
  }

  display = () => {
     let menu = this.state.menu;
    if(this.state.editing) {
      return(
        <form onSubmit={ this.handleSubmit }>
          <h1>Editing: { menu.name }</h1>
          <input ref='name' type='text' defaultValue={this.state.menu.name} required />
          <br />
          <div className='btn-group' role='group'>
          <input type='submit' className= 'btn btn-primary'/>
          <button 
            type='button'
            className='btn btn-default'
            onClick={ this.toggleEditing }
          >
            Cancel
          </button>
          </div>
        </form>
      );
    } else {
      return(
        <div>
          <h1>{ menu.name }</h1>
          <div className='btn-group' role='group'>
            <Link to={`/menus/${menu.id}`} type='button' className='btn btn-primary'>Show Menu</Link>
            <button onClick={ this.toggleEditing } type='button'className='btn btn-warning'>Edit</button>
            <button 
              type='button'
              className='btn btn-danger' 
              onClick={ () => this.props.deleteMenu(menu.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    let menu = this.state.menu;

    return(
      <div key={menu.id} className="jumbotron col-xs-12 col-sm-6">
        { this.display() }
      </div>
    );
  }
}

export default MenuJumbotron;