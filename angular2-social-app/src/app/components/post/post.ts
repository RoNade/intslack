import { Component, Input, Output } from '@angular/core';
import { Post, Like, PicturePostContent, VideoPostContent, YoutubePostContent } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Display a user post with comments and like 
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;

    picturePostContents: PicturePostContent[];
    youtubePostContents: YoutubePostContent[];
    videoPostContents: VideoPostContent[];
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.post.content = this.parser.parse(this.post);
        // console.log('CONTENT', this.post.content);
        // console.log('MESSAGE', this.post.message);

        if(this.post.content) {
            this.picturePostContents = this.post.content
                .filter(postContent => postContent.type === 'picture');
            // console.log('PICTUREPOST', this.picturePostContents);

            this.youtubePostContents = this.post.content
                .filter(postContent => postContent.type === 'youtube');
            // console.log('YOUTUBEPOST', this.youtubePostContents);
            
            this.videoPostContents = this.post.content
                .filter(postContent => postContent.type === 'video');
            // console.log('VIDEOPOST', this.videoPostContents);
        }
        

        this.postSocket.onLike(async (like) => {
            try {
                await this.postService.like(like.post);

                if(!this.post.liked) {
                    this.post.liked = true;
                }
            }
            catch(err) {
                throw new Error(err);
            }
        });
    }

    async onLike() {
        try {
            await this.postService.like(this.post);

            if(!this.post.liked) {
                this.post.liked = true;
            }
        }
        catch(err) {
            throw new Error(err);
        } 
    }

    /**
     * Send the new post message to the server
     * @param message message to send
     */
    onComment(message: string) {
    }
}
