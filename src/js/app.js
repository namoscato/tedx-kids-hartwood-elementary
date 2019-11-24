(function () {
    'use strict'

    var $body = $('body')
    var $overlayTitle = $('#overlay-title')
    var $overlayBody = $('#overlay-body')

    $('#speakers').on('click', '.photo-grid-link', function (event) {
        var $hyperlink = $(this)
        var speaker = $hyperlink.text().trim()

        event.preventDefault()

        $overlayTitle.text(speaker)
        $overlayBody.text($hyperlink.data('biography'))

        $body.addClass('is-overlay-visible')

        gtag('event', 'Open', { event_category: 'Speaker', event_label: speaker })
    })

    $('#overlay').click(function () {
        $body.removeClass('is-overlay-visible')
    })
})()
