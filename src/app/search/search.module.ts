import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ResultsComponent } from './components/results/results.component';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SearchComponent, AutoFocusDirective, ResultsComponent, SearchCardComponent],
  imports: [CommonModule, SearchRoutingModule, SharedModule, MatCardModule, MatInputModule, MatIconModule]
})
export class SearchModule {}
