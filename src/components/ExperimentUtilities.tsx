import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import './ExperimentUtilities.css';

interface ExperimentUtilitiesProps {
  experimentId: string;
  experimentTitle: string;
}

export default function ExperimentUtilities({ experimentId, experimentTitle }: ExperimentUtilitiesProps) {
  const { isBookmarked, toggleBookmark, getNote, saveNote } = useProgress();
  const bookmarked = isBookmarked(experimentId);
  
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState(() => getNote(experimentId));
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    setNoteText(getNote(experimentId));
  }, [experimentId, getNote]);


  const handleToggleBookmark = () => {
    toggleBookmark({
      id: experimentId,
      type: 'experiment',
      experimentId,
      title: experimentTitle,
    });
  };

  const handleSaveNote = () => {
    saveNote(experimentId, noteText);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  return (
    <div className="exp-utilities">
      <div className="exp-utilities-bar">
        <button 
          className={`btn-utility ${bookmarked ? 'active' : ''}`}
          onClick={handleToggleBookmark}
          aria-pressed={bookmarked}
          title="Bookmark this experiment"
        >
          {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
        <button 
          className={`btn-utility ${isNotesOpen ? 'active' : ''}`}
          onClick={() => setIsNotesOpen(!isNotesOpen)}
          aria-expanded={isNotesOpen}
          title="Experiment Notes"
        >
          📝 Notes
        </button>
      </div>

      {isNotesOpen && (
        <div className="exp-notes-panel">
          <div className="exp-notes-header">
            <h4>My Notes</h4>
            {saveStatus === 'saved' && <span className="save-status text-success">Saved!</span>}
          </div>
          <textarea
            className="exp-notes-textarea"
            placeholder="Write your notes here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={handleSaveNote}
            aria-label="Experiment Notes"
          />
        </div>
      )}
    </div>
  );
}
