# playlist-parser
JavaScript playlist parser for m3u, pls, smil and json files

## How to use
**Include the playlistparser.js javascript file**<br/>
```
HTML
<script src="playlistparser.js"></script>

PUG
script(src="playlistparser.js")

Haml
%script{src: "playlistparser.js"}
```

**Call the playlist parser object**
- FILE = link to one of the supported file types
- TYPE = mime type or file extension of the supported file types
```
window.PlaylistParser(FILE,TYPE);
```

**Example**
```
window.PlaylistParser('','');
```


## Plugins
- <a href="https://github.com/entonbiba/playlist-parser/blob/master/wavesurfer.playlist.js">wavesurfer.playlistparser.js</a> - playlist plugin for the <a href="https://github.com/katspaugh/wavesurfer.js">WaveSurfer.js</a> library <a href="http://codepen.io/entonbiba/pen/OpMQjR" target="_blank">view sample</a>
