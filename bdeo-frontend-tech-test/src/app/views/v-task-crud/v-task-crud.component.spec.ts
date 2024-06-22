import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VTaskCrudComponent } from './v-task-crud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { CardModule } from 'primeng/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskStatus } from '../../app.constants';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';

describe('VTaskCrudComponent', () => {
  let component: VTaskCrudComponent;
  let fixture: ComponentFixture<VTaskCrudComponent>;

  let mockTaskService: jasmine.SpyObj<TaskService>;
  mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskByID', 'editTask', 'createTask']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VTaskCrudComponent],
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        CardModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
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
    
    fixture = TestBed.createComponent(VTaskCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
