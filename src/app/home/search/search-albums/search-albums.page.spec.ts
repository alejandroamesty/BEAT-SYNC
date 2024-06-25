import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchAlbumsPage } from './search-albums.page';

describe('SearchAlbumsPage', () => {
  let component: SearchAlbumsPage;
  let fixture: ComponentFixture<SearchAlbumsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAlbumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
