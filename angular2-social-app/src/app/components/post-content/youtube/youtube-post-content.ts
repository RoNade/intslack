import { Component, Input, Pipe } from '@angular/core';
import { PostContent, YoutubePostContent } from 'models';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    templateUrl: 'youtube-post-content.html',
    selector: 'youtube-post-content'
})
export class YoutubeFeedContentComponent {
    @Input() postContent: YoutubePostContent;

    safeUrl: SafeResourceUrl;
    
    constructor(
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(){
        // sanitization via method is causing unending refresh of the embbeded video hence the setting of a property on init
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.postContent.value.videoId}`);
    }

    /* 
    get url() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.postContent.value.videoId);
    }
    */
}
