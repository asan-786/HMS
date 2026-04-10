import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { Users, Search } from 'lucide-react';

const RoomManagement = () => {
    const { rooms } = useHostel();
    const [filter, setFilter] = useState('All');

    const filteredRooms = rooms.filter(r => {
        if (filter === 'Available') return r.occupants < r.capacity;
        if (filter === 'Full') return r.occupants === r.capacity;
        if (filter === 'Assigned') return r.occupants > 0;
        if (filter === 'Unassigned') return r.occupants === 0;
        return true;
    });

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header className="flex-between" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Room Management</h1>
                    <p className="subtitle">Monitor occupancy and room status across all blocks.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['All', 'Available', 'Full', 'Assigned', 'Unassigned'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--border-light)',
                                background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: filter === f ? '#fff' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: 500,
                                fontSize: '0.85rem'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid-3">
                {filteredRooms.map(room => {
                    const isFull = room.occupants === room.capacity;
                    const availability = room.capacity - room.occupants;

                    return (
                        <Card key={room.id} style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', borderTop: `4px solid ${isFull ? 'var(--danger)' : 'var(--success)'}` }}>
                            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                                <h2 style={{ margin: 0, fontSize: '1.75rem', letterSpacing: '0.05em' }}>{room.id}</h2>
                                <Badge status={isFull ? 'danger' : 'success'}>
                                    {isFull ? 'Full' : `${availability} Slot(s)`}
                                </Badge>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div className="flex-between">
                                    <span className="subtitle" style={{ fontSize: '0.85rem' }}>Type</span>
                                    <span style={{ fontWeight: 500, color: '#fff' }}>{room.type}</span>
                                </div>
                                <div className="flex-between">
                                    <span className="subtitle" style={{ fontSize: '0.85rem' }}>Block</span>
                                    <span style={{ fontWeight: 500, color: '#fff' }}>{room.block}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                                <Users size={16} color="var(--primary)" />
                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    {Array.from({ length: room.capacity }).map((_, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                background: i < room.occupants ? 'var(--primary)' : 'rgba(255,255,255,0.1)'
                                            }}
                                        />
                                    ))}
                                </div>
                                <span className="subtitle" style={{ fontSize: '0.75rem', marginLeft: 'auto' }}>
                                    {room.occupants}/{room.capacity}
                                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default RoomManagement;
