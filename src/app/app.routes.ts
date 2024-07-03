import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'start-screen',
    loadComponent: () => import('./security/start-screen/start-screen.page').then((m) => m.StartScreenPage),
  },
  {
    path: '',
    redirectTo: 'start-screen',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./security/sign-in/sign-in.page').then( m => m.SignInPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./security/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./security/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'verify-code',
    loadComponent: () => import('./security/forgot-password/verify-code/verify-code.page').then( m => m.VerifyCodePage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./security/forgot-password/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'main-tab',
    loadComponent: () => import('./home/main-tab/main-tab.component').then( m => m.MainTabComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./home/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'search-tracks',
    loadComponent: () => import('./home/search/search-tracks/search-tracks.page').then( m => m.SearchTracksPage)
  },
  {
    path: 'search-albums',
    loadComponent: () => import('./home/search/search-albums/search-albums.page').then( m => m.SearchAlbumsPage)
  },
  {
    path: 'search-artists',
    loadComponent: () => import('./home/search/search-artists/search-artists.page').then( m => m.SearchArtistsPage)
  },
  {
    path: 'music-player',
    loadComponent: () => import('./home/music-player/music-player.page').then( m => m.MusicPlayerPage)
  },
  {
    path: 'search-tracks-by-genre',
    loadComponent: () => import('./home/search/search-tracks-by-genre/search-tracks-by-genre.page').then( m => m.SearchTracksByGenrePage)
  },
  {
    path: 'album-detail',
    loadComponent: () => import('./home/album-detail/album-detail.page').then( m => m.AlbumDetailPage)
  },
  {
    path: 'playlist-detail',
    loadComponent: () => import('./home/playlist-detail/playlist-detail.page').then( m => m.PlaylistDetailPage)
  },  {
    path: 'artist-detail',
    loadComponent: () => import('./home/artist-detail/artist-detail.page').then( m => m.ArtistDetailPage)
  }

];
