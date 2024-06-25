import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTracksPage } from './search-tracks.page';

describe('SearchTracksPage', () => {
  let component: SearchTracksPage;
  let fixture: ComponentFixture<SearchTracksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTracksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
