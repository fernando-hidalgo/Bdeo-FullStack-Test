import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CTaskCardComponent } from './c-task-card.component';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CTaskCardComponent', () => {
  let component: CTaskCardComponent;
  let fixture: ComponentFixture<CTaskCardComponent>;
  let taskService: TaskService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CTaskCardComponent],
      imports: [
        HttpClientTestingModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(CTaskCardComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit task', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.id = '1';
    component.editTask();
    expect(navigateSpy).toHaveBeenCalledWith(['1', 'edit']);
  });

  it('should emit taskDeleted event on deleteTask', () => {
    const deleteSpy = spyOn(taskService, 'deleteTask').and.returnValue(of({ _id: '1' }));
    const emitSpy = spyOn(component.taskDeleted, 'emit');

    component.id = '1';
    component.deleteTask();

    expect(deleteSpy).toHaveBeenCalledWith('1');
    expect(emitSpy).toHaveBeenCalledWith('1');
  });
});
