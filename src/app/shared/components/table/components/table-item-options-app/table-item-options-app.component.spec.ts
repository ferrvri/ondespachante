import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableItemOptionsAppComponent } from './table-item-options-app.component';

describe('TableItemOptionsAppComponent', () => {
  let component: TableItemOptionsAppComponent;
  let fixture: ComponentFixture<TableItemOptionsAppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableItemOptionsAppComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableItemOptionsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
