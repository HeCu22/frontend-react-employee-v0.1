import React from 'react';

function HeaderComponent(props) {
    return (
        <div className="outer-container header">
            <header className="inner-container">
                <nav className="column">
                    <a className="row" href="">
                        Employee Management System
                    </a>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;