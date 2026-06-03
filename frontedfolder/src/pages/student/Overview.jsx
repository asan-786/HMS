import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHostel } from '../../context/HostelContext';

import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

import {
    Utensils,
    Zap,
    BookOpen,
    AlertCircle
} from 'lucide-react';

const Overview = () => {

    const { user } = useAuth();

    // ✅ ADD studentProfile
    const {
        notices,
        messMenu,
        studentProfile
    } = useHostel();

    const today = new Date().toLocaleDateString(
        'en-US',
        { weekday: 'long' }
    );

    // ✅ Use student profile
    const gender =
        studentProfile?.gender || "Boys";

    const year =
        studentProfile?.year || "1st Year";

    // ✅ Correct menu access
    const todayMenu =
        messMenu?.[gender]?.[year]?.[today]
        || messMenu?.[today]
        || {};

    console.log("OVERVIEW MENU:", messMenu);
    console.log("TODAY:", today);
    console.log("TODAY MENU:", todayMenu);
    console.log("STUDENT PROFILE:", studentProfile);

    return (

        <div
            className="animate-fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >

            {/* Header */}
            <header>

                <h1
                    style={{
                        fontSize: '2rem',
                        marginBottom: '0.25rem'
                    }}
                >
                    Overview
                </h1>

                <p className="subtitle">
                    Welcome back, {user?.name}.
                    Here's what's happening today.
                </p>

            </header>

            {/* Stats */}
            <div
                className="grid-4"
                style={{ marginBottom: '1rem' }}
            >

                {/* Room */}
                <StatCard
                    title="Current Room"
                    value={
                        studentProfile?.room?.roomId
                        || "Unassigned"
                    }
                    icon={<BookOpen size={24} />}
                />

                {/* CGPA */}
                <StatCard
                    title="CGPA"
                    value={
                        studentProfile?.cgpa !== undefined
                            ? Number(
                                studentProfile.cgpa
                              ).toFixed(2)
                            : "N/A"
                    }
                    icon={<Zap size={24} />}
                    color="var(--secondary)"
                />

                {/* Fees */}
                <StatCard
                    title="Hostel Fees"
                    value={
                        studentProfile?.feesPaid
                            ? "Paid"
                            : "Due"
                    }
                    icon={<AlertCircle size={24} />}
                    color={
                        studentProfile?.feesPaid
                            ? "var(--success)"
                            : "var(--danger)"
                    }
                />

                {/* Mess */}
                <StatCard
                    title="Mess Status"
                    value={
                        studentProfile?.messEnrolled
                            ? "Enrolled"
                            : "Not Enrolled"
                    }
                    icon={<Utensils size={24} />}
                    color="var(--info)"
                />

            </div>

            {/* Main Section */}
            <div className="grid-2">

                {/* Today's Menu */}
                <Card>

                    <div
                        className="flex-between"
                        style={{
                            marginBottom: '1.5rem'
                        }}
                    >

                        <h3
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Utensils
                                size={20}
                                color="var(--primary)"
                            />

                            Today's Menu: {today}

                        </h3>

                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >

                        {/* Breakfast */}
                        <div
                            style={{
                                padding: '1rem',
                                background:
                                    'rgba(255,255,255,0.02)',
                                borderRadius:
                                    'var(--radius-sm)',
                                borderLeft:
                                    '3px solid var(--primary)'
                            }}
                        >

                            <p
                                className="subtitle"
                                style={{
                                    fontSize: '0.8rem',
                                    marginBottom: '0.2rem'
                                }}
                            >
                                Breakfast
                            </p>

                            <p style={{ fontWeight: 500 }}>
                                {
                                    todayMenu?.breakfast
                                    || "-"
                                }
                            </p>

                        </div>

                        {/* Lunch */}
                        <div
                            style={{
                                padding: '1rem',
                                background:
                                    'rgba(255,255,255,0.02)',
                                borderRadius:
                                    'var(--radius-sm)',
                                borderLeft:
                                    '3px solid var(--secondary)'
                            }}
                        >

                            <p
                                className="subtitle"
                                style={{
                                    fontSize: '0.8rem',
                                    marginBottom: '0.2rem'
                                }}
                            >
                                Lunch
                            </p>

                            <p style={{ fontWeight: 500 }}>
                                {
                                    todayMenu?.lunch
                                    || "-"
                                }
                            </p>

                        </div>

                        {/* Dinner */}
                        <div
                            style={{
                                padding: '1rem',
                                background:
                                    'rgba(255,255,255,0.02)',
                                borderRadius:
                                    'var(--radius-sm)',
                                borderLeft:
                                    '3px solid var(--info)'
                            }}
                        >

                            <p
                                className="subtitle"
                                style={{
                                    fontSize: '0.8rem',
                                    marginBottom: '0.2rem'
                                }}
                            >
                                Dinner
                            </p>

                            <p style={{ fontWeight: 500 }}>
                                {
                                    todayMenu?.dinner
                                    || "-"
                                }
                            </p>

                        </div>

                    </div>

                </Card>

                {/* Notices */}
                <Card>

                    <div
                        className="flex-between"
                        style={{
                            marginBottom: '1.5rem'
                        }}
                    >

                        <h3
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >

                            <AlertCircle
                                size={20}
                                color="var(--secondary)"
                            />

                            Recent Notices

                        </h3>

                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >

                        {
                            notices
                            ?.slice(0, 3)
                            ?.map((notice, index) => (

                                <div
                                    key={
                                        notice._id
                                        || notice.id
                                        || index
                                    }

                                    style={{
                                        padding: '1rem',
                                        background:
                                            'rgba(255,255,255,0.03)',
                                        borderRadius:
                                            'var(--radius-md)',
                                        border:
                                            '1px solid var(--border-light)'
                                    }}
                                >

                                    <div
                                        className="flex-between"
                                        style={{
                                            marginBottom: '0.5rem'
                                        }}
                                    >

                                        <span
                                            style={{
                                                fontWeight: 500,
                                                color: '#fff'
                                            }}
                                        >
                                            {notice.title}
                                        </span>

                                        {
                                            notice.important &&
                                            (
                                                <Badge status="danger">
                                                    Urgent
                                                </Badge>
                                            )
                                        }

                                    </div>

                                    <p
                                        className="subtitle"
                                        style={{
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {notice.content}
                                    </p>

                                    <div
                                        style={{
                                            fontSize: '0.75rem',
                                            color:
                                                'var(--text-muted)',
                                            marginTop: '0.5rem',
                                            textAlign: 'right'
                                        }}
                                    >
                                        {
                                            notice.date
                                            || new Date()
                                                .toLocaleDateString()
                                        }
                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </Card>

            </div>

        </div>
    );
};

export default Overview;