import { Component } from '@angular/core';

@Component({
    selector: 'app-logout-survey',
    templateUrl: './logout-survey.component.html',
    styleUrls: ['./logout-survey.component.scss']
})
export class LogoutSurveyComponent {
    reason: string = '';
    comments: string = '';

    submitSurvey() {
        console.log('Reason:', this.reason);
        console.log('Comments:', this.comments);
        alert('Thank you for your feedback!');
    }
}
