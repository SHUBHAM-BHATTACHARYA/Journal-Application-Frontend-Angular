import { Component } from '@angular/core';
import { JournalService } from '../../services/journal/journal-service';

@Component({
  selector: 'app-journal',
  imports: [],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal {
  constructor(private jurnalService:JournalService){

  }
  ngOnInit(){
    this.jurnalService.getJournals().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Unauthorized or error', err)
    })
  }
}
