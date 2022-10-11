export default class NavigatorHelper {

  static getLocation(): Promise<any> {
    /*
       let opcion : any = {
        timeOut: 1,
        
      };
    */
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
        //console.log('Respuesta:', resp);
        resolve(resp)
      }
        , error => {
          // console.log('Error', error);
          reject(error)
        }
      )
    })
  }


  static getLocationC(success: (key: any) => void, error: (key: any) => void) {
    navigator.geolocation.getCurrentPosition(position => {
      success(position)
    },
      err => {
        error(err)
      }
    )
  }

  static startRecord(video: HTMLVideoElement, btn: HTMLElement) {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 200,
        height: 200,
        /* 
        Habilita la camara trasera o frontal.
        deviceId:{
           exact: "241e2bb76e9c27a739977d9414a763622e61a94d5f7540d52ac8bc54f7ae868b"
           //"02f9c455df947189b1dce89806f7f876338f76848bb094c03197af35e335845c"
         }
         */
      }
      , audio: true

    }
    ).then(media => {
      console.log(media)
      video.srcObject = media
      //esperamos un momento
      video.onloadedmetadata = resp => {
        video.play()

        let data: any[] = []
        const record = new MediaRecorder(media, {
          mimeType: 'video/webm'
        })


        record.ondataavailable = eve => {
          console.log('onDataAvailable')
          data.push(eve.data)
        }

        record.onstop = () => {
          console.log('onStop')
          const blob = new Blob(data, {
            type: 'video/webm'
          })
          /* const reader = new FileReader()
           reader.readAsDataURL(blob)
           reader.onloadend = () => {
             console.log('Reader:', reader.result)
           }
 */
          const url = URL.createObjectURL(blob)
          const elA = document.createElement('a')
          document.body.appendChild(elA)
          elA.href = url
          elA.download = "video.webm"
          elA.click()
          console.log(URL.createObjectURL(blob))
        }

        setTimeout(() => {
          console.log('toStart')
          record.start()
        }, 10)

        btn.addEventListener('click', () => {
          console.log('toStop')
          record.stop()
        })

        /**
         *   setTimeout(() => {
          console.log('toStop')
          record.stop()
        }, 2000)

         */

      }
    })
  }

  static getDevices() {
    navigator.mediaDevices.enumerateDevices().then(
      response => {
        response.forEach(item => {
          if (item.kind === 'videoinput') {
            console.log(item)
          }
        })
      }
    )
  }

  static startAudio(audio: HTMLAudioElement, btn: HTMLElement ) {
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(mediaAudio => {
      audio.srcObject = mediaAudio
      audio.onloadedmetadata = (resp) => {
        audio.play()
        let dataAudio: any[] = []
        const recordAudio = new MediaRecorder(mediaAudio, {
          mimeType: "audio/webm"
        })

        recordAudio.ondataavailable = eve => {
          console.log('onDataAvailable')
          dataAudio.push(eve.data)
        }


        recordAudio.onstop = () => {
          const blob = new Blob(dataAudio, {
            type: "audio/webm"
          })

          const url = URL.createObjectURL(blob)
          const elA = document.createElement('a')
          document.body.appendChild(elA)
          elA.href = url
          elA.download = "audio.webm"
          elA.click()
          console.log(URL.createObjectURL(blob))

        }

        setTimeout(() => {
          console.log('toStart')
          recordAudio.start()
        }, 10)

        btn.addEventListener('click', () => {
          console.log('toStop')
          recordAudio.stop()
        })

      }
    })
  }

}