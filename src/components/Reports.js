import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Reports.css';

const Reports = () => {
    const [reportType, setReportType] = useState('daily');

    const reportsData = [
        { id: 1, name: 'Daily Air Quality Summary', date: 'Nov 28, 2025', type: 'PDF', status: 'Ready' },
        { id: 2, name: 'Weekly Pollution Analysis', date: 'Nov 24, 2025', type: 'CSV', status: 'Ready' },
        { id: 3, name: 'Monthly Source Breakdown', date: 'Nov 01, 2025', type: 'PDF', status: 'Ready' },
        { id: 4, name: 'Health Impact Assessment', date: 'Oct 15, 2025', type: 'PDF', status: 'Archived' },
        { id: 5, name: 'Quarterly Forecast Accuracy', date: 'Oct 01, 2025', type: 'CSV', status: 'Ready' },
    ];

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
                        <button className="generate-btn">
                            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                            Generate New Report
                        </button>
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
                                        {reportsData.map((report) => (
                                            <tr key={report.id}>
                                                <td className="report-name-cell">
                                                    <div className="file-icon">
                                                        <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                                                            <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                                                        </svg>
                                                    </div>
                                                    {report.name}
                                                </td>
                                                <td>{report.date}</td>
                                                <td><span className={`badge ${report.type.toLowerCase()}`}>{report.type}</span></td>
                                                <td><span className={`status-dot ${report.status.toLowerCase()}`}></span> {report.status}</td>
                                                <td>
                                                    <button className="download-btn">
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
                                            <input type="radio" name="format" defaultChecked /> PDF
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="format" /> CSV
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="format" /> Excel
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
                                <button type="button" className="generate-submit-btn">
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
