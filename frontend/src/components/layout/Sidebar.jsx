import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ role, navSections, user, onClose }) => {
    const navigate = useNavigate();

    const roleColors = {
        admin: { pill: 'admin', text: '⚡ Administrator' },
        teacher: { pill: 'teacher', text: '📋 Teacher' },
        parent: { pill: 'parent', text: '👨‍👩‍👧 Parent' },
        student: { pill: 'student', text: '🎒 Student' },
    };

    return (
        <nav className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo" onClick={() => { navigate('/'); if(onClose) onClose(); }}>
                    <div className="logo-mark">E</div>
                    <span className="logo-text">EduCore</span>
                </div>
                <div className={`role-pill ${roleColors[role].pill}`}>
                    {roleColors[role].text}
                </div>
            </div>

            <div className="sidebar-nav">
                {navSections.map((section, i) => (
                    <div className="nav-section" key={i}>
                        <div className="nav-section-label">{section.label}</div>
                        {section.items.map((item, j) => (
                            <NavLink
                                key={j}
                                to={item.path}
                                end={item.end}
                                onClick={onClose}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                                {item.badge && <span className="nav-badge">{item.badge}</span>}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>

            <div className="sidebar-user">
                <div className={`user-avatar ${role}`}>{user.initial}</div>
                <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
