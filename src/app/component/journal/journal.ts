import { Component } from '@angular/core';
import { JournalService } from '../../services/journal/journal-service';

@Component({
  selector: 'app-journal',
  imports: [],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal {

  constructor(private jurnalService:JournalService){}

  journalData: any[] = [];

  

  ngOnInit(){
    this.jurnalService.getJournals().subscribe({
      next: (response) => {
        this.journalData = response;
        console.log(this.journalData);
      },
      error: (err) => console.error('Unauthorized or error', err)
    })
  }
}
