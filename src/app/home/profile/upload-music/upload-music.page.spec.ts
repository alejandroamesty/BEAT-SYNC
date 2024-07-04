import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadMusicPage } from './upload-music.page';

describe('UploadMusicPage', () => {
  let component: UploadMusicPage;
  let fixture: ComponentFixture<UploadMusicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
