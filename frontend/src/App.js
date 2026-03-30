import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  
  // ✅ FETCH NOTES
  const fetchNotes = () => {
    fetch("http://localhost:5000/api/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  };

  // run on page load
  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ ADD NOTE
  const addNote = async () => {
    await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  // ✅ DELETE NOTE
  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE"
    });

    fetchNotes();
  };
  //EDIT NOTE
  const editNote = (note) => {
  setTitle(note.title);
  setContent(note.content);
  setEditingId(note._id);
};
  // ✅ UPDATE NOTE
  const updateNote = async () => {
  await fetch(`http://localhost:5000/api/notes/${editingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, content })
  });

  setTitle("");
  setContent("");
  setEditingId(null);
  fetchNotes();
};
    
  return (
    <div style={{ 
      padding: "20px",
      fontFamily: "Arial",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
    }}>

      
<h1 style={{ 
  textAlign: "center",
  marginBottom: "30px",
  color: "#f8f9ff",
  fontSize: "48px",          // 👈 increased size
  fontWeight: "700",         // 👈 bold
  textShadow: "0px 4px 12px rgba(0,0,0,0.3)"
}}>
  My Notes 📝
</h1>

    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  style={{
    padding: "10px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  }}
/>

<input
  placeholder="Content"
  value={content}
  onChange={(e) => setContent(e.target.value)}
  style={{
    padding: "10px",
    marginRight: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  }}
/>
      <button
  onClick={editingId ? updateNote : addNote}
  style={{
    padding: "10px 20px",
    background: "#00c6ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  {editingId ? "Update Note" : "Add Note"}
</button>
    </div>

    <div style={{ display: "flex",
flexWrap: "wrap",
gap: "20px",
justifyContent: "center" }}>
      {notes.map(note => (
        <div key={note._id} className="note-card">

        
         <h3 style={{ 
  color: "#ffffff",          // bright white
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "8px"
}}>
  {note.title}
</h3>

<p style={{ 
  color: "#d1d5db",          // soft grey (perfect contrast)
  fontSize: "17px",
  lineHeight: "1.5"
}}>
  {note.content}
</p>
          
          <button
            onClick={() => editNote(note)}
            style={{
              background: "#00c6ff",
              color: "white",
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "8px"
            }}
          >
            Edit
          </button>
          <button
            onClick={() => deleteNote(note._id)}
           style={{
  background: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer"
}}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;