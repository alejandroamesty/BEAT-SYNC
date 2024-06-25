import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchArtistsPage } from './search-artists.page';

describe('SearchArtistsPage', () => {
  let component: SearchArtistsPage;
  let fixture: ComponentFixture<SearchArtistsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArtistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
