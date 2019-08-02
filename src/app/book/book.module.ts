import { NgModule } from '@angular/core';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { SharedModule } from '../shared/shared.module';
import { SearchCriteriaComponent } from './book-overview/search-criteria/search-criteria.component';
import { SearchResultsComponent } from './book-overview/search-results/search-results.component';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent, SearchCriteriaComponent, SearchResultsComponent],
  exports: [
    BookDetailsComponent, BookOverviewComponent
  ],
  imports: [
    SharedModule
  ]
})
export class BookModule {
}
