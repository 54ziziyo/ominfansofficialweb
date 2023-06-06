(function () {
var RWD_BOUNDARY = 600
var DESKTOP_STD_WIDTH = 1920
var MOBILE_STD_WIDTH = 375
const mobileVideoList = [
    {
        videoElement: document.getElementById('video5'),
        sourceLink: 'https://long.fuhuida.ltd/watch9/9cb091811992e532b76ff17829a63cf1/9cb091811992e532b76ff17829a63cf1.m3u8'
    },
    {
        videoElement: document.getElementById('video6'),
        sourceLink: 'https://long.fuhuida.ltd/watch9/541cc9119edc010ad0c202bc831aff6e/541cc9119edc010ad0c202bc831aff6e.m3u8'
    },
    {
        videoElement: document.getElementById('video7'),
        sourceLink: 'https://long.fuhuida.ltd/watch9/7f740029a053ed719f6d18aa4243049c/7f740029a053ed719f6d18aa4243049c.m3u8'
    },
    {
        videoElement: document.getElementById('video8'),
        sourceLink: 'https://long.fuhuida.ltd/watch9/3b83ec091e0b713ffd1554483e2f6e31/3b83ec091e0b713ffd1554483e2f6e31.m3u8'
    },
];

var touchHandler = (function () {
    var xDown, yDown

    return {
        touchStart: function (evt) {
            var firstTouch = evt.touches[0];                                      
            xDown = firstTouch.clientX;                                      
            yDown = firstTouch.clientY;                                      
        },
        touchMove: function (evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
                                                          
            if (Math.abs(xDiff) <= Math.abs(yDiff)) {
                toSiblingPage(yDiff > 0)
            }

            xDown = null;
            yDown = null;                                             
        }
    }
})()

function toPage(pageName) {
    switch (pageName) {
        case 'page0':
            // console.log('to page0')

            document.querySelector('.page.page0').classList.add('show')
            document.querySelector('.menu .side-current').classList.add('page0')

            if (window.innerWidth >= RWD_BOUNDARY) {
                playVideo(document.getElementById('video1'), 'https://long.fuhuida.ltd/watch9/9cb091811992e532b76ff17829a63cf1/9cb091811992e532b76ff17829a63cf1.m3u8')
            } else {
                playMultipleVideo([mobileVideoList[0]])
            }

            break;

        case 'page1':
            // console.log('to page1')

            document.querySelector('.page.page1').classList.add('show')
            document.querySelector('.menu .side-current').classList.add('page1')

            break;

        case 'page2':
            // console.log('to page2')

            document.querySelector('.page.page2').classList.add('show')
            document.querySelector('.menu .side-current').classList.add('page2')

            if(window.innerWidth >= RWD_BOUNDARY) {
                playVideo(document.getElementById('video2'), 'https://long.fuhuida.ltd/watch9/7f740029a053ed719f6d18aa4243049c/7f740029a053ed719f6d18aa4243049c.m3u8')
            }

            break;

        case 'page3':
            // console.log('to page3')

            document.querySelector('.page.page3').classList.add('show')
            document.querySelector('.menu .side-current').classList.add('page3')

            if(window.innerWidth >= RWD_BOUNDARY) {
                playVideo(document.getElementById('video3'), 'https://long.fuhuida.ltd/watch9/3b83ec091e0b713ffd1554483e2f6e31/3b83ec091e0b713ffd1554483e2f6e31.m3u8')            
            } 
            
            break;

        case 'page4':
            // console.log('to page4')

            document.querySelector('.page.page4').classList.add('show')
            document.querySelector('.menu .side-current').classList.add('page4')

            if(window.innerWidth >= RWD_BOUNDARY) {
                playVideo(document.getElementById('video4'), 'https://long.fuhuida.ltd/watch9/541cc9119edc010ad0c202bc831aff6e/541cc9119edc010ad0c202bc831aff6e.m3u8')
            }

            break;
    }
}

function leaveCurrentPage() {
    var showPage = document.querySelector('.page.show')
    var sideCurrent = document.querySelector('.menu .side-current')
    var showPageName = showPage.classList[1]

    switch (showPageName) {
        case 'page0':
            // console.log('leave page0')

            sideCurrent.classList.remove('page0')
            break;

        case 'page1':
            // console.log('leave page1')

            sideCurrent.classList.remove('page1')
            break;

        case 'page2':
            // console.log('leave page2')

            sideCurrent.classList.remove('page2')
            break;
        case 'page3':
            // console.log('leave page3')

            sideCurrent.classList.remove('page3')
            break;

        case 'page4':
            // console.log('leave page4')

            sideCurrent.classList.remove('page4')
            break;
    }

    showPage.classList.remove('show')
}

function playVideo (videoElement, sourceLink) {
    if (Hls.isSupported()) {
        var hls = new Hls({
            debug: false,
        });
        hls.loadSource(sourceLink);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            videoElement.muted = true;
            videoElement.play();
        });

    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = sourceLink;
        videoElement.addEventListener('canplay', function () {
            videoElement.play();
        });
    }
}

/**
 * 
 * @param {
 *     [
 *       {
 *         videoElement: HTMLVideoElement,
 *         sourceLink: ""
 *       }
 *     ]
 * } videos
 */
