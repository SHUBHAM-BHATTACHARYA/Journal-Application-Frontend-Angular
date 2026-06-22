import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal/journal-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-journal',
  imports: [],
  templateUrl: './journal.html',
  styleUrl: './journal.css',
})
export class Journal implements OnInit{

  constructor(
    private jurnalService:JournalService,
    private router: Router
  ){}

  journalData: any[] = [];

  ngOnInit(): void{
    this.fetchJournalData();
  }

  fetchJournalData(): void{
    this.jurnalService.getJournals().subscribe({
      next: (response: any[]) => {
        this.journalData = response;
        console.log(this.journalData);
      },
      error: (err) => console.error('Unauthorized or error', err)
    })
  }

  onAdd(){
    this.router.navigate(['journal/addJournal'])
  }

  onEdit(journalId: string){
    this.router.navigate(['journal/editJournal', journalId])
  }

  onDelete(journalId: string): void{
    this.jurnalService.deleteJournal(journalId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error('Unauthorized or error', err)
    })
  }
}
