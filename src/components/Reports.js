import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import './Reports.css';

const Reports = () => {
    const { currentUser } = useAuth();
    const [reportType, setReportType] = useState('daily');
    const [fileFormat, setFileFormat] = useState('PDF');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        if (!currentUser) return;
        try {
            const response = await axios.get(`/api/reports?firebase_uid=${currentUser.uid}`);
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [currentUser]);

    const handleCreateReport = async () => {
        if (!currentUser) return;
        try {
            const newReport = {
                firebase_uid: currentUser.uid,
                name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
                type: fileFormat,
                email: currentUser.email
            };

            await axios.post('/api/reports', newReport);
            alert("Report generated successfully!");
            fetchReports(); // Refresh list
        } catch (error) {
            console.error("Error creating report:", error);
            alert("Failed to create report");
        }
    };

    const handleDownload = (url) => {
        if (!url || url === '#') {
            alert("File not available.");
            return;
        }
        window.open(url, '_blank');
    };

    return (
        <div className="dashboard">
            <Sidebar />

            {/* Main Content */}
            <main className="main-content">
                <div className="content-container">
                    <header className="content-header">
                        <div>
                            <h1 className="page-title">Air Quality Reports</h1>
                            <p className="page-subtitle">Generate and download detailed air quality analysis.</p>
                        </div>
                    </header>

                    <div className="reports-grid">
                        <div className="card">
                            <h2 className="section-title">Recent Reports</h2>
                            <div className="table-container">
                                <table className="reports-table">
                                    <thead>
                                        <tr>
                                            <th>Report Name</th>
                                            <th>Date Generated</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report.id}>
                                                <td className="report-name-cell">
                                                    <div className="file-icon">
                                                        <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                                                            <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                                                        </svg>
                                                    </div>
                                                    {report.name}
                                                </td>
                                                <td>{new Date(report.generated_date || report.created_at).toLocaleDateString()}</td>
                                                <td><span className={`badge ${report.type.toLowerCase()}`}>{report.type}</span></td>
                                                <td><span className={`status-dot ${report.status.toLowerCase()}`}></span> {report.status}</td>
                                                <td>
                                                    <button className="download-btn" onClick={() => handleDownload(report.file_url)}>
                                                        Download
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card">
                            <h2 className="section-title">Custom Report Generator</h2>
                            <form className="generator-form">
                                <div className="form-group">
                                    <label>Report Type</label>
                                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                                        <option value="daily">Daily Summary</option>
                                        <option value="weekly">Weekly Analysis</option>
                                        <option value="monthly">Monthly Breakdown</option>
                                        <option value="custom">Custom Range</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Format</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="format" value="PDF" checked={fileFormat === 'PDF'} onChange={(e) => setFileFormat(e.target.value)} /> PDF
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="format" value="CSV" checked={fileFormat === 'CSV'} onChange={(e) => setFileFormat(e.target.value)} /> CSV
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="format" value="DOCX" checked={fileFormat === 'DOCX'} onChange={(e) => setFileFormat(e.target.value)} /> Word
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Include Sections</label>
                                    <div className="checkbox-group">
                                        <label className="checkbox-label">
                                            <input type="checkbox" defaultChecked /> AQI Metrics
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" defaultChecked /> Source Analysis
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" defaultChecked /> Forecast Data
                                        </label>
                                        <label className="checkbox-label">
                                            <input type="checkbox" /> Raw Sensor Data
                                        </label>
                                    </div>
                                </div>
                                <button type="button" className="generate-submit-btn" onClick={handleCreateReport}>
                                    Create Report
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reports;
