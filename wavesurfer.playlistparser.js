'use strict';

/* Playlist Parser */
WaveSurfer.PlaylistParser = {
    init: function (params) {
        this.params = params;

        var wavesurfer = this.wavesurfer = params.wavesurfer;

        if (!this.wavesurfer) {
            throw new Error('No WaveSurfer instance provided');
        }

        // parse playlist and set params
        this.playlistFileGET = this.params.playlistFile || null;
        this.playlistType = this.params.playlistType || 'm3u';
        this.playlistData = [];

        if (this.playlistFileGET != null) {
            var ajaxData = wavesurfer.util.ajax({
                url: this.playlistFileGET,
                responseType: 'text'
            });

            var _this = this;
            ajaxData.on('success', function (data, e) {
                _this.parse(data);
                _this.wavesurfer.fireEvent('playlist-ready');
            });
            ajaxData.on('error', function (e) {
                throw new Error('Error reading the playlist file' + 'XHR error: ' + e.target.statusText);
            });

        } else {
            throw new Error('No playlist file provided');
        }
    },

    parsedList: function() {
        return this.playlistData;
    },

    parse: function(playlistFile) {
        // check if playlist type is given
        var playlist = [];

        if (this.playlistType == 'm3u' || this.playlistType == 'audio/mpegurl') {
            playlist = playlistFile.replace(/^.*#.*$|#EXTM3U|#EXTINF:/mg, '').split('\n');
        } else {
            throw new Error('No valid playlist file provided, valid formats are m3u pls smil json or their valid mime types');
        }

        // playlist type is set return the playlist
        var outputArray = [];
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i]) {
                // check if file name has .mp3 or .wav before adding the playlist array
                if(playlist[i].indexOf('.mp3') !== -1 || playlist[i].indexOf('.wav') !== -1) {
                    outputArray.push(playlist[i].toString());
                }
            }
        }
        this.playlistData = outputArray;
        return;
    }
};

WaveSurfer.util.extend(WaveSurfer.PlaylistParser, WaveSurfer.Observer);
