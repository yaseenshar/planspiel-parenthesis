import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChatbotService } from '../../../services/api/botpress/chatbot.service';
import { map } from 'rxjs/operators';

interface Conversation {
  id: string;
  createdAt: string;
  sentiment: string;
}

@Component({
  selector: 'app-user-insights',
  templateUrl: './user-insights.component.html',
  styleUrls: ['./user-insights.component.scss']
})

export class UserInsightsComponent implements AfterViewInit {
  sentimentList: any;
  timeGraphData: any;
  convList: Conversation[] = [];

  constructor(private chatbotService: ChatbotService){
    this.refresh();
  }

  async refresh(){
    this.convList = await this.chatbotService.getSummaries();
    this.getTimeGraphData();
    console.log(this.convList)
    console.log(this.timeGraphData)
  }

  getTimeGraphData(){
    this.convList.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime(); // Reverse the comparison for descending order
    });

    this.timeGraphData = this.convList.reduce((acc: any, { createdAt }) => {
      const formattedDate = new Date(createdAt).toLocaleDateString('en-UK');
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedEntries = Object.entries(this.timeGraphData).sort(([dateA], [dateB]) => {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    const timeLabels = Object.keys(this.timeGraphData);
    const timeData: number[] = Object.values(this.timeGraphData);

    this.createChart(timeLabels, timeData)
  }


  getPieChart(){
    const sentimentCount = this.convList.reduce((acc: any, { sentiment }) => {
      acc[sentiment] = (acc[sentiment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const labels = Object.keys(sentimentCount);
    const data = Object.values(sentimentCount);
    
    const backgroundColors = {
      positive: 'rgba(75, 192, 192, 0.6)',
      negative: 'rgba(255, 99, 132, 0.6)',
      neutral: 'rgba(255, 206, 86, 0.6)',
    };
        
    // Step 4: Create the Pie Chart
    const ctx = document.getElementById('sentimentChart') as HTMLCanvasElement;
    
    const sentimentChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });    
  }
  
  ngAfterViewInit() {
  }

  createChart(labels: string[], counts: number[]) {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Conversations per Day',
          data: counts,
          borderColor: 'white',
          backgroundColor: 'rgba(149, 255, 0, 0.68)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'No. of Conversations' }, beginAtZero: true }
        }
      }
    });
  }
}
