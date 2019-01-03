const closeOthers = () => {
  Array.from(document.querySelectorAll('.playlist:not(.hidden)')).forEach(item => {
    item.classList.add('hidden')
  })
}

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