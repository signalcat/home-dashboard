import React from 'react';
import Aux from '../Aux/Aux';

const layout = (props) => {
    return (
        <Aux>
            <div>ToolBar</div>
            <div>SideDrawer</div>
            <main>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;