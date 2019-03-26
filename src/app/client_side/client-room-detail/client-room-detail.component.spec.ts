import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRoomDetailComponent } from './client-room-detail.component';

describe('ClientRoomDetailComponent', () => {
  let component: ClientRoomDetailComponent;
  let fixture: ComponentFixture<ClientRoomDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRoomDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
