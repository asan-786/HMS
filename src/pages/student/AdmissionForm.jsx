import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdmissionForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isPaying, setIsPaying] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPaying(true);
    };

    const handlePayment = () => {
        // Mock payment processing
        setTimeout(() => {
            setIsPaying(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Application Submitted!</h2>
                <p className="subtitle" style={{ maxWidth: 400, marginBottom: '2rem' }}>Registration Fee of ₹100 received. Your hostel admission request has been sent to the warden. You will be notified once a room is allocated.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another request</Button>
            </div>
        );
    }

    if (isPaying) {
        return (
            <div className="animate-fade-in" style={{ maxWidth: 450, margin: '4rem auto', textAlign: 'center' }}>
                <Card style={{ padding: '2.5rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Registration Fee</h2>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>₹100</div>
                    <p className="subtitle" style={{ marginBottom: '2rem' }}>Secure portal registration fee required for application processing.</p>

                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', textAlign: 'left', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="subtitle">Reference ID</span>
                            <span style={{ color: '#fff' }}>#{Math.floor(Math.random() * 90000) + 10000}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="subtitle">Payment Type</span>
                            <span style={{ color: '#fff' }}>Application Fee</span>
                        </div>
                    </div>

                    <Button variant="primary" style={{ width: '100%', padding: '1rem' }} onClick={handlePayment}>
                        Pay ₹100 & Submit Form
                    </Button>
                    <button onClick={() => setIsPaying(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', marginTop: '1.5rem', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}>
                        Cancel and Edit Details
                    </button>
                </Card>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Hostel Admission</h1>
                <p className="subtitle">Apply for a room for the upcoming academic year.</p>
            </header>

            <Card>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="grid-2">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Name</label>
                            <input type="text" required defaultValue="Mahesh" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>pecentile(First year student)</label>
                            <input type="text" required style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }} />
                        </div>
                    </div>

                    <div className="grid-2">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fathers name</label>
                            <input type="text" required defaultValue="Mahesh" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gender</label>
                            <select required defaultValue="General" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none', appearance: 'none' }}>
                                <option value="Male" style={{ background: 'var(--bg-card)' }}>Male</option>
                                <option value="Female" style={{ background: 'var(--bg-card)' }}>Female</option>

                            </select>
                        </div>
                    </div>

                    <div className="grid-2">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current CGPA</label>
                            <input type="number" step="0.1" max="10" required defaultValue="8.9" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                            <select required defaultValue="General" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none', appearance: 'none' }}>
                                <option value="General" style={{ background: 'var(--bg-card)' }}>General</option>
                                <option value="OBC" style={{ background: 'var(--bg-card)' }}>OBC</option>
                                <option value="SC" style={{ background: 'var(--bg-card)' }}>SC</option>
                                <option value="ST" style={{ background: 'var(--bg-card)' }}>ST</option>
                                <option value="MBC" style={{ background: 'var(--bg-card)' }}>MBC</option>
                                <option value="EWS" style={{ background: 'var(--bg-card)' }}>EWS</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Year / Category</label>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" name="roomType" value="First Year" defaultChecked /> First Year
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" name="roomType" value="Second Year" /> Second Year
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" name="roomType" value="Third Year" /> Third Year
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="radio" name="roomType" value="Final Year" /> Final Year
                            </label>

                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Address & Medical Conditions (if any)</label>
                        <textarea rows="3" style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', color: '#fff', outline: 'none', resize: 'vertical' }}></textarea>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, fontWeight: 600, color: '#fff' }}>Registration Fee: ₹100</p>
                            <p className="subtitle" style={{ fontSize: '0.8rem' }}>Non-refundable application processing charge</p>
                        </div>
                        <Button type="submit" variant="primary" style={{ padding: '0.8rem 2rem' }}>Proceed to Payment & Submit</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AdmissionForm;
