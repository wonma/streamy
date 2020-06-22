import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Streamy</Link>
            <div className="right menu">
                <Link to="/" className="item">All Streams</Link>
                <div className="item"><GoogleAuth /></div>
            </div>
        </div>
    );
}

export default Header;

            // <Link to="/streams/new">Create Stream</Link>
            // <Link to="/streams/edit">Edit Stream</Link>
            // <Link to="/streams/delete">Delete Stream</Link>
            // <Link to="/streams/show">Play Stream</Link>