import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VHomeComponent } from './v-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { CardModule } from 'primeng/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('VHomeComponent', () => {
  let component: VHomeComponent;
  let fixture: ComponentFixture<VHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VHomeComponent],
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        CardModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (HttpLoaderFactory), // AoT Config
            deps: [HttpClient],
          },
          defaultLanguage: 'es'
        }),
      ],
      providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
