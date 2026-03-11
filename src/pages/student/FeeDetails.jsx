import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const FeeDetails = () => {
    const { user } = useAuth();
    const { rooms, students, feeConfig } = useHostel();

    // Find the latest student data from HostelContext to ensure synced fee status
    const studentData = students.find(s => s.id === user?.id) || user;
    const userRoom = rooms.find(r => r.id === studentData?.room);
    
    const isSingleRoom = userRoom?.capacity === 1;
    const isGirlsHostel = studentData?.gender === 'Female' || studentData?.gender === 'Girls' || userRoom?.type === 'Girls Hostel';
    
    const hostelRent = isSingleRoom ? feeConfig.singleRoomHostel : feeConfig.standardRoomHostel;
    const messAdvance = isGirlsHostel ? feeConfig.girlsMess : feeConfig.boysMess;
    const wifiMaintenance = 3000;

    // Calculate total outstanding by summing up only the unpaid fees
    const hostelOutstanding = studentData?.feesPaid ? 0 : hostelRent;
    const messOutstanding = studentData?.messFeesPaid ? 0 : messAdvance;
    const totalOutstanding = hostelOutstanding + messOutstanding;
    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Fee Details</h1>
                <p className="subtitle">Track your hostel and mess fee payments.</p>
            </header>

            <Card style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }} className="flex-between">
                    <h3 style={{ margin: 0 }}>Hostel & Mess Dues</h3>
                    <Badge status={totalOutstanding > 0 ? "danger" : "success"}>
                        {totalOutstanding > 0 ? "Unpaid Dues" : "All Paid"}
                    </Badge>
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
                            <td style={{ padding: '1rem 1.5rem' }}><Badge status={studentData?.feesPaid ? "success" : "danger"}>{studentData?.feesPaid ? "Paid" : "Unpaid"}</Badge></td>
                            <td style={{ padding: '1rem 1.5rem' }}>{!studentData?.feesPaid && <Button variant="primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Pay Now</Button>}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '1rem 1.5rem', color: '#fff' }}>Mess Fee ({isGirlsHostel ? 'Girls' : 'Boys'})</td>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>₹{messAdvance.toLocaleString()}</td>
                            <td style={{ padding: '1rem 1.5rem' }}><Badge status={studentData?.messFeesPaid ? "success" : "danger"}>{studentData?.messFeesPaid ? "Paid" : "Unpaid"}</Badge></td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                                {studentData?.messFeesPaid ? 
                                    <span style={{ color: 'var(--text-muted)' }}>Receipt</span> : 
                                    <Button variant="secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Pay Now</Button>
                                }
                            </td>
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
