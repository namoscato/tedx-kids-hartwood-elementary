import justifiedLayout from 'justified-layout'
import { LayoutBox, Photo } from './types'

const $photos = $('#photos')
const userId = '181924920@N03'

if ($photos.length > 0) {
    $.getJSON('https://api.flickr.com/services/rest?' + $.param({
        api_key: '227e98613f99d8ca265a20d5c5c0315e',
        extras: 'url_m,url_z',
        format: 'json',
        method: 'flickr.people.getPublicPhotos',
        nojsoncallback: 1,
        user_id: userId
    })).then(function (data) {
        renderPhotos(data.photos.photo)
    }).catch(function (error) {
        console.error(error)
    })
}

function getStyle (box: LayoutBox): string {
    const properties = ['height', 'left', 'top', 'width'] as const

    return properties.map((property) => `${property}:${String(box[property])}px`).join('; ')
}

function renderPhotos (photos: Photo[]): void {
    const layoutGeometry = justifiedLayout(
        photos.map(function (photo) {
            return {
                height: photo.height_m,
                width: photo.width_m
            }
        }),
        {
            containerPadding: 0,
            containerWidth: 800
        }
    )

    $photos.height(layoutGeometry.containerHeight)

    $photos.html(layoutGeometry.boxes.reduce(
        function (html: string, box, index) {
            const photo = photos[index]

            return `${html}<a href="https://www.flickr.com/photos/${userId}/${photo.id}" style="${getStyle(box)}" target="_blank"><img src="${photo.url_z}"></a>`
        },
        ''
    ))
}
