function closeOthers () {
  Array.from(document.querySelectorAll('.playlist:not(.hidden)')).forEach(item => {
    item.classList.add('hidden')
  })
}

function setupListAccordionBehavior() {
  Array.from(document.querySelectorAll('.playlists > li > h2')).forEach(list => {
    list.addEventListener('click', (ev) => {
      const playlist = ev.target.parentNode.querySelector('.playlist');
      if(playlist.classList.contains('hidden')) {
        closeOthers()
      }
      playlist.classList.toggle('hidden')
      ev.target.scrollIntoView()
    }, false)
  })
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}

setupServiceWorker();
setupListAccordionBehavior();