import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTracksByGenrePage } from './search-tracks-by-genre.page';

describe('SearchTracksByGenrePage', () => {
  let component: SearchTracksByGenrePage;
  let fixture: ComponentFixture<SearchTracksByGenrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTracksByGenrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
