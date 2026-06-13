import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { FileText, Trash2 } from 'lucide-react';
import API from "../../api";

const NoticeBoard = () => {
    
    const { notices, addNotice , fetchData , deleteNotice } = useHostel();

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');
    const [important, setImportant] = useState(false);
    
  
const handleSubmit = async (e) => {
    e.preventDefault();
  console.log("FILE STATE:", file);
    if (!title.trim() || !content.trim()) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("message", content);

    // ✅ VERY IMPORTANT (only if file exists)
     if (file instanceof File) {
        formData.append("pdf", file);
        console.log("notice cnotroler loaded");
    }

    formData.append("important", important);

    console.log("FORM DATA:");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);  // ✅ DEBUG
    }

    await addNotice(formData);

    setTitle('');
    setContent('');
    setImportant(false);
    setFile(null);
};


// const handleDelete = async (id) => {
//     try {
//         await API.delete(`/notice/${id}`);
//         fetchData(); // ✅ now works
//     } catch (err) {
//         console.error(err);
//     }
// };


const handleDeleteNotice = async (id) => {

   try {

      await deleteNotice(id);

   } catch (err) {

      console.log(err);

      alert("Failed to delete notice");
   }
};


//   const handleDeleteNotice = async (id) => {

//    try {

//       await API.delete(`/notice/${id}`);

//       setNotices(prev =>
//          prev.filter(notice => notice._id !== id)
//       );

//    } catch (err) {

//       console.log(err);
//    }
// };

return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <header>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Notice Board</h1>
            <p className="subtitle">Publish official announcements to all students.</p>
        </header>

        <div className="grid-2" style={{ gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 2fr)' }}>
            
            {/* Create Notice */}
            <Card style={{ alignSelf: 'start' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Post New Notice</h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Title */}
                    <div>
                        <label>Title</label>
                        <input
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="e.g., Campus Cleaning Schedule"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label>Message</label>
                        <textarea
                            required
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows="5"
                            placeholder="Write your announcement..."
                        />
                    </div>

                    {/* ✅ PDF Upload */}
                    <div>
                        <label>Upload PDF (optional)</label>
                       <input   type="file"
  accept="application/pdf"
  onChange={(e) => {
      console.log("SELECTED FILE:", e.target.files[0]); // ✅ debug
      setFile(e.target.files[0]);
  }}
                        />
                        {file && (
                            <p style={{ fontSize: '0.8rem', color: 'green' }}>
                                Selected: {file.name}
                            </p>
                        )}
                    </div>

                    {/* Important */}
                    <label>
                        <input
                            type="checkbox"
                            checked={important}
                            onChange={e => setImportant(e.target.checked)}
                        />
                        Mark as Important
                    </label>

                    <Button type="submit">Publish Notice</Button>
                </form>
            </Card>

            {/* Notice List */}
            <Card style={{ padding: 0 }}>
                <div style={{ padding: '1.5rem' }}>
                    <h3>Published Notices</h3>
                </div>

                <div>
                    {!Array.isArray(notices) || notices.length === 0 ? (
                        <p style={{ padding: '2rem', textAlign: 'center' }}>
                            No notices available
                        </p>
                    ) : (
                        notices.map((notice) => (
                            <div key={notice._id} style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                                
                                {/* Title + Important */}
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h4>{notice.title}</h4>
                                    {notice.important && <Badge status="danger">Important</Badge>}
                                </div>

                                {/* Message */}
                                <p>{notice.content}</p>

                                {/* ✅ PDF VIEW */}
                                {notice.pdf && (
                                    <a
                                        href={`https://hms-w6eu.onrender.com/uploads/${notice.pdf}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: 'blue', fontSize: '0.9rem' }}
                                    >
                                        📄 View PDF
                                    </a>
                                )}

                                {/* Date */}
                                <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </div>

                                {/* ✅ DELETE BUTTON */}
                                <Button
                                    variant="danger"
                                    style={{ marginTop: '10px' }}
                                    onClick={() =>  handleDeleteNotice(notice._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </Card>

        </div>
    </div>
);


};

export default NoticeBoard;











    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (!title.trim() || !content.trim()) return;

    //     addNotice({ title, content, important });

    //     setTitle('');
    //     setContent('');
    //     setImportant(false);
    // };