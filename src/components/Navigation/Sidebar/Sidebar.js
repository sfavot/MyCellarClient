// @flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import menu from '../../../config/menu';
import SidebarItemHeader from './SidebarItemHeader';
import SidebarItem from './SidebarItem';
import SidebarSubItem from './SidebarSubItem';
import SidebarSubHeader from './SidebarSubHeader';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: {},
        };
    }

    toggleItemCollapse = (id) => () => {
        for (let c in this.state.collapse) {
            if (this.state.collapse[c] === true && c !== id)
                this.setState({
                    collapse: {
                        [c]: false
                    }
                });
        }
        this.setState({
            collapse: {
                [id]: !this.state.collapse[id]
            }
        });
    }

    isRouteActive = (routes) => {
        routes = Array.isArray(routes) ? routes : [routes];
        if (routes.indexOf(this.props.location.pathname) > -1) {
            return true;
        }

        return false;
    }

    getSubRoutes = item => item.submenu.map(({route}) => route)

    render() {
        return (
            <aside className='aside-container'>
                <div className="aside-inner">
                    <nav className="sidebar show-scrollbar">
                        <ul className="sidebar-nav">
                            {menu.map((item) => {
                                if (item.type === 'header') {
                                    return (
                                        <SidebarItemHeader
                                            item={item}
                                            key={item.id}
                                        />
                                    );
                                }

                                if (item.type === 'submenu') {
                                    return (
                                        <SidebarSubItem
                                            key={item.id}
                                            item={item}
                                            open={this.state.collapse[item.name]}
                                            handler={ this.toggleItemCollapse(item.id) }
                                            active={this.isRouteActive(this.getSubRoutes(item))}
                                        >
                                            <SidebarSubHeader item={item} key={item.id}/>
                                            {
                                                item.submenu.map((subitem) =>
                                                    <SidebarItem
                                                        key={subitem.id}
                                                        item={subitem}
                                                        active={this.isRouteActive(subitem.route)}
                                                    />
                                                )
                                            }
                                        </SidebarSubItem>
                                    );
                                }

                                return (
                                    <SidebarItem
                                        key={item.id}
                                        active={this.isRouteActive(item.route)}
                                        item={item}
                                    />
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default withRouter(Sidebar);
