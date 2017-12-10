import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Post, Like, PicturePostContent, VideoPostContent, YoutubePostContent, Comment } from 'models';
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
    comments: Comment[];
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        // console.log('POST', this.post);
        this.post.content = this.parser.parse(this.post);
        // console.log('CONTENT', this.post.content);
        // console.log('MESSAGE', this.post.message);
        this.comments = this.post.comments.reverse();

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

        this.postSocket.onComment(async (comment: Comment) => {
            // console.log('COMMENT', comment);
            if(comment.post.id === this.post.id) this.comments.unshift(comment);
        });

        this.postSocket.onLike(async (like: Like) => {
            // console.log('LIKE', like);
            this.post.liked = like !== null;
        });
    }

    async onLike() {
        try {
            await this.postService.like(this.post);
        }
        catch(err) {
            throw new Error(err);
        } 
    }

    async onComment(message: string) {
        try {
            await this.postService.comment(this.post, message);
        }
        catch(err) {
            throw new Error(err);
        }
    }
}
