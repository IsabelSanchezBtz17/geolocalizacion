import { Component, OnInit } from '@angular/core';
import NavigatorHelper from 'src/app/libs/helpers/navigation.helper';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss']
})
export class UnoComponent implements OnInit {
  
  public position: any = {};
  time: any= '';


  constructor() { }

  ngOnInit(): void {
    this.getDevices()
  }

  getLocation() {
   /*
    
    NavigatorHelper.getLocation().then(resp => {
      console.log('Position:', resp)
    }).catch(error => {
      console.log('Error:', error)
    })
     */

    NavigatorHelper.getLocationC( position=>{
      this.position = {
        lat: position.coords.latitude,
        long: position.coords.longitude

      }
    
    //  this.time = new Date (position.timestamp).toLocaleDateString();
    this.time= position.timestamp;
      
      console.log(position)
    }, error=>{
      console.log(error)
    }  )
  }

  onSubmit(){
    console.log('position:' , this.position);
    console.log('time: ' , this.time)
  }

  start(video: HTMLVideoElement, btn:HTMLElement){
    console.log('video', video)
    NavigatorHelper.startRecord(video, btn);
  }

  getDevices(){
    NavigatorHelper.getDevices()
  }

  startAudio(audio: HTMLAudioElement,  btn:HTMLElement){
  console.log('Audio: ', audio)
  NavigatorHelper.startAudio(audio, btn);

 }
}
