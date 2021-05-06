import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PagerModule } from '@progress/kendo-angular-pager';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RouterModule } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { InputsModule } from '@progress/kendo-angular-inputs';

const drawerRoutes = [
  { path: '', component: SearchComponent, icon: 'k-i-cloud' },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    icon: 'k-i-dictionary-add',
  },
];

@NgModule({
  declarations: [AppComponent, SearchComponent, BookmarksComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    PagerModule,
    BrowserAnimationsModule,
    NavigationModule,
    LayoutModule,
    RouterModule.forRoot(drawerRoutes),
    InputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
