import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { SilentCheckSsoComponent } from './components/silent-check-sso/silent-check-sso.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    SilentCheckSsoComponent,
    CustomSnackbarComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPaginationModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    HighlightModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPaginationModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ]
})
export class SharedModule { }
