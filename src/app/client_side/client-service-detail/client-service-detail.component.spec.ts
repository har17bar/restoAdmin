import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServiceDetailComponent } from './client-service-detail.component';

describe('ClientServiceDetailComponent', () => {
  let component: ClientServiceDetailComponent;
  let fixture: ComponentFixture<ClientServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
