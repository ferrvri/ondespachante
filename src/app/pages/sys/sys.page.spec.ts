import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SysPage } from './sys.page';

describe('SysPage', () => {
  let component: SysPage;
  let fixture: ComponentFixture<SysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
