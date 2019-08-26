import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { ResultsComponent } from './components/results/results.component';
import { SearchCardComponent } from './components/search-card/search-card.component';

@NgModule({
  declarations: [SearchComponent, AutoFocusDirective, LoadingComponent, ResultsComponent, SearchCardComponent],
  imports: [CommonModule, SearchRoutingModule, SharedModule]
})
export class SearchModule {}
