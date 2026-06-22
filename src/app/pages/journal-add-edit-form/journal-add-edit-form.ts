import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JournalService } from '../../services/journal/journal-service';

@Component({
  selector: 'app-journal-add-edit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './journal-add-edit-form.html',
  styleUrl: './journal-add-edit-form.css',
})
export class JournalAddEditForm {
  journalAddEditForm!: FormGroup;
  id: string = '';
  isAddMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private journalService: JournalService
  ) {}

  ngOnInit(): void {
    // 1. Get the ID parameter from the route to determine mode
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // 2. Initialize the reactive form structures
    this.initForm();

    // 3. If in edit mode, fetch data and populate the form fields
    if (!this.isAddMode) {
      this.loadJournalData();
    }
  }

  private initForm(): void {
    this.journalAddEditForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  private loadJournalData(): void {
    // Simulated API response data. Replace with an actual service call.
    this.journalService.getJournalById(this.id).subscribe({
      next: (response) => {
        console.log(response);
        // Populates fields automatically based on matching property names
        this.journalAddEditForm.patchValue(response); 
      },
      error: (err) => console.error('Unauthorized or error', err)
    });
  }

  onSubmit(): void {
    if (this.journalAddEditForm.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.createJournal();
    } else {
      this.updateJournal();
    }
  }

  private createJournal(): void {
    console.log('Sending payload to Create API:', this.journalAddEditForm.value);
    this.journalService.addJournal(this.journalAddEditForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error('Unauthorized or error', err)
    })
    this.router.navigate(['/journals']);
  }

  private updateJournal(): void {
    console.log(`Sending payload to Update API for ID ${this.id}:`, this.journalAddEditForm.value);
    this.journalService.updateJournal(this.id, this.journalAddEditForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.error('Unauthorized or error', err)
    })
    this.router.navigate(['/journals']);
  }
}
