import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';

const pageTitles = {
    // Admin
    '/admin': 'Dashboard',
    '/admin/students': 'Students',
    '/admin/classes': 'Classes & Sections',
    '/admin/admissions': 'Admissions',
    '/admin/fees': 'Fee Management',
    '/admin/timetable': 'Timetable',
    '/admin/announcements': 'Announcements',
    '/admin/teachers': 'Teachers',
    '/admin/payroll': 'Staff Payroll',
    '/admin/analytics': 'Analytics & Reports',
    '/admin/report-cards': 'Report Cards',
    // Teacher
    '/teacher': 'Dashboard',
    '/teacher/attendance': 'Mark Attendance',
    '/teacher/classes': 'My Classes',
    '/teacher/assignments': 'Assignments',
    '/teacher/examinations': 'Examinations',
    '/teacher/marks': 'Enter Marks',
    '/teacher/students': 'Student Profiles',
    '/teacher/performance': 'Performance',
    // Parent
    '/parent': 'Overview',
    '/parent/attendance': 'Attendance',
    '/parent/results': 'Results & Grades',
    '/parent/report-card': 'Report Card',
    '/parent/fees': 'Fee Payments',
    '/parent/timetable': 'Timetable',
    '/parent/announcements': 'Announcements',
    // Student
    '/student': 'Dashboard',
    '/student/timetable': 'My Timetable',
    '/student/assignments': 'Assignments',
    '/student/grades': 'My Grades',
    '/student/attendance': 'Attendance History',
    '/student/report-cards': 'Report Cards',
    '/student/announcements': 'Announcements',
    '/student/library': 'Library',
};

const AppLayout = ({ role, navSections, user }) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const title = pageTitles[location.pathname] || 'Dashboard';
    
    // Non-admin roles will favor bottom navigation on mobile devices.
    const showBottomNav = role !== 'admin';

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`app-layout role-${role} ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Desktop Sidebar, or Admin Mobile Sidebar */}
            <Sidebar role={role} navSections={navSections} user={user} onClose={() => setSidebarOpen(false)} />
            
            {/* Sidebar toggle overlay for Mobile (Admins mostly) */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

            <div className="main-content">
                <Topbar title={title} onMenuClick={toggleSidebar} showMenuBtn={role === 'admin'} />
                <div className={`content ${showBottomNav ? 'has-bottom-nav' : ''}`}>
                    <Outlet />
                </div>
            </div>

            {/* Mobile Bottom Navigation for non-admins */}
            {showBottomNav && <BottomNav role={role} navSections={navSections} />}
            
            {/* We will hide the back-btn on mobile standard view using CSS so it doesn't conflict with BottomNav */}
            <Link to="/" className="back-btn">
                ← Switch Role
            </Link>
        </div>
    );
};

export default AppLayout;
