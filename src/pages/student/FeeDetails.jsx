import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const FeeDetails = () => {
    const { user } = useAuth();
    const { rooms } = useHostel();

    const userRoom = rooms.find(r => r.id === user?.room);
    const isSingleRoom = userRoom?.capacity === 1;
    const isGirlsHostel = userRoom?.type === 'Girls Hostel';
    const hostelRent = isSingleRoom ? 13000 : 12000;
    const messAdvance = isGirlsHostel ? 18500 : 17500;
    const wifiMaintenance = 3000;

    // For demo purposes, we'll assume mess and wifi are paid, only rent is pending if user.feesPaid is false
    const totalOutstanding = user?.feesPaid ? 0 : hostelRent;
    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Fee Details</h1>
                <p className="subtitle">Track your hostel and mess fee payments.</p>
            </header>

            <div className="grid-2" style={{ gap: '1.5rem' }}>
                <Card style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)', background: 'rgba(59, 130, 246, 0.05)' }}>
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Option: Girls Mess Fee</h4>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>₹18,500</div>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Per Semester</p>
                </Card>
                <Card style={{ padding: '1.5rem', borderLeft: '4px solid var(--secondary)', background: 'rgba(59, 130, 246, 0.05)' }}>
                    <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Option: Single Room Fee</h4>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>₹13,000</div>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Year</p>
                </Card>
            </div>

            <Card style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }} className="flex-between">
                    <h3 style={{ margin: 0 }}>Hostel & Mess Dues</h3>
                    <Badge status="danger">Unpaid</Badge>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Description</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Amount</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '1rem 1.5rem', color: '#fff' }}>Hostel Fee (Full Year) {isSingleRoom && <Badge status="info" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>Single Room Premium</Badge>}</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>₹{hostelRent.toLocaleString()}</td>
                            <td style={{ padding: '1rem 1.5rem' }}><Badge status={user?.feesPaid ? "success" : "danger"}>{user?.feesPaid ? "Paid" : "Unpaid"}</Badge></td>
                            <td style={{ padding: '1rem 1.5rem' }}>{!user?.feesPaid && <Button variant="primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Pay Now</Button>}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '1rem 1.5rem', color: '#fff' }}>Mess Fee ({isGirlsHostel ? 'Girls' : 'Boys'})</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>₹{messAdvance.toLocaleString()}</td>
                            <td style={{ padding: '1rem 1.5rem' }}><Badge status="success">Paid</Badge></td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Receipt</td>
                        </tr>

                    </tbody>
                </table>

                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'flex-end', gap: '2rem', alignItems: 'center' }}>
                    <span className="subtitle">Total Outstanding:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: totalOutstanding > 0 ? 'var(--danger)' : 'var(--success)' }}>₹{totalOutstanding.toLocaleString()}</span>
                </div>
            </Card>
        </div>
    );
};

export default FeeDetails;
