import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from '@components/app/app.component'
import { LayoutBlockComponent } from '@components/layout-block/layout-block.component'
import { FileSelectComponent } from '@components/file-select/file-select.component'
import { ApiExplorerComponent } from '@components/api-explorer/api-explorer.component'
import { ApiNodeListComponent } from '@components/api-node-list/api-node-list.component'
import { ApiNodeItemComponent } from '@components/api-node-item/api-node-item.component'
import { PathInputComponent } from '@components/path-input/path-input.component'

import { IsEmptyPipe } from '@pipes/is-empty.pipe'

@NgModule({
  declarations: [
    AppComponent,
    LayoutBlockComponent,
    FileSelectComponent,
    ApiExplorerComponent,
    ApiNodeListComponent,
    ApiNodeItemComponent,
    PathInputComponent,
    IsEmptyPipe,
  ],
  imports: [BrowserModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