function playMultipleVideo (videos) {
    var promises = videos.map(function(video, i) {
        return new Promise(function (res, rej) {
            if (Hls.isSupported()) {
                var hls = new Hls({
                    debug: false,
                });
                hls.loadSource(video.sourceLink);
                hls.attachMedia(video.videoElement);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    video.videoElement.muted = true;
                    res()
                });

            // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
            // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
            // This is using the built-in support of the plain video element, without using hls.js.
            } else if (video.videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                video.videoElement.src = video.sourceLink;
                video.videoElement.addEventListener('canplay', function () {
                    res()
                });
            }
        })
    })

    Promise.all(promises)
    .then(function () {
        videos.forEach(function(video) {
            video.videoElement.currentTime = "5.0"
            video.videoElement.play()
        })
    })
}

document.querySelectorAll('.wrapper-box video').forEach(el => el.addEventListener('click', function (evt) {
    let target = evt.target
    for (let i = 0; i < mobileVideoList.length ; i++) {
        if(mobileVideoList[i].videoElement === target){
            playVideo(mobileVideoList[i].videoElement, mobileVideoList[i].sourceLink)
        }else {
            mobileVideoList[i].videoElement.pause()
        }
    }
}))

document.querySelector('.menu ul').addEventListener('click', function (evt) {
    var target = evt.target

    if (isMenuFold()) {
        return
    }

    while (target.tagName.toLowerCase() !== 'li') {
        target = target.parentElement
    }

    // 已經在此頁
    if (target.classList[0] === document.querySelector('.page.show').classList[1]) {
        return
    }

    leaveCurrentPage()
    toPage(target.classList[0])
})

document.querySelector('.menu .logo').addEventListener('click', function (evt) {
    leaveCurrentPage()
    toPage('page0')
})

document.querySelector('.menu .logo-m').addEventListener('click', function (evt) {
    if (isMenuFold()) {
        return
    }
    leaveCurrentPage()
    toPage('page0')
})

document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') {
        toPage('page0')
        resizeCallback()
    }
})

document.addEventListener('touchstart', throttle(touchHandler.touchStart, 2000))
document.addEventListener('touchmove', touchHandler.touchMove)

window.addEventListener('wheel', throttle(function (evt) {
    toSiblingPage(evt.deltaY > 0)
}, 2000))

window.addEventListener('resize', resizeCallback)

function resizeCallback () {
    var viewPortWidth = window.innerWidth
    setRootFontSize(viewPortWidth)
    setMenuEvent(viewPortWidth)
}

function setRootFontSize (viewPortWidth) {
    if (viewPortWidth > RWD_BOUNDARY) {
        document.querySelector(':root').style.fontSize = (viewPortWidth * 16 / DESKTOP_STD_WIDTH) + 'px'
    } else {
        if (viewPortWidth > MOBILE_STD_WIDTH) {
            viewPortWidth = MOBILE_STD_WIDTH
        }
        document.querySelector(':root').style.fontSize = (viewPortWidth * 16 / MOBILE_STD_WIDTH) + 'px'
    }
}

function setMenuEvent (viewPortWidth) {
    if (viewPortWidth > RWD_BOUNDARY) {
        document.querySelector('.menu').classList.remove('fold')
        document.body.removeEventListener('click', menuToggler)
    } else {
        document.querySelector('.menu').classList.add('fold')
        document.body.addEventListener('click', menuToggler)
    }
}

function mobileAutoPlayVideo (viewPortWidth) {
    if(viewPortWidth > RWD_BOUNDARY) {
        playVideo(document.getElementById('video5'), 'https://long.fuhuida.ltd/watch9/9cb091811992e532b76ff17829a63cf1/9cb091811992e532b76ff17829a63cf1.m3u8')
        playVideo(document.getElementById('video6'), 'https://long.fuhuida.ltd/watch9/7f740029a053ed719f6d18aa4243049c/7f740029a053ed719f6d18aa4243049c.m3u8')
        playVideo(document.getElementById('video7'), 'https://long.fuhuida.ltd/watch9/3b83ec091e0b713ffd1554483e2f6e31/3b83ec091e0b713ffd1554483e2f6e31.m3u8')
        playVideo(document.getElementById('video8'), 'https://long.fuhuida.ltd/watch9/541cc9119edc010ad0c202bc831aff6e/541cc9119edc010ad0c202bc831aff6e.m3u8')
    }
}

function menuToggler (evt) {
    var menuEle = document.querySelector('.menu')
    var target = evt.target

    if (isMenuFold()) {
        while (target.tagName.toLowerCase() !== 'nav') {
            target = target.parentElement
            
            // 已經往上找到最頂，使用者點擊到nav外部
            if (!target) {
                return
            }
        }

        // 使用者點擊到nav內部
        menuEle.classList.remove('fold')

    } else {
        menuEle.classList.add('fold')
    }
}

function toSiblingPage (isNext) {
    var showPageNum = parseInt(document.querySelector('.page.show').classList[1].substring(4, 5))

    if (isNext){
        showPageNum++
    } else {
        showPageNum--
    }

    if (showPageNum >= 0 && showPageNum <= 4) {
        leaveCurrentPage()
        toPage('page' + showPageNum)
    }
}

function isMenuFold () {
    return !!document.querySelector('.menu.fold')
}

function throttle(fn, wait) {
    var time = Date.now();
    return function (evt) {
        if ((time + wait - Date.now()) < 0) {
            fn(evt);
            time = Date.now();
        }
    }
}
})()
