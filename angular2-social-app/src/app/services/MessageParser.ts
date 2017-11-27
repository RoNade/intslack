import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';

const youtube = "https://youtu.be/";

/**
 * Parse post content
 */
export class MessageParser {
    postContents: PostContent<any>[];

    parse(post: Post): PostContent<any>[] {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        let pictureMatche = pictureRegex.exec(post.message);
        let contentToReplace = [];
        this.postContents = [];

        // return pictureContent if match
        if (pictureMatche) {
            while(pictureMatche) {
                contentToReplace.push(pictureMatche[0]);
                // console.log('PICTUREMATCH', pictureMatche);
                this.postContents.push(new PicturePostContent(pictureMatche[0]));
                pictureMatche = pictureRegex.exec(post.message);
            }
        }

        const youtubeRegex = /(http[s]?:\/\/)?(?:www\.)?(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        let youtubeMatche = youtubeRegex.exec(post.message);

        // return YoutubeContent if match
        if(youtubeMatche) {
            while(youtubeMatche) {
                contentToReplace.push(youtubeMatche[0]);
                // console.log('YOUTUBEMATCH', youtubeMatche);
                this.postContents.push(new YoutubePostContent(youtubeMatche[2]));
                youtubeMatche = youtubeRegex.exec(post.message);
            } 
        }

        const videoRegex = /http[s]?:\/\/.+\.(ogv|mp4|webm|3gp)/gmi;
        let videoMatche = videoRegex.exec(post.message);

        // return VideoContent if match
        if(videoMatche) {
            while(videoMatche) {
                contentToReplace.push(videoMatche[0])
                // console.log('VIDEOMATCH', videoMatche);
                this.postContents.push(new VideoPostContent(videoMatche[0]));
                videoMatche = videoRegex.exec(post.message);
            }
        }

        // Reformat original message
        contentToReplace.forEach(content => {
            // Remove remaining empty lines from message
            const emptyLines = /^(?:[\t ]*[^a-z0-9\\\/,;\._-](?:\r?\n|\r))+/gmi
            post.message = post.message.replace(content, '');
            post.message = post.message.replace(emptyLines, '');
        });
        
        // Transform remaining url in links
        const urlRegex = /(http[s]?:\/\/(?:www.)?[a-z0-9_.-]+\.[a-z0-9]{2,4}(?:\/[a-z0-9_.=-]+)*)(?:\?[a-z0-9&=+_%.-]+)*/gmi;
        let urlMatche = urlRegex.exec(post.message);
        contentToReplace = [];

        while(urlMatche) {
            contentToReplace.push(urlMatche);
            urlMatche = urlRegex.exec(post.message);
        }

        // Original url replacement by  html a tags
        contentToReplace.forEach(content => {
            const newLink = `<a href="${content[0]}">${content[1]}</a>`;
            post.message = post.message.replace(content[0], newLink);
        });
        
        return (this.postContents.length > 0) ? this.postContents : null;
    }
}
