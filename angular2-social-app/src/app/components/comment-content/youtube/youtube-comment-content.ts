import { Component, Input, Pipe } from '@angular/core';
import { CommentContent, YoutubeCommentContent } from 'models';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    templateUrl: 'youtube-comment-content.html',
    selector: 'youtube-comment-content'
})
export class YoutubeCommentContentComponent {
    @Input() commentContent: YoutubeCommentContent;

    safeUrl: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(){
        // sanitization via method is causing unending refresh of the embbeded video hence the setting of a property on init
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.commentContent.value.videoId}`);
    }

    /*
    get url() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.postContent.value.videoId);
    }
    */
}