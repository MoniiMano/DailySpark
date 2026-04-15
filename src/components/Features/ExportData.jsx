import { useState } from 'react';
import { Download, Upload, FileText } from 'lucide-react';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';

export const ExportData = ({ achievements, goals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importData, setImportData] = useState('');

  const exportData = () => {
    const data = {
      achievements,
      goals,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `motivated-calendar-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importDataFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.achievements && data.goals) {
            // Merge with existing data
            const existingAchievements = JSON.parse(localStorage.getItem('motivatedCalendar_achievements') || '{}');
            const existingGoals = JSON.parse(localStorage.getItem('motivatedCalendar_goals') || '[]');
            
            const mergedAchievements = { ...existingAchievements, ...data.achievements };
            const mergedGoals = [...existingGoals, ...data.goals.filter(goal => 
              !existingGoals.some(existing => existing.id === goal.id)
            )];
            
            localStorage.setItem('motivatedCalendar_achievements', JSON.stringify(mergedAchievements));
            localStorage.setItem('motivatedCalendar_goals', JSON.stringify(mergedGoals));
            
            alert('Data imported successfully! Please refresh the page to see changes.');
          } else {
            alert('Invalid file format. Please select a valid backup file.');
          }
        } catch (error) {
          alert('Error reading file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={20} className="text-motivation-purple" />
          <h3 className="text-lg font-semibold text-gray-800">Data Management</h3>
        </div>

        <div className="space-y-3">
          <Button
            onClick={exportData}
            variant="outline"
            className="w-full justify-center"
          >
            <Download size={16} className="mr-2" />
            Export Data
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={importDataFromFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="import-file"
            />
            <Button
              variant="secondary"
              className="w-full justify-center"
              as="label"
              htmlFor="import-file"
            >
              <Upload size={16} className="mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Export your data to keep a backup, or import from a previous backup file.
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Import Data"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Paste your exported data JSON here to import:
          </p>
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-motivation-purple focus:border-transparent"
            placeholder="Paste JSON data here..."
          />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                try {
                  const data = JSON.parse(importData);
                  // Import logic here
                  setIsModalOpen(false);
                  setImportData('');
                } catch (error) {
                  alert('Invalid JSON format');
                }
              }}
              className="flex-1"
            >
              Import
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};