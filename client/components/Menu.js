import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
  state = { menu: {}, menu_items: [] };

  componentDidMount() {
    $.ajax({
      url: `/api/menus/${this.props.params.id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( menu => {
      this.setState({ ...menu });
    }).fail( data => {
      console.log(data);
    });
  }

  displayMenuItems = () => {
    return this.state.menu_items.map( menu_item => {
      let id = `collapse${menu_item.id}`;
      return(
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#${id}`}>
                { menu_item.name }
              </a>
            </h4>
          </div>
          <div id={id} className="panel-collapse collapse in" role="tabpanel">
            <div className="panel-body">
              { menu_item.description }
              <hr />
              <i>Price: ${ Math.round(menu_item.price) }</i>
              <br />
              <div className='btn-group' role='group'>
              <button type='button' className='btn btn-warning'>Edit</button>
              <button type='button' className='btn btn-danger'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return(
      <div>
        <h1>{this.state.menu.name}</h1>
        <Link to='/menus' className='btn btn-default'>All Menus</Link>
        <h3>All Menu Items</h3>
        <div className="panel-group" id="accordion" role="tablist">
          { this.displayMenuItems() }
        </div>
      </div>
    );
  }
}

export default Menu;
