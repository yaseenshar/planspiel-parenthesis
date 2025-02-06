import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot-documents',
  templateUrl: './chatbot-documents.component.html',
  styleUrl: './chatbot-documents.component.scss'
})
export class ChatbotDocumentsComponent {
  reports = [
    { id: 1, title: 'Security Audit Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d', content: 'Detailed security analysis for your project.' },
    { id: 2, title: 'Vulnerability Assessment', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Identified software vulnerabilities with mitigation steps.' },
    { id: 3, title: 'Compliance Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Evaluation of compliance standards against security frameworks.' },
    { id: 4, title: 'Security Audit Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Detailed security analysis for your project.' },
    { id: 5, title: 'Vulnerability Assessment', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Identified software vulnerabilities with mitigation steps.' },
    { id: 6, title: 'Compliance Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Evaluation of compliance standards against security frameworks.' },
    { id: 7, title: 'Security Audit Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Detailed security analysis for your project.' },
    { id: 8, title: 'Vulnerability Assessment', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Identified software vulnerabilities with mitigation steps.' },
    { id: 9, title: 'Compliance Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Evaluation of compliance standards against security frameworks.' },
    { id: 10, title: 'Security Audit Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Detailed security analysis for your project.' },
    { id: 11, title: 'Vulnerability Assessment', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Identified software vulnerabilities with mitigation steps.' },
    { id: 12, title: 'Compliance Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Evaluation of compliance standards against security frameworks.' },
    { id: 13, title: 'Security Audit Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Detailed security analysis for your project.' },
    { id: 14, title: 'Vulnerability Assessment', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Identified software vulnerabilities with mitigation steps.' },
    { id: 15, title: 'Compliance Report', date: new Date(), conversationID: '05919210-2fb5-bca4-8fd3-fca5fce4341d',  content: 'Evaluation of compliance standards against security frameworks.' }
  ];
  
  searchQuery = '';
  selectedReport: any = null;

  get filteredReports() {
    return this.reports.filter(report =>
      report.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || report.conversationID.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectReport(report: any) {
    this.selectedReport = report;
  }

  downloadReport(report: any) {
    const blob = new Blob([report.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  closeReport() {
    this.selectedReport = null;
}
}
