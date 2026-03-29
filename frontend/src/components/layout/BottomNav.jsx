import { NavLink } from 'react-router-dom';
import React from 'react';

// Maps string emojis/icons from the current structure to real Lucide icons if desired,
// but for simplicity we will just render the string emoji if it's there.
const BottomNav = ({ navSections }) => {
    // Flatten all items across sections
    const allItems = navSections.reduce((acc, curr) => {
        return [...acc, ...curr.items];
    }, []);

    // Take up to 5 items for the bottom nav
    const bottomNavItems = allItems.slice(0, 5);

    return (
        <nav className="bottom-nav">
            {bottomNavItems.map((item, i) => (
                <NavLink
                    key={i}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
                >
                    <span className="bottom-nav-icon">{item.icon}</span>
                    <span className="bottom-nav-label">{item.label}</span>
                    {item.badge && <span className="bottom-nav-badge"></span>}
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
